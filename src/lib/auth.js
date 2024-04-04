import CredentialsProvider from 'next-auth/providers/credentials';
import { generateToken, getCurrentUser, getRefreshToken } from '@/clients/authenticationAndLoginClient' 

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  // pages: {
  //   signIn: "?login=true",
  // },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'propify',
      credentials: {
        mobileno: {
          label: 'Mobile No',
          type: 'mobileno',
          placeholder: '',
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        try {          
          const user = await generateToken(credentials.mobileno, credentials.otp, credentials.password);       
          if (user) {   
            const userInfo = await getCurrentUser(user.token);
            return { token: user.token, username: user.username, ...userInfo };
          }
          else {
            return new Error("Invalid username or password");
          }
        }
        catch (e) {          
          throw new Error("Invalid username or password");
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
 
      let userObj = token;
      let expiryTime = token?.exp;
      if (trigger === "update") {
        if(!!session?.photo) {
          userObj.user.photo = session.photo
        }
        if(!!session?.firstName) {
          userObj.user.firstName = session.firstName
        }
        if(!!session?.lastName) {
          userObj.user.lastName = session.lastName
        }
        if(!!session?.email) {
          userObj.user.email = session.email
        }
      }
      if (!!user) {
        userObj = {
          ...userObj,
          user,
          accessToken: user.token,
          refreshToken: user.refreshToken,
        };
        const accessTokenData = JSON.parse(atob((user.token).split(".")?.at(1)));
        expiryTime = accessTokenData.exp;
      }
      const shouldRefreshTime = Math.round((expiryTime - 7200) - (Date.now()/1000));
      if (shouldRefreshTime > 0) {
          return userObj;
      }
      else {
        const data = getRefreshToken(token);
        userObj = {
          ...userObj,
          user,
          accessToken: data.token
        }
        return userObj;
      }
    },

    async session({ session, token, trigger, newSession }) {
   
      if (Date.now() / 1000 > token?.accessTokenExpires) {
        throw new Error("Refresh token has expired. Please log in again to get a new refresh token.");
      }
      const accessTokenData = JSON.parse(atob(token.accessToken.split(".")?.at(1)));
      session.user = token.user;
      token.accessTokenExpires = accessTokenData.exp;
      session.token = token?.accessToken;
      return session;
    },
  },
}
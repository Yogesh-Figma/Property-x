import CredentialsProvider from 'next-auth/providers/credentials';
import { generateToken, getCurrentUser } from '@/clients/authenticationAndLoginClient' 

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
    async jwt({ token, user, account }) {
      if (!!user) {
        return {
          ...token,
          user,
          accessToken: user.token,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }) {
      if (Date.now() / 1000 > token?.accessTokenExpires && token?.refreshTokenExpires && Date.now() / 1000 > token?.refreshTokenExpires) {
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
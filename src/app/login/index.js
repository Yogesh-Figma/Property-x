"use client"
import React from 'react';
import "./styles.scss"
import Image from 'next/image';
import { TextField, Modal } from "@mui/material";
import Button from '@/app/components/button';
import Box from '@mui/material/Box';
import CloseIcon from '@/app/icons/icon_close-small.svg?url'
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import Input from '@/app/components/input';
import { useForm } from "react-hook-form";
import { signIn, signOut, useSession } from "next-auth/react";
import { sendOtp } from '@/clients/authenticationAndLoginClient';


const styles = {
    input: {
        height: 50
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width:"90vw",
        maxWidth: 1055,
        bgcolor: '#fff',
        boxShadow: 24,
        borderRadius: "15px",
        paddingTop: "45px",
        paddingLeft: "13px",
        paddingBottom: "75px",
        border: "none",
        "&:focus": {
            outline: 'none'
        }
    }
};

const Login = ({ open }) => {
    let formInputFields = {"mobileno":"", "otp":""};
    const [formData, setFormData] = React.useState(formInputFields);
    const [otpSent, setOtpSent] = React.useState(false);
    const router = useRouter();
    const searchParams = useSearchParams()
    const loginModalEnabled = !!searchParams.get('login') || false
    const { control, handleSubmit, setValue, setError } = useForm({
        reValidateMode: "onBlur"
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValue(name, value);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleClose=()=>{
        setOtpSent(false);
        setFormData(formInputFields);
        router.back();
    }

    const sendOtpToClient = async () => {
        await sendOtp(formData.mobileno);
        setOtpSent(true);
    }

    const verifyCredentialAndLogin = () => {
        signIn("credentials", {redirect: false, mobileno:formData.mobileno, password:"amit1234", otp:formData.otp })
        .then((res) => {
            if (res?.error === null) {
                handleClose();
            }
            else {
                setError('otp', { type: 'custom', message: 'Invalid otp' });
            }
        });
    }

    return (
        <Modal
            open={loginModalEnabled}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            className='login-modal'
        >
            <Box sx={{ ...styles.modal }} className=" position-relative">
                <Image src={CloseIcon} width={30} height={30} className='position-absolute close-icon' role="button" onClick={handleClose}/>
                <div className='login-container row g-0'>
                    <Image className="d-lg-inline-block d-none col-6" src={"/undrawBuilding.svg"} width={438} height={334} />
                    <div className='login-info col-lg-6 col-12'>
                        <div className='heading'>Log in</div>
                        <div className='login-in-to sub-heading-3 '>Log in to your <span className='property-x'>Property X</span> account.</div>
                        <div className='sub-heading-3 verify-mobile'>Please Verify your Mobile Number</div>
                        <Input
                            name={"mobileno"}
                            control={control}
                            rounded={true}
                            className='login-input-container'
                            label={"Enter your mobile number"}
                            value={formData.mobileno}
                            onChange={handleInputChange}
                            width={"100%"}
                            height={50}
                            minLength={10}
                            maxLength={10}
                            isNumber={true}
                            required={true}
                            inputLabelClassName={"body-txt input-label-no-shrink"}
                            inputLabelShrinkClassName={"body-txt"}
                            inputPropClassName={"login-input"}
                            errorMessage={"Please enter valid phone number"}
                            startAdornment={
                                <div className='d-flex align-items-center'>
                                    <div className='country-code'> +91 </div>
                                    <div className='vertical-line'></div>
                                </div>
                            }
                            endAdornment={<Button text={"Get OTP"} className={"login-bar-btn"} rounded={true} height={48} onClick={sendOtpToClient}/>}                        
                        />
                        {otpSent ? <div className='otp-container'>
                            <div className='otp'>Enter OTP</div>
                            <Input
                                isNumber={true}
                                name='otp'
                                required={true}
                                control={control}
                                rounded={true}
                                width ={471}
                                height={50}
                                onChange={handleInputChange}
                                inputPropClassName={"login-input"}
                                value={formData.otp}
                                errorMessage={"Please enter valid OTP"}
                                maxLength={6}
                                minLength={6}
                            />
                            <div className='terms-of-service d-flex align-items-center'> <Checkbox />I agree to Terms of Services, and Privacy Policy.</div>
                            <Button text={"Verify OTP"} className={"otp-verify-btn"} rounded={true} height={50} onClick={handleSubmit(()=>{ verifyCredentialAndLogin() })}/>
                        </div> : <>
                            <div className='or-con text-center sub-heading-3'>Or</div>
                            <div className='login-with-google d-flex align-items-center justify-content-center'>
                                <Image src={"/googleImage.png"} width={20} height={20} />
                                <div className='sub-heading-3'>Login with Google</div>
                            </div>
                            <div className='login-with-facebook d-flex align-items-center justify-content-center mb-0'>
                                <Image src={"/facebookImage.png"} width={20} height={20} />
                                <div className='sub-heading-3'>Login with Facebook</div>
                            </div>
                        </>}
                    </div>
                </div>
            </Box>
        </Modal>)
}

export default Login;
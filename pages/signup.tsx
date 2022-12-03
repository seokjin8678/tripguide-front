import { Label } from 'flowbite-react';
import React, { useRef, useState } from 'react';
import Layout from '../components/layout/Layout';
import MyInput from '../components/ui/MyInput';
import { SignUpRequest } from '../models/SignUpRequest';
import { api } from '../utils/axios';
import MyButton from '../components/ui/MyButton';

interface SignUpProps {

}

const SignUp = (props: SignUpProps) => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
    const nickNameInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url = '/api/v1/auth/signup';

        const enteredEmail = emailInputRef.current!.value;
        const enteredPassword = passwordInputRef.current!.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current!.value;
        const enteredNickname = nickNameInputRef.current!.value;

        const signUpRequest: SignUpRequest = {
            email: enteredEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
            nickname: enteredNickname
        };


        let res = await api.post(url, signUpRequest);
        console.log(res.data);
    };

    return (
        <Layout>
            <div className="body-bg min-h-screen -z-30 pt-8 md:pt-10 px-2 md:px-0">
                <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                    <section>
                        <h3 className="font-bold text-gray-700 text-2xl">새로운 계정을 등록합니다.</h3>
                    </section>
                    <section className="mt-5">
                        <form className="flex flex-col" onSubmit={submitHandler}>
                            <Label className="my-2 block" htmlFor="email" value="Email" />
                            <MyInput id="email" type="email" ref={emailInputRef}/>
                            <Label className="my-2 block" htmlFor="nickname" value="Nickname" />
                            <MyInput id="nickname" ref={nickNameInputRef}/>
                            <Label className="my-2 block" htmlFor="password" value="Password" />
                            <MyInput id="password" type="password" ref={passwordInputRef}/>
                            <Label className="my-2 block" htmlFor="confirmPassword" value="Confirm Password" />
                            <MyInput id="confirmPassword" type="password"
                                     ref={confirmPasswordInputRef}/>
                            <MyButton className="mt-4 bg-blue-600" type="submit">
                                회원가입
                            </MyButton>
                        </form>
                    </section>
                </main>
            </div>
        </Layout>
    );
};
export default SignUp;
import React, { useRef } from 'react';
import Layout from '../components/layout/Layout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { SignUpRequest } from '../models/SignupRequest';
import { api } from '../utils/axios';

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

        const enteredEmail =  emailInputRef.current!.value;
        const enteredPassword = passwordInputRef.current!.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current!.value;
        const enteredNickname = nickNameInputRef.current!.value;

        const signUpRequest: SignUpRequest = {
            email: enteredEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
            nickname: enteredNickname
        }

        let res = await api.post(url, signUpRequest);
        console.log(res.data);
    };

    return (
        <Layout>
            <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
                <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                    <section>
                        <h3 className="font-bold text-gray-700 text-2xl">새로운 계정을 등록합니다.</h3>
                    </section>

                    <section className="mt-10">
                        <form className="flex flex-col" onSubmit={submitHandler}>
                            <Input id="email" type="email" ref={emailInputRef}>Email</Input>
                            <Input id="nickname" ref={nickNameInputRef}>Nickname</Input>
                            <Input id="password" type="password" ref={passwordInputRef}>Password</Input>
                            <Input id="confirmPassword" type="password" ref={confirmPasswordInputRef}>Confirm
                                Password</Input>
                            <Button type="submit">
                                회원가입
                            </Button>
                        </form>
                    </section>
                </main>
            </div>
        </Layout>
    );
};
export default SignUp;
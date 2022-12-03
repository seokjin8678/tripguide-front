import Link from 'next/link';
import React, { useRef } from 'react';
import Layout from '../components/layout/Layout';
import { Label } from 'flowbite-react';
import MyInput from '../components/ui/MyInput';
import MyButton from '../components/ui/MyButton';
import { api } from '../utils/axios';
import { SignInRequest } from '../models/SignInRequest';

interface SignInProps {

}

const SignIn = (props: SignInProps) => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url = '/api/v1/auth/signin';

        const enteredEmail = emailInputRef.current!.value;
        const enteredPassword = passwordInputRef.current!.value;

        const signInRequest: SignInRequest = {
            email: enteredEmail,
            password: enteredPassword
        };


        let res = await api.post(url, signInRequest);
        console.log(res.data);
    };

    return (
        <Layout>
            <div className="body-bg min-h-screen -z-30 pt-8 md:pt-10 px-2 md:px-0">
                <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                    <section>
                        <h3 className="font-bold text-gray-700 text-2xl">로그인 해주세요.</h3>
                    </section>
                    <section className="mt-5">
                        <form className="flex flex-col" onSubmit={submitHandler}>
                            <Label className="my-2 block" htmlFor="email" value="Email" />
                            <MyInput id="email" type="email" ref={emailInputRef}/>

                            <Label className="my-2 block" htmlFor="password" value="Password" />
                            <MyInput id="password" type="password" ref={passwordInputRef}/>
                            <MyButton className="mt-4 bg-blue-600" type="submit">
                                로그인
                            </MyButton>
                        </form>
                        <div className="mt-2 mx-auto text-end">
                            <p className="text-sm">계정이 없으신가요?&nbsp;<Link href="/signup" className="font-bold hover:underline">회원가입</Link></p>
                        </div>
                    </section>
                </main>
            </div>
        </Layout>
    );
};
export default SignIn;
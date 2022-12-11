import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/layout/Layout';
import { Label } from 'flowbite-react';
import MyInput from '../components/ui/MyInput';
import MyButton from '../components/ui/MyButton';
import { SignInRequest } from '../models/SignInRequest';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../hooks';
import { authActions } from '../store/slices/authSlice';
import api from '../utils/axios';
import { modalActions } from '../store/slices/modalSlice';

interface SignInPageProps {

}

const SignInPage = (props: SignInPageProps) => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [emailValidation, setEmailValidation] = useState('');
    const [passwordValidation, setPasswordValidation] = useState('');
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(state => state.auth.isLogin);
    const {isReady} = router;
    useEffect(() => {
        if (!isReady) {
            return;
        }
        if (isLogin && !router.query.redirect) {
            router.push('/');
        }
    }, [isReady]);

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current!.value;
        const enteredPassword = passwordInputRef.current!.value;
        setEmailValidation('');
        setPasswordValidation('');

        const url = '/api/v1/auth/signin';
        const signInRequest: SignInRequest = {
            email: enteredEmail,
            password: enteredPassword
        };

        try {
            const res = await api.post(url, signInRequest);
            dispatch(authActions.signIn(res.data.result));
            const redirectUrl = router.query.redirect;
            if (redirectUrl && redirectUrl !== 'signin') {
                router.push(redirectUrl.toString());
            } else {
                router.push('/');
            }
        } catch (e: any) {
            const response = e.response;
            if (response.status === 404) {
                dispatch(modalActions.showModal('서버가 응답하지 않습니다.'));
                return;
            }
            if (response.status === 400) {
                const validation = response.data.validation;
                setEmailValidation(validation['email']);
                setPasswordValidation(validation['password']);
                return;
            }
        }
    };

    return (
        <Layout>
            {!isLogin &&
                <div className="body-bg px-8 md:px-0">
                    <main className="bg-white max-w-lg mx-auto p-8 md:p-12 rounded-lg shadow-2xl">
                        <section>
                            <h3 className="font-bold text-gray-700 text-2xl">환영합니다.</h3>
                        </section>
                        <section className="mt-5">
                            <form className="flex flex-col" onSubmit={submitHandler}>
                                <Label className="my-2 block" htmlFor="email" value="Email"/>
                                <MyInput required color={emailValidation ? 'failure' : undefined}
                                         helperText={emailValidation ? emailValidation : undefined} id="email"
                                         type="email"
                                         ref={emailInputRef}/>
                                <Label className="my-2 block" htmlFor="password" value="Password"/>
                                <MyInput required color={passwordValidation ? 'failure' : undefined}
                                         helperText={passwordValidation ? passwordValidation : undefined} id="password"
                                         type="password" ref={passwordInputRef}/>
                                <MyButton className="mt-4 bg-blue-600" type="submit">
                                    로그인
                                </MyButton>
                            </form>
                            <div className="mt-2 mx-auto text-end">
                                <p className="text-sm">계정이 없으신가요?&nbsp;<Link href="/signup"
                                                                             className="font-bold hover:underline">회원가입</Link>
                                </p>
                            </div>
                        </section>
                    </main>
                </div>
            }
        </Layout>
    );
};
export default SignInPage;
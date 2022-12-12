import { Label } from 'flowbite-react';
import React, { useRef, useState } from 'react';
import Layout from '../components/layout/Layout';
import MyInput from '../components/ui/MyInput';
import api from '../utils/axios';
import MyButton from '../components/ui/MyButton';
import { SignUpRequest } from '../models/SignUpRequest';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../hooks';
import { modalActions } from '../store/slices/modalSlice';


interface SignUpPageProps {

}

const SignUpPage = (props: SignUpPageProps) => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
    const nickNameInputRef = useRef<HTMLInputElement>(null);
    const [emailValidation, setEmailValidation] = useState('');
    const [nicknameValidation, setNicknameValidation] = useState('');
    const [passwordValidation, setPasswordValidation] = useState('');
    const [confirmPasswordValidation, setConfirmPasswordValidation] = useState('');
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isLogin = useAppSelector(state => state.auth.isLogin);
    if (isLogin) {
        router.push('/');
    }

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current!.value;
        const enteredPassword = passwordInputRef.current!.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current!.value;
        const enteredNickname = nickNameInputRef.current!.value;
        setEmailValidation('');
        setNicknameValidation('');
        setPasswordValidation('');
        setConfirmPasswordValidation('');

        if (enteredPassword !== enteredConfirmPassword) {
            setPasswordValidation('비밀번호와 확인 비밀빈호가 같지 않습니다!');
            setConfirmPasswordValidation('비밀번호와 확인 비밀빈호가 같지 않습니다!');
            return;
        }

        const url = '/api/v1/auth/signup';
        const signUpRequest: SignUpRequest = {
            email: enteredEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
            nickname: enteredNickname
        };

        try {
            const res = await api.post(url, signUpRequest);
            if (res.status === 200) {
                emailInputRef.current!.value = '';
                nickNameInputRef.current!.value = '';
                passwordInputRef.current!.value = '';
                confirmPasswordInputRef.current!.value = '';
                dispatch(modalActions.showModal('회원가입이 정상적으로 되었습니다!'));
                dispatch(modalActions.setHref({
                    url: '/signin',
                    buttonMessage: '로그인 페이지로 이동'
                }));
            }
        } catch (e: any) {
            if (e.code === 'ERR_NETWORK') {
                dispatch(modalActions.showModal('서버가 응답하지 않습니다.'));
                return;
            }
            const response = e.response;
            if (response.status === 400) {
                const validation = e.response.data.validation;
                Object.keys(validation).forEach(key => {
                    if (key === 'email') {
                        setEmailValidation(validation[key]);
                    }
                    if (key === 'nickname') {
                        setNicknameValidation(validation[key]);
                    }
                    if (key === 'password') {
                        setPasswordValidation(validation[key]);
                    }
                    if (key === 'confirmPassword') {
                        setConfirmPasswordValidation(validation[key]);
                    }
                });
                return;
            }
        }
    };

    return (
        <Layout>
            <div className="body-bg px-8 md:px-0">
                <main className="bg-white max-w-lg mx-auto p-8 md:p-12 rounded-lg shadow-2xl">
                    <section>
                        <h3 className="font-bold text-gray-700 text-2xl">새로운 계정을 등록합니다.</h3>
                    </section>
                    <section className="mt-5">
                        <form className="flex flex-col" onSubmit={submitHandler}>
                            <Label className="my-2 block" htmlFor="email" value="Email"/>
                            <MyInput required color={emailValidation ? 'failure' : undefined}
                                     helperText={emailValidation ? emailValidation : undefined} id="email" type="email"
                                     ref={emailInputRef}/>
                            <Label className="my-2 block" htmlFor="nickname" value="Nickname"/>
                            <MyInput required color={nicknameValidation ? 'failure' : undefined}
                                     helperText={nicknameValidation ? nicknameValidation : undefined} id="nickname"
                                     ref={nickNameInputRef}/>
                            <Label className="my-2 block" htmlFor="password" value="Password"/>
                            <MyInput required color={passwordValidation ? 'failure' : undefined}
                                     helperText={passwordValidation ? passwordValidation : undefined} id="password"
                                     type="password" ref={passwordInputRef}/>
                            <Label className="my-2 block" htmlFor="confirmPassword" value="Confirm Password"/>
                            <MyInput required color={confirmPasswordValidation ? 'failure' : undefined}
                                     helperText={confirmPasswordValidation ? confirmPasswordValidation : undefined}
                                     id="confirmPassword" type="password"
                                     ref={confirmPasswordInputRef}/>
                            <MyButton className="mt-8 bg-blue-600" type="submit">
                                회원가입
                            </MyButton>
                        </form>
                    </section>
                </main>
            </div>
        </Layout>
    );
};
export default SignUpPage;
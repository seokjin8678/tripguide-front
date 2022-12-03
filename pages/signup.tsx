import { Button, Label, Modal } from 'flowbite-react';
import React, { useRef, useState } from 'react';
import Layout from '../components/layout/Layout';
import MyInput from '../components/ui/MyInput';
import { api } from '../utils/axios';
import MyButton from '../components/ui/MyButton';
import { SignUpRequest } from '../models/SignUpRequest';
import { useRouter } from 'next/router';


interface SignUpProps {

}

const SignUp = (props: SignUpProps) => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
    const nickNameInputRef = useRef<HTMLInputElement>(null);
    const [emailValidation, setEmailValidation] = useState('');
    const [nicknameValidation, setNicknameValidation] = useState('');
    const [passwordValidation, setPasswordValidation] = useState('');
    const [confirmPasswordValidation, setConfirmPasswordValidation] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const router = useRouter();

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
                setModalMessage('회원가입이 정상적으로 되었습니다!');
                setShowModal(true);
            }
        } catch (err: any) {
            if (err.code === 'ERR_NETWORK') {
                setModalMessage('서버에 연결할 수 없습니다!');
                setShowModal(true);
                return;
            }
            console.log(err);
            const validation = err.response.data.validation;
            Object.keys(validation).forEach(key => {
                if (key === 'email') {
                    setEmailValidation(validation[key])
                }
                if (key === 'nickname') {
                    setNicknameValidation(validation[key])
                }
                if (key === 'password') {
                    setPasswordValidation(validation[key]);
                }
                if (key === 'confirmPassword') {
                    setConfirmPasswordValidation(validation[key])
                }
            });
        }
    };

    const [showModal, setShowModal] = useState(false);

    const modalClose = () => {
        setShowModal(false);
    };

    return (
        <Layout>
            <Modal show={showModal}
                   size="md"
                   popup={true}
                   onClose={modalClose}
            >
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal  dark:text-gray-400">
                            {modalMessage}
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="info" onClick={() => {
                                router.push('/signin');
                            }}>
                                로그인 페이지로 이동
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <div className="body-bg px-2 md:px-0">
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
export default SignUp;
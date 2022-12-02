import Link from 'next/link';
import React from 'react';
import Layout from '../components/layout/Layout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

interface SignInProps {

}

const SignIn = (props: SignInProps) => {
    return (
        <Layout>
            <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
                <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                    <section>
                        <h3 className="font-bold text-gray-700 text-2xl">환영합니다.</h3>
                    </section>

                    <section className="mt-10">
                        <form className="flex flex-col" method="POST" action="#">
                            <Input id="email" type="email">
                                Email
                            </Input>
                            <Input id="password" type="password">
                                Password
                            </Input>
                            <div className="flex justify-end">
                                <a href="#"
                                   className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">비밀번호를
                                    잊으셨나요?</a>
                            </div>
                            <Button type="submit">
                                로그인
                            </Button>
                        </form>
                    </section>
                </main>

                <div className="max-w-lg mx-auto text-center mt-12 mb-6">
                    <p className="text-white">계정이 없으신가요?&nbsp;
                        <Link href="/signup" className="font-bold hover:underline">회원가입</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
};
export default SignIn;
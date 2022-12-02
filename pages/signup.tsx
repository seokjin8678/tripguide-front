import React from 'react';
import Layout from '../components/layout/Layout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

interface SignUpProps {

}

const SignUp = (props: SignUpProps) => {
    return (
        <Layout>
            <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
                <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                    <section>
                        <h3 className="font-bold text-gray-700 text-2xl">새로운 계정을 등록합니다.</h3>
                    </section>

                    <section className="mt-10">
                        <form className="flex flex-col" method="POST" action="#">
                            <Input id="email" type="email">Email</Input>
                            <Input id="password" type="password">Password</Input>
                            <Input id="confirmPassword" type="password">Confirm Password</Input>
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
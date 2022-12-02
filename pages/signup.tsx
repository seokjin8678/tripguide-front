import React from 'react';
import Layout from '../components/layout/Layout';

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
                            <div className="mb-6 pt-3 rounded bg-gray-200">
                                <label className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                                       htmlFor="email">Email</label>
                                <input type="text" id="email"
                                       className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"/>
                            </div>
                            <div className="mb-6 pt-3 rounded bg-gray-200">
                                <label className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                                       htmlFor="password">Password</label>
                                <input type="password" id="password"
                                       className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"/>
                            </div>
                            <div className="mb-6 pt-3 rounded bg-gray-200">
                                <label className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                                       htmlFor="password">Confirm Password</label>
                                <input type="password" id="confirmPassword"
                                       className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"/>
                            </div>
                            <button
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                                type="submit">회원가입
                            </button>
                        </form>
                    </section>
                </main>
            </div>
        </Layout>
    );
};
export default SignUp;
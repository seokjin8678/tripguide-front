import { Navbar } from 'flowbite-react';
import React from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { authActions } from '../../store/slices/authSlice';
import Link from 'next/link';

interface MyNavbarProps {
}

const MyNavbar = (props: MyNavbarProps) => {
    const router = useRouter();
    const isLogin = useAppSelector(state => state.auth.isLogin);
    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(authActions.signOut());
        router.push('/');
    };

    return (
        <Navbar fluid={true} rounded={false} className="bg-blue-600">
            <div className="flex items-center">
                <Link href="/" className="self-center whitespace-nowrap text-2xl font-semibold text-white">
                    TripGuide
                </Link>
            </div>
            <Navbar.Toggle className="text-white"/>
            <Navbar.Collapse>
                {isLogin && (
                    <Link href="/trips"
                          className="block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white text-white hover:text-black">
                        계획
                    </Link>
                )}
                {isLogin && (
                    <Link href="/"
                          className="block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white text-white hover:text-black">
                        내정보
                    </Link>
                )}
                {isLogin && (
                    <p onClick={logoutHandler}
                       className="block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white text-white hover:text-black hover:cursor-pointer">
                        로그아웃
                    </p>
                )}
                {!isLogin && (
                    <Link href={'/signin?redirect=' + router.asPath}
                          className="block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white text-white hover:text-black">
                        로그인
                    </Link>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};
export default MyNavbar;
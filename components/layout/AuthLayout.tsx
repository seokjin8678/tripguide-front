import React from 'react';
import Layout from './Layout';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../hooks';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = (props: AuthLayoutProps) => {
    const router = useRouter();
    const isLogin = useAppSelector(state => state.auth.isLogin);
    if (!isLogin) {
        router.replace('/signin?redirect=' + router.asPath);
    }
    return (
        <Layout>
            {props.children}
        </Layout>
    );
};
export default AuthLayout;
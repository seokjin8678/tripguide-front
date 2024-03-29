import React from 'react';
import Layout from './Layout';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../hooks';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = (props: AuthLayoutProps) => {
    const isLogin = useAppSelector(state => state.auth.isLogin);
    return (
        <Layout>
            {isLogin && props.children}
        </Layout>
    );
};
export default AuthLayout;
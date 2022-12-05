import React from 'react';
import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../hooks';

interface PlansPageProps {

}

const PlansPage = (props: PlansPageProps) => {
    const router = useRouter();
    const isLogin = useAppSelector(state => state.auth.isLogin);
    if (!isLogin) {
        router.replace('/signin?redirect=' + router.asPath);
    }

    return (
        <Layout>
        </Layout>
    );
};

export default PlansPage;
import type { NextPage } from 'next';
import Layout from '../components/layout/Layout';
import { useAppSelector } from '../hooks';
import { api } from '../utils/axios';

const Home: NextPage = () => {
    const auth = useAppSelector(state => state.auth);

    const test = async () => {
        try {
            const res = await api.post('/api/v1/test');
            console.log(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Layout>
            <div className="pt-0 md:pt-24">
                <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                    <div className="flex flex-col w-full justify-center items-start text-center md:text-left">
                        <p className="uppercase tracking-loose text-xl w-full">
                            당신의 여행 계획은 어떠신가요?
                        </p>
                        <h1 className="my-4 text-5xl font-bold leading-tight">
                            여행 계획을 공유하고 다른 여행 계획을 참조해보세요!
                        </h1>
                        <p className="leading-normal text-2xl mb-8 w-full">
                            다른 사람은 어떤 여행 계획을 작성했을까요?
                        </p>
                        <button onClick={test}
                                className="mx-auto md:mx-0 bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                            둘러보기
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;

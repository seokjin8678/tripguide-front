import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../hooks';
import { Pagination } from 'flowbite-react';
import { TripPreview } from '../../models/TripPreview';
import MyCard from '../../components/ui/MyCard';
import Link from 'next/link';
import api from '../../utils/axios';

interface TripsPageProps {

}

const TripsPage = (props: TripsPageProps) => {
    const router = useRouter();
    const {query, isReady} = router;
    const isLogin = useAppSelector(state => state.auth.isLogin);
    if (!isLogin) {
        router.replace('/signin?redirect=' + router.asPath);
    }
    const [tripPreviews, setTripPreviews] = useState<TripPreview[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const getTripPreviews = async () => {
        const res = await api.get(`/api/v1/trips?page=${query.page ? query.page : '1'}`);
        console.log(res);
        const tripPreviews: TripPreview[] = [];
        const data = res.data.result.content;
        for (const key in data) {
            tripPreviews.push({
                id: data[key].id,
                title: data[key].title,
                desc: data[key].desc,
                country: data[key].country,
                city: data[key].city,
                score: data[key].score,
                author: data[key].author
            });
        }
        setTripPreviews(tripPreviews);
        setTotalPages(res.data.result.totalPages);
        setCurrentPage(res.data.result.number)
    };

    useEffect(() => {
        if (!isReady) {
            return;
        }
        getTripPreviews();
    }, [isReady, query]);


    const pageChangeHandler = (page: number) => {
        router.push('/trips?page=' + page);
    };

    return (
        <Layout>
            <div className="px-8 py-4 grid grid-cols-4 gap-x-4 gap-y-8">
                {tripPreviews.map(trip => {
                    return (
                        <Link key={trip.id} href={`trips/${trip.id}`}>
                            <MyCard imgSrc="/image-1.jpg">
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {trip.title}
                                </h5>
                                <div className="flex items-end py-1">
                                    <div>
                                        <p className="text-xl font-medium">{trip.country}</p>
                                    </div>
                                    <div>
                                        <p className="text-2lg px-1">{trip.city}</p>
                                    </div>
                                </div>
                                <div className="flex items-center py-2">
                                    <svg className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                    <svg className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                    <svg className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                    <svg className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                    <svg className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                    <span
                                        className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                                    5.0
                                </span>
                                </div>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    {trip.desc}
                                </p>
                            </MyCard>
                        </Link>
                    );
                })}
            </div>
            <div className="py-8 flex items-center justify-center text-center">
                <Pagination
                    currentPage={currentPage + 1}
                    layout="pagination"
                    previousLabel="Prev"
                    onPageChange={pageChangeHandler}
                    totalPages={totalPages}
                />
            </div>
        </Layout>
    );
};

export default TripsPage;
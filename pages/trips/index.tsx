import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Pagination } from 'flowbite-react';
import { TripPreview } from '../../models/TripPreview';
import MyCard from '../../components/ui/MyCard';
import Link from 'next/link';
import api from '../../utils/axios';
import MyRating from '../../components/ui/MyRating';
import { modalActions } from '../../store/slices/modalSlice';
import AuthLayout from '../../components/layout/AuthLayout';

interface TripsPageProps {

}

const TripsPage = (props: TripsPageProps) => {
    const router = useRouter();
    const {query} = router;
    const [tripPreviews, setTripPreviews] = useState<TripPreview[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(state => state.auth.isLogin);
    if (!isLogin) {
        router.replace('/signin?redirect=' + router.asPath);
    }

    const getTripPreviews = async () => {
        try {
            const res = await api.get(`/api/v1/trips?page=${query.page ? query.page : '1'}`);
            const tripPreviews: TripPreview[] = [];
            const data = res.data;
            const content = res.data.content;
            for (const key in content) {
                tripPreviews.push({
                    id: content[key].id,
                    title: content[key].title,
                    desc: content[key].desc,
                    country: content[key].country,
                    city: content[key].city,
                    score: content[key].score,
                    author: content[key].author
                });
            }
            setTripPreviews(tripPreviews);
            setTotalPages(data.totalPages);
            setCurrentPage(data.number);
        } catch (e: any) {
            if (e.code === 'ERR_NETWORK') {
                dispatch(modalActions.showModal('서버가 응답하지 않습니다.'));
                return;
            }
            const response = e.response;
            if (response.status === 401) {
                router.push('/signin');
                return;
            }
        }
    };

    useEffect(() => {
        if (isLogin) {
            getTripPreviews();
        }
    }, [isLogin]);


    const pageChangeHandler = (page: number) => {
        if (router.query.page && router.query.page === page.toString()) {
            return;
        }
        router.replace('/trips?page=' + page);
    };

    return (
        <AuthLayout>
            <div className="px-8 py-4 grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-8">
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
                                <MyRating className="py-2" starkey={'trip' + trip.id} score={trip.score}/>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    {trip.desc}
                                </p>
                                <hr className="mt-2 h-px bg-gray-400 border-0 dark:bg-gray-400"/>
                                <div className="py-2 text-end">
                                    <span
                                        className={'text-md md:text-sm rounded bg-blue-100 px-2 py-1 font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800'}>
                                        작성자:
                                        <span className="font-bold">
                                            {trip.author}
                                        </span>
                                    </span>
                                </div>
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
        </AuthLayout>
    );
};

export default TripsPage;
import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../hooks';
import { Pagination } from 'flowbite-react';
import { TripPreview } from '../../models/TripPreview';
import MyCard from '../../components/ui/MyCard';
import Link from 'next/link';
import api from '../../utils/axios';
import MyRating from '../../components/ui/MyRating';

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
        try {
            const res = await api.get(`/api/v1/trips?page=${query.page ? query.page : '1'}`);
            const tripPreviews: TripPreview[] = [];
            const data = res.data.content;
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
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.number);
        } catch (e) {

        }
    };

    useEffect(() => {
        if (!isReady) {
            return;
        }
        getTripPreviews();
    }, [isReady, query]);


    const pageChangeHandler = (page: number) => {
        if (router.query.page && router.query.page === page.toString()) {
            return;
        }
        router.replace('/trips?page=' + page);
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
                                <MyRating tripId={trip.id} score={trip.score}/>
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
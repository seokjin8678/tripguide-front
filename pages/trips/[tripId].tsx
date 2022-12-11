import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { useRouter } from 'next/router';
import MyCard from '../../components/ui/MyCard';
import Map from '../../components/Map';
import api from '../../utils/axios';
import { TripDetail } from '../../models/TripDetail';
import Marker from '../../components/Marker';
import { Wrapper } from '@googlemaps/react-wrapper';
import { modalActions } from '../../store/slices/modalSlice';
import AuthLayout from '../../components/layout/AuthLayout';
import MyRating from '../../components/ui/MyRating';
import { Pagination } from 'flowbite-react';
import { Comment } from '../../models/Comment';

interface TripDetailPageProps {

}

const printComment = (comments: Comment[]) => {
    if (comments.length === 0) {
        return (
            <p className="text-center py-2 font-semibold text-lg">
                코멘트가 없습니다.
            </p>
        );
    }
    return comments.map(comment => {
        return (
            <li key={comment.id} className="py-3 sm:py-4">
                <div className="flex items-center grid grid-cols-3">
                    <div>
                        <p className="truncate font-medium text-gray-900 dark:text-white">
                            {comment.author}
                        </p>
                        <span className="flex -ml-0.5 py-0.5 truncate">
                            <MyRating className="py-1" key={'comment' + comment.id} score={comment.score}
                                      hideNumber={true}/>
                        </span>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                            2022-12-12
                        </p>
                    </div>
                    <div className="col-span-2 text-center text-gray-900 dark:text-white">
                        {comment.comment}
                    </div>
                </div>
            </li>
        );
    });
};

const TripDetailPage = (props: TripDetailPageProps) => {
    const router = useRouter();
    const [tripDetail, setTripDetail] = useState<TripDetail>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const {isReady, query} = router;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tripDetail) {
            getTripComments(1);
        }
    }, [tripDetail]);

    const getTripDetail = async () => {
        try {
            const res = await api.get(`/api/v1/trips/${query.tripId}`);
            const data = res.data.result;
            const tripDetail: TripDetail = {
                title: data.title,
                desc: data.desc,
                country: data.country,
                city: data.city,
                score: data.score,
                author: data.author,
                id: data.id,
                contents: data.contents,
                latLng: {
                    lat: parseFloat(data.latitude),
                    lng: parseFloat(data.longitude)
                }
            };
            setTripDetail(tripDetail);
        } catch (e: any) {
            if (e.code === 'ERR_NETWORK') {
                dispatch(modalActions.showModal('서버가 응답하지 않습니다.'));
                return;
            }
            const response = e.response;
            if (response.status === 404) {
                dispatch(modalActions.showModal('해당 여행이 없습니다'));
                dispatch(modalActions.setHref({
                    url: '/trips',
                    buttonMessage: '여행으로 돌아가기'
                }));
                return;
            }
            if (response.status === 401) {
                router.push('/signin');
                return;
            }
        }
    };

    const getTripComments = async (page: number) => {
        try {
            const res = await api.get(`/api/v1/trips/${query.tripId}/comments?page=${page}`);
            const data = res.data;
            const content = res.data.content;
            const comments: Comment[] = [];
            for (const key in content) {
                comments.push({
                    id: content[key].id,
                    comment: content[key].comment,
                    score: content[key].score,
                    author: content[key].author
                });
            }
            setComments(comments);
            setTotalPages(data.totalPages);
            setCurrentPage(data.number);
        } catch (e: any) {
            if (e.code === 'ERR_NETWORK') {
                dispatch(modalActions.showModal('서버가 응답하지 않습니다.'));
                return;
            }
            const response = e.response;
            if (response.status === 404) {
                dispatch(modalActions.showModal('해당 여행이 없습니다'));
                dispatch(modalActions.setHref({
                    url: '/trips',
                    buttonMessage: '여행으로 돌아가기'
                }));
                return;
            }
            if (response.status === 401) {
                router.push('/signin');
                return;
            }
        }
    };

    useEffect(() => {
        if (!isReady) {
            return;
        }
        getTripDetail();
    }, [isReady]);

    return (
        <AuthLayout>
            <div className="p-4 md:p-10">
                {tripDetail &&
                    <React.Fragment>
                        <MyCard>
                            <h5 className="text-2xl pb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                                {tripDetail.title}
                            </h5>
                            <div className="flex mb-2">
                                <p className="text-lg font-semibold">
                                    작성자:&nbsp;
                                </p>
                                <p className="text-lg font-bold">
                                    {tripDetail.author}
                                </p>
                            </div>
                            <MyRating className="py-1" key={'trip' + tripDetail.id} score={tripDetail.score}/>
                            <p className="py-2 font-normal text-gray-700 dark:text-gray-400">
                                {tripDetail.desc}
                            </p>
                            <hr className="my-1 h-px bg-gray-400 border-0 dark:bg-gray-400"/>
                            <p className="py-2 text-gray-700 dark:text-gray-400">
                                {tripDetail.contents}
                            </p>
                            <hr className="my-1 h-px bg-gray-400 border-0 dark:bg-gray-400"/>
                            <p className="text-xl py-2 tracking-tight text-gray-900 dark:text-white">
                                위치 정보
                            </p>
                            <Wrapper apiKey={'AIzaSyCxMXhnZRPwdaUlOvjvpQQO_DOIdlbDdUs'}>
                                <Map className="flex w-full h-96 mx-auto mb-4" center={tripDetail.latLng} zoom={16}>
                                    <Marker position={tripDetail.latLng}/>
                                </Map>
                            </Wrapper>
                        </MyCard>
                        <div className="mt-8 md:w-1/2 mx-auto">
                            <MyCard>
                                <p className="text-xl tracking-tight text-gray-900 dark:text-white">
                                    Comments
                                </p>
                                <hr className="my-2 h-px bg-gray-400 border-0 dark:bg-gray-400"/>
                                <div className="flow-root">
                                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {printComment(comments)}
                                    </ul>
                                </div>
                                <hr/>
                                <div className="py-2 flex items-center justify-center text-center">
                                    <Pagination
                                        currentPage={currentPage + 1}
                                        layout="pagination"
                                        previousLabel="Prev"
                                        onPageChange={getTripComments}
                                        totalPages={totalPages}
                                    />
                                </div>
                            </MyCard>
                        </div>
                    </React.Fragment>
                }
            </div>
        </AuthLayout>
    );
};
export default TripDetailPage;
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

interface TripDetailPageProps {

}

const TripDetailPage = (props: TripDetailPageProps) => {
    const router = useRouter();
    const [tripDetail, setTripDetail] = useState<TripDetail>();
    const {isReady} = router;
    const dispatch = useAppDispatch();

    const getTripDetail = async () => {
        try {
            const res = await api.get(`/api/v1/trips/${router.query.tripId}`);
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
            const response = e.response;
            if (response.status === 400) {
                dispatch(modalActions.showModal('서버가 응답하지 않습니다.'));
                return;
            }
            if (response.status === 404) {
                dispatch(modalActions.showModal('해당 여행이 없습니다'));
                dispatch(modalActions.setHref({
                    url: '/trips',
                    buttonMessage: '여행으로 돌아가기'
                }))
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
                    <MyCard>
                        {

                        }
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {tripDetail.title}
                        </h5>
                        <p className="py-2 font-normal text-gray-700 dark:text-gray-400">
                            {tripDetail.desc}
                        </p>
                        <hr className="my-2 h-px bg-gray-400 border-0 dark:bg-gray-400"/>
                        <p className="py-2 text-gray-700 dark:text-gray-400">
                            {tripDetail.contents}
                        </p>
                        <hr className="my-2 h-px bg-gray-400 border-0 dark:bg-gray-400"/>
                        <p className="text-xl tracking-tight text-gray-900 dark:text-white">
                            위치 정보
                        </p>
                        <Wrapper apiKey={'AIzaSyCxMXhnZRPwdaUlOvjvpQQO_DOIdlbDdUs'}>
                            <Map className="flex w-full h-96 mx-auto" center={tripDetail.latLng} zoom={16}>
                                <Marker position={tripDetail.latLng}/>
                            </Map>
                        </Wrapper>
                    </MyCard>}
            </div>
        </AuthLayout>
    );
};
export default TripDetailPage;
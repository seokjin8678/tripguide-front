import React, { useRef, useState } from 'react';
import MyCard from '../../components/ui/MyCard';
import { Label } from 'flowbite-react';
import MyInput from '../../components/ui/MyInput';
import { Wrapper } from '@googlemaps/react-wrapper';
import Map from '../../components/Map';
import Marker from '../../components/Marker';
import MyButton from '../../components/ui/MyButton';
import { TripCreateRequest } from '../../models/TripCreateRequest';
import api from '../../utils/axios';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { modalActions } from '../../store/slices/modalSlice';
import AuthLayout from '../../components/layout/AuthLayout';

interface CreateTripPageProps {

}

const CreateTripPage = (props: CreateTripPageProps) => {
    const router = useRouter();
    const titleInputRef = useRef<HTMLInputElement>(null);
    const descInputRef = useRef<HTMLInputElement>(null);
    const countryInputRef = useRef<HTMLInputElement>(null);
    const cityInputRef = useRef<HTMLInputElement>(null);
    const contentsInputRef = useRef<HTMLTextAreaElement>(null);
    const [titleValidation, setTitleValidation] = useState('');
    const [descValidation, setDescValidation] = useState('');
    const [countyValidation, setCountryValidation] = useState('');
    const [cityValidation, setCityValidation] = useState('');
    const [contentsValidation, setContentsValidation] = useState('');
    const [latLng, setLatLng] = useState<google.maps.LatLng>();
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(state => state.auth.isLogin);
    if (!isLogin) {
        router.replace('/signin?redirect=' + router.asPath);
    }

    const onClickMap = (e: google.maps.MapMouseEvent) => {
        setLatLng(e.latLng!);
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const enteredTitle = titleInputRef.current!.value;
        const enteredDesc = descInputRef.current!.value;
        const enteredCountry = countryInputRef.current!.value;
        const enteredCity = cityInputRef.current!.value;
        const enteredContents = contentsInputRef.current!.value;

        if (!latLng) {
            dispatch(modalActions.showModal('지도에 위치를 선택해주세요.'));
            return;
        }

        const url = '/api/v1/trips';
        const tripCreateRequest: TripCreateRequest = {
            title: enteredTitle,
            desc: enteredDesc,
            country: enteredCountry,
            city: enteredCity,
            contents: enteredContents,
            latitude: latLng.lat().toFixed(6).toString(),
            longitude: latLng.lng().toFixed(6).toString()
        };

        try {
            const response = await api.post(url, tripCreateRequest);
            if (response.status === 200) {
                const tripId = response.data.result.tripId;
                dispatch(modalActions.showModal('여행이 생성 되었습니다!'));
                dispatch(modalActions.setHref({
                    url: '/trips/' + tripId,
                    buttonMessage: '여행으로 이동'
                }));
            }
        } catch (e: any) {
            if (e.code === 'ERR_NETWORK') {
                dispatch(modalActions.showModal('서버가 응답하지 않습니다.'));
                return;
            }
            const response = e.response;
            if (response.status === 400) {
                const validation = response.data.validation;
                Object.keys(validation).forEach(key => {
                    if (key === 'title') {
                        setTitleValidation(validation[key]);
                    }
                    if (key === 'desc') {
                        setDescValidation(validation[key]);
                    }
                    if (key === 'country') {
                        setCountryValidation(validation[key]);
                    }
                    if (key === 'city') {
                        setCityValidation(validation[key]);
                    }
                    if (key === 'contents') {
                        setContentsValidation(validation[key]);
                    }
                });
                return;
            }
            if (response.status === 401) {
                router.push('/signin');
                return;
            }
        }
    };

    return (
        <AuthLayout>
            <div className="p-4 md:p-10">
                <MyCard>
                    <form className="flex flex-col gap-2" onSubmit={submitHandler}>
                        <Label className="text-lg my-2 block" htmlFor="title" value="제목"/>
                        <MyInput required color={titleValidation ? 'failure' : undefined}
                                 helperText={titleValidation ? titleValidation : undefined} id="title"
                                 ref={titleInputRef}/>
                        <Label className="text-lg my-2 block" htmlFor="desc" value="설명"/>
                        <MyInput required color={descValidation ? 'failure' : undefined}
                                 helperText={descValidation ? descValidation : undefined} id="desc"
                                 ref={descInputRef}/>
                        <Label className="text-lg my-2 block" htmlFor="country" value="나라"/>
                        <MyInput required color={countyValidation ? 'failure' : undefined}
                                 helperText={countyValidation ? countyValidation : undefined} id="country"
                                 ref={countryInputRef}/>
                        <Label className="text-lg my-2 block" htmlFor="city" value="도시"/>
                        <MyInput required color={cityValidation ? 'failure' : undefined}
                                 helperText={cityValidation ? cityValidation : undefined} id="city"
                                 ref={cityInputRef}/>
                        <Label className="text-lg my-2 block" htmlFor="contents" value="위치정보"/>
                        <Wrapper apiKey={'AIzaSyCxMXhnZRPwdaUlOvjvpQQO_DOIdlbDdUs'}>
                            <Map onClick={onClickMap} className="flex w-full h-96 mx-auto"
                                 center={{lat: 36.5802466, lng: 127.8259277}} zoom={6}>
                                <Marker position={latLng}/>
                            </Map>
                        </Wrapper>
                        <Label className="text-lg my-2 block" htmlFor="contents" value="내용"/>
                        <div
                            className="w-full border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <div className="px-3 py-2 border-b dark:border-gray-600"/>
                            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                                <textarea id="contents" rows={8} ref={contentsInputRef} wrap='hard'
                                          className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                          required/>
                            </div>
                            {contentsValidation && <p className="text-lg my-2 block text-red-600">내용에 오류가 있습니다.</p>}
                        </div>
                        <MyButton className="mt-8 bg-blue-600" type="submit">
                            여행 생성
                        </MyButton>
                    </form>
                </MyCard>
            </div>
        </AuthLayout>
    );
};
export default CreateTripPage;
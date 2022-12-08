import React from 'react';
import Image from 'next/image';

interface MyCardProps {
    children: React.ReactNode;
    imgSrc: string;
    gap?: 'gap-1' | 'gap-2' | 'gap-3' | 'gap-4';
}

const MyCard = (props: MyCardProps) => {
    return (
        <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col">
            <Image src={props.imgSrc} alt="Image" width={400} height={100} className="rounded-t-lg"/>
            <div className={`flex h-full flex-col justify-center p-6 ${props.gap}`}>
                {props.children}
            </div>
        </div>
    );
};

export default MyCard;

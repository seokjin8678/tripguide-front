import React from 'react';
import { Card } from 'flowbite-react';

interface MyCardProps {
    children: React.ReactNode;
}

const MyCard = (props: MyCardProps) => {
    return (
        <Card>
            {props.children}
        </Card>
    );
};

export default MyCard;

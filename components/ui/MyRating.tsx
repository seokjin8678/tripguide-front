import React from 'react';
import { Rating } from 'flowbite-react';

interface MyRatingProps {
    tripId: number,
    score: number,
}

const MyRating = (props: MyRatingProps) => {
    const stars = [];
    for (let i = 0; i < 4; i++) {
        if (props.score - 1 >= i) {
            stars.push(<Rating.Star key={props.tripId + 'star' + i}/>);
        } else {
            stars.push(<Rating.Star key={props.tripId + 'star' + i} filled={false}/>);
        }
    }
    if (props.score === 5) {
        stars.push(<Rating.Star key={props.tripId + 'star4'}/>);
    } else {
        stars.push(<Rating.Star key={props.tripId + 'star4'} filled={false}/>);
    }

    return (
        <Rating className="py-2">
            {stars}
            <span
                className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                {props.score}
            </span>
        </Rating>
    );
};
export default MyRating;
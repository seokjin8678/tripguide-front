import React from 'react';
import {Button} from 'flowbite-react'

interface ButtonProps {
    type?: 'submit' | 'reset' | 'button' | undefined;
    children: string,
    className?: string | undefined;
}

const MyButton = (props: ButtonProps) => {
    return (
        <Button className={props.className}
            type={props.type}>{props.children}
        </Button>
    )
}
export default MyButton;
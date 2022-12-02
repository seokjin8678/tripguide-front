import React from 'react';

interface ButtonProps {
    type?: 'submit' | 'reset' | 'button' | undefined;
    children: string
}

const Button = (props: ButtonProps) => {
    return (
        <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
            type={props.type}>{props.children}
        </button>
    )
}
export default Button;
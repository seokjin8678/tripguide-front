import React, { HTMLInputTypeAttribute } from 'react';

interface InputProps {
    id: string,
    type?: HTMLInputTypeAttribute | undefined,
    children: string,
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <div className="mb-6 pt-3 rounded bg-gray-200">
            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                   htmlFor={props.id}>{props.children}</label>
            <input type={props.type} id={props.id} ref={ref}
                   className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"/>
        </div>
    );
});
Input.displayName = 'Input';
export default Input;
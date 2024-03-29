import React, { HTMLInputTypeAttribute } from 'react';
import { TextInput } from 'flowbite-react';

interface MyInputProps {
    id: string,
    type?: HTMLInputTypeAttribute | undefined,
    className?: string | undefined;
    required?: boolean,
    helperText?: string,
    color?: string,
}

const MyInput = React.forwardRef<HTMLInputElement, MyInputProps>((props, ref) => {
    return <TextInput color={props.color} helperText={props.helperText} required={props.required} className={props.className} id={props.id} type={props.type} ref={ref}/>;
});
MyInput.displayName = 'MyInput';
export default MyInput;
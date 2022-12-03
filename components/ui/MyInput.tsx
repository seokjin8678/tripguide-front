import React, { HTMLInputTypeAttribute } from 'react';
import { TextInput } from 'flowbite-react';
import { TextInputColors } from 'flowbite-react/lib/esm/components/FormControls/TextInput/TextInput';

interface MyInputProps {
    id: string,
    type?: HTMLInputTypeAttribute | undefined,
    className?: string | undefined;
    required?: boolean,
    helperText?: string,
    color?: keyof TextInputColors;
}

const MyInput = React.forwardRef<HTMLInputElement, MyInputProps>((props, ref) => {
    return <TextInput color={props.color} helperText={props.helperText} required={props.required} className={props.className} id={props.id} type={props.type} ref={ref}/>;
});
MyInput.displayName = 'MyInput';
export default MyInput;
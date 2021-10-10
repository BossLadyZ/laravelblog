import { TextField } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';


export default function Input({
    type = 'text',
    variant,
    name,
    value,
    className,
    autoComplete,
    required,
    // isFocused,
    handleChange,
    margin,
    multiline = false,
    rows = null,
    label
}) {
    const input = useRef();

    // useEffect(() => {
    //     if (isFocused) {
    //         input.current.focus();
    //     }
    // }, []);

    return (
        <div className="flex flex-col items-start">
            <TextField
                type={type}
                name={name}
                value={value}
                label={label}
                className={
                    className
                }
                multiline={multiline}
                rows={rows}
                variant={variant}
                margin={margin}
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
}

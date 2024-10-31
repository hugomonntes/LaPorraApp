import React from 'react';

interface InputProps {
id: string;
value: string;
onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
className?: string;
required?: boolean;
}

export const Input: React.FC<InputProps> = ({ id, value, onChange, className, required }) => {
return (
<input
    id={id}
    value={value}
    onChange={onChange}
    className={`border border-gray-300 p-2 rounded ${className}`}
    required={required}
/>
);
};

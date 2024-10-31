import React from 'react';

interface ButtonProps {
children: React.ReactNode;
type?: 'button' | 'submit' | 'reset';
className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, type = 'button', className, ...props }) => {
return (
<button type={type} className={`bg-blue-500 text-white py-2 px-4 rounded ${className}`} {...props}>
    {children}
</button>
);
};

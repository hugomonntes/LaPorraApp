import React from 'react';

interface CheckboxProps {
id: string;
checked: boolean;
onCheckedChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ id, checked, onCheckedChange }) => {
return (
<input
    id={id}
    type="checkbox"
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
    className="h-4 w-4 border-gray-300 rounded"
/>
);
};

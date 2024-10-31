import React from 'react';

export const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => {
return (
<table className="min-w-full bg-gray-800 text-gray-100">
    {children}
</table>
);
};

export const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
return <thead className="bg-gray-700">{children}</thead>;
};

export const TableBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
return <tbody>{children}</tbody>;
};

export const TableRow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
return <tr className="border-b border-gray-600">{children}</tr>;
};

export const TableCell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
return <td className="py-2 px-4">{children}</td>;
};

export const TableHead: React.FC<{ children: React.ReactNode }> = ({ children }) => {
return <th className="py-2 px-4 text-left">{children}</th>;
};

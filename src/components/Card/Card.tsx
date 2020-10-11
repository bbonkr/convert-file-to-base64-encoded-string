import React from 'react';

interface CardProps {
    title?: React.ReactNode;
    cardClassName?: string;
}

export const Card: React.FC<CardProps> = ({
    title,
    cardClassName,
    children,
}) => {
    return (
        <div className={`card ${cardClassName ?? ''}`}>
            {Boolean(title) && <h2 className="card-title">{title}</h2>}
            {children}
        </div>
    );
};

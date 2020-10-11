import React from 'react';

export const Header = () => {
    const handleClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
        event.preventDefault();
    };
    return (
        <nav className="navbar">
            <a href="#" className="navbar-brand" onClick={handleClick}>
                File Handling
            </a>
        </nav>
    );
};

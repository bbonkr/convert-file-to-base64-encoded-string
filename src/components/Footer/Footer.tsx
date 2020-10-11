import React from 'react';
import { ScrollToTop } from '../ScrollToTop';

interface FooterProps {
    onClickScrollToTop?: () => void;
}

export const Footer = ({ onClickScrollToTop }: FooterProps) => {
    return (
        <nav className="navbar navbar-fixed-bottom">
            <div className="container-fluid">
                <span className="navbar-text ml-auto">
                    &copy; bbon, All rights reserved
                </span>
                <ScrollToTop
                    containerClassName="navbar-content"
                    show
                    onClick={onClickScrollToTop}
                />
            </div>
        </nav>
    );
};

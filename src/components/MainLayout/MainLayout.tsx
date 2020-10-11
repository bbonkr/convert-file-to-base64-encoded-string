import React, { useEffect } from 'react';
import halfmoon from 'halfmoon';
import smoothscroll from 'smoothscroll-polyfill';
import { PageWrapper } from '../PageWrapper/PageWrapper';

export const MainLayout: React.FC = ({ children }) => {
    useEffect(() => {
        smoothscroll.polyfill();
    }, []);

    useEffect(() => {
        halfmoon.deactivateAllDropdownToggles();
    }, [location]);

    return (
        <PageWrapper withNavbar withNavbarFixedBottom>
            {children}
        </PageWrapper>
    );
};

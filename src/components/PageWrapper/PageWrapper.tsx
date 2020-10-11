import React from 'react';
import { SidebarTypes } from './SidebarTypes';

interface PageWrapperProps {
    withSidebar?: boolean;
    withNavbar?: boolean;
    withNavbarFixedBottom?: boolean;
    sidebarType?: SidebarTypes;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
    withSidebar,
    withNavbar,
    withNavbarFixedBottom,
    sidebarType,
    children,
}) => {
    const pageWrapperClassName = [
        withSidebar && 'with-sidebar',
        withNavbar && 'with-navbar',
        withNavbarFixedBottom && 'with-navbar-fixed-bottom',
    ].filter(Boolean);

    const dataSidebarType =
        !sidebarType || sidebarType === 'default' ? '' : sidebarType;

    return (
        <div
            className={`page-wrapper ${pageWrapperClassName.join(' ')}`}
            data-sidebar-type={dataSidebarType}
        >
            {children}
        </div>
    );
};

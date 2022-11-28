import React from 'react';
import MainNavigation from './MainNavigation';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
    return (
        <div className="leading-normal tracking-normal text-white gradient">
            <MainNavigation/>
            {props.children}
        </div>
    );
};
export default Layout;
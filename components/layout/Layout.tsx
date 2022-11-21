import React from 'react';
import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
    return (
        <div>
            <MainNavigation/>
            <main className={classes.main}>
                {props.children}
            </main>
        </div>
    );
};
export default Layout;
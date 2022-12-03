import React from 'react';
import Footer from './Footer';
import MyNavbar from './Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
    return (
        <React.Fragment>
            <div className="flex flex-col h-screen justify-between">
                <MyNavbar/>
                {props.children}
                <Footer/>
            </div>
        </React.Fragment>
    );
};
export default Layout;
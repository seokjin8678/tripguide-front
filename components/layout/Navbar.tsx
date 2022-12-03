import { Navbar } from 'flowbite-react';
import React from 'react';
import { useRouter } from 'next/router';

interface MyNavbarProps {
}

const MyNavbar = (props: MyNavbarProps) => {
    const router = useRouter();
    let currentURL = router.asPath;
    if (router.pathname === '/signin') {
        currentURL = '/';
    }
    return (
        <Navbar fluid={true} rounded={false} className="bg-blue-600">
            <Navbar.Brand href="/">
            <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
                TripGuide
            </span>
            </Navbar.Brand>
            <Navbar.Toggle className="text-white"/>
            <Navbar.Collapse>
                <Navbar.Link href="/" className="text-white hover:text-black">
                    Home
                </Navbar.Link>
                <Navbar.Link href="/" className="text-white hover:text-black">
                    About
                </Navbar.Link>
                <Navbar.Link href="/" className="text-white hover:text-black">
                    Services
                </Navbar.Link>
                <Navbar.Link href="/" className="text-white hover:text-black">
                    Pricing
                </Navbar.Link>
                <Navbar.Link href={`/signin?redirect=${currentURL}`} className="text-white hover:text-black">
                    로그인
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default MyNavbar;
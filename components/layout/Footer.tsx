import React from 'react';
import Link from 'next/link';

interface FooterProps {

}

const Footer = (props: FooterProps) => {
    return (
        <footer
            className="w-full bg-white shadow dark:bg-gray-800 md:flex md:items-center md:justify-between w-full p-6 bg-blue-600">
            <div>
                <span className="text-sm text-white dark:text-gray-400 sm:text-center">©2022
                    <Link href="/" className="ml-1 hover:underline">TripGuide™</Link>
                </span>
            </div>
            <ul data-testid="footer-groupLink" className="flex flex-wrap text-sm text-white dark:text-white">
                <li className="last:mr-0 md:mr-6"><Link href="/" className="hover:underline">About</Link></li>
                <li className="last:mr-0 md:mr-6"><Link href="/" className="hover:underline">Privacy Policy</Link></li>
                <li className="last:mr-0 md:mr-6"><Link href="/" className="hover:underline">Licensing</Link></li>
                <li className="last:mr-0 md:mr-6"><Link href="/" className="hover:underline">Contact</Link></li>
            </ul>
        </footer>
    );
};
export default Footer;
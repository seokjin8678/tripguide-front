import Link from 'next/link';

interface MainNavigationProps {

}

const MainNavigation = (props: MainNavigationProps) => {
    return (
        <nav className="fixed w-full z-30 top-0 text-white">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
                <div className="pl-4 flex items-center">
                    <a className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
                       href="#">
                        YJ Travel Guide
                    </a>
                </div>
                <div
                    className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20">
                    <ul className="list-reset lg:flex justify-end flex-1 items-center">
                        {/*<li className="mr-3">
                            <a href="#" className="inline-block py-2 px-4 text-black font-bold no-underline">
                                Active
                            </a>
                        </li>
                        <li className="mr-3">
                            <a href="#"
                               className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4">
                                Active
                            </a>
                        </li>
                        <li className="mr-3">
                            <a href="#"
                               className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4">
                                Active
                            </a>
                        </li>*/}
                    </ul>
                    <button
                        className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                        로그인
                    </button>
                </div>
            </div>
            <hr className="border-b border-gray-100 opacity-25 my-0 py-0"/>
        </nav>
    );
};
export default MainNavigation;
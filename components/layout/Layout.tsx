import React from 'react';
import Footer from './Footer';
import MyNavbar from './Navbar';
import { Button, Modal } from 'flowbite-react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { modalActions } from '../../store/slices/modalSlice';
import { useRouter } from 'next/router';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {isShow, message, href} = useAppSelector(state => state.modal);
    const closeModalHandler = () => {
        dispatch(modalActions.closeModal());
    };
    const hrefModalHandler = () => {
        if (href) {
            router.push(href.url);
        }
        dispatch(modalActions.closeModal());
    };

    return (
        <React.Fragment>
            <Modal show={isShow}
                   size="md"
                   popup={true}
                   onClose={closeModalHandler}>
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal  dark:text-gray-400">
                            {message}
                        </h3>
                        <div className="flex justify-center gap-4">
                            {href ?
                                <Button color="info" onClick={hrefModalHandler}>
                                    {href.buttonMessage}
                                </Button>
                                :
                                <Button color="info" onClick={closeModalHandler}>
                                    닫기
                                </Button>
                            }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <div className="flex flex-col h-screen justify-between">
                <MyNavbar/>
                {props.children}
                <Footer/>
            </div>
        </React.Fragment>
    );
};
export default Layout;
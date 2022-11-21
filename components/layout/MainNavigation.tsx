import Link from 'next/link';
import classes from './MainNavigation.module.css';

interface MainNavigationProps {

}

const MainNavigation = (props: MainNavigationProps) => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>MyTripGuide</div>
            <nav>
                <ul>
                    <li>
                        <Link href="/">로그인</Link>
                    </li>
                    <li>
                        <Link href="/">회원가입</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
export default MainNavigation;
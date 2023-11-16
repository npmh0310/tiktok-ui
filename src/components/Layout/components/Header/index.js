import images from '~/assets/images/index';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSignIn,
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faUser,
    faGear,
    faCoins,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';

// import Button
import Button from '~/components/Button';
//import Menu
import Menu from '~/components/Popper/Menu/index';
//import Tippy
import Tippy from '@tippyjs/react';
//import sử dụng css của tippy
import 'tippy.js/dist/tippy.css';
import { InboxIcon, MessageIcon, SearchIcon, UploadIcon } from '~/components/Icons';
//import Image component
import Image from '~/components/Images/index';
//import search component
import Search from '../Search/index';
import { Link } from 'react-router-dom';

//import routesConfig
import routesConfig from '~/config/routes';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vn',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: './feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    //? USER
    const currentUser = true;

    //? handle login (xử lý khi click vào những thằng con không làm gì (không có đường dẫn, kh có children nhưng vẫn biết vừa click vào nó))
    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };

    //? Thêm userMenu để chứa các menu của user khi login vào
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View Profile',
            to: './viewprofile',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: './viewprofile',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: './settings',
        },
        // Rải menu cũ vào
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: './logout',
            separate: true, // thêm cái vạch vào trên log out
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* //* LOGO  */}
                <div className={cx('logo')}> 
                    {/* Phải thêm default vào nó mới lấy đường dẫn còn nếu không nó chỉ lấy ra 1 object (images.logo) */}
                    <Link to={routesConfig.home} className={cx('logo-link')}>
                        {' '}
                        <img src={images.logo.default} alt="Tiktok" />{' '}
                    </Link>
                </div>

                {/* Search */}
                <Search />

                {/* //* ACTION */}
                {/* //? nếu mà có currentUser sẽ lấy current-user. Nếu không thì lấy action */}
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 100]} content="Upload Video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 100]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>

                            <Tippy delay={[0, 100]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary leftIcon={<FontAwesomeIcon icon={faSignIn} />}>
                                Login
                            </Button>
                        </>
                    )}
                    {/* nếu có currentUser thì dùng useMenu nếu không thì dùng MENU_ITEMS */}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            /* Thêm dấu ... ở cạnh button login */
                           
                            
                            <Image //? Component image tự custom thế cho thẻ img
                                className={cx('user-avatar')}
                                src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/73ead36d6e46a7dea47d9d34a0c016fb.jpeg?x-expires=1699513200&x-signature=WhPlCe8qaPtrJ0JnpJQFl1RT94M%3D"
                                alt="Minh Hieu"
                                fallback="https://files.fullstack.edu.vn/f8-prod/user_photos/208701/6298053d43cd1.jpg" //? xử lý có mỗi lỗi ảnh sẽ có 1 image khá nhau
                            />
                        ) : (
                            /* Thêm dấu ... ở cạnh button login */
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;

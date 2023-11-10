import { useEffect, useState } from 'react';
import images from '~/assets/images/index';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
    faSignIn,
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faCloudUpload,
    faMessage,
    faPaperPlane,
    faUser,
    faGear,
    faCoins,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';

// import tippy
// import HeadlessTippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless'; // different import path!

//import Wrapper
import { Wrapper as PopperWrapper } from '~/components/Popper'; // sửa tên lại
//import AccountItem
import AccountItem from '~/components/AccountItem';
// import Button
import Button from '~/components/Button';
//import Menu
import Menu from '~/components/Popper/Menu/index';

//import Tippy
import Tippy from '@tippyjs/react';
//import sử dụng css của tippy
import 'tippy.js/dist/tippy.css';
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
    const [searchResult, setSearchReult] = useState([]);

    //? USER
    const currentUser = true;
    //? render ra popper khi hiển thị kết quả (fake api)
    useEffect(() => {
        setTimeout(() => {
            setSearchReult([]);
        }, 0);
    }, []);

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
            icon: <FontAwesomeIcon icon={faSignOut  } />,
            title: 'Log out',
            to: './settings',
            separate: true, // thêm cái vạch vào trên log out
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* //* LOGO  */}
                <div className={cx('logo')}>
                    {/* Phải thêm default vào nó mới lấy đường dẫn còn nếu không nó chỉ lấy ra 1 object (images.logo) */}
                    <img src={images.logo.default} alt="Tiktok" />
                </div>
                {/* //* SEARCH */}
                <HeadlessTippy
                    interactive // giúp có thể select vào được những gì trong tippy
                    visible={searchResult.length > 0} // nếu mà kết quả tìm kiếm > 0 mới hiện ra
                    // (khi có phần tử trong mảng/ khi mà có account nào đó)
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Account</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Search accounts and videos" spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        {/* loading */}
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            {/* Search */}
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </HeadlessTippy>

                {/* //* ACTION */}
                {/* //? nếu mà có currentUser sẽ lấy current-user. Nếu không thì lấy action */}
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 200]} content="Upload Video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faCloudUpload} />
                                </button>
                            </Tippy>
                            {/* <button className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                            <button className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faMessage} />
                            </button> */}
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
                            <img
                                className={cx('user-avatar')}
                                src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/73ead36d6e46a7dea47d9d34a0c016fb.jpeg?x-expires=1699513200&x-signature=WhPlCe8qaPtrJ0JnpJQFl1RT94M%3D"
                                alt="Minh Hieu"
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

import { useEffect, useState } from 'react';
import images from '~/assets/images/index';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


// import tippy
// import Tippy from '@tippyjs/react';
import Tippy from '@tippyjs/react/headless'; // different import path!

//import Wrapper
import { Wrapper as PopperWrapper } from '~/components/Popper'; // sửa tên lại
//import AccountItem
import AccountItem from '~/components/AccountItem';
const cx = classNames.bind(styles);

function Header() {
    const [searchResult, setSearchReult] = useState([]);

    // render ra popper khi hiển thị kết quả (fake api)
    useEffect(() => {
        setTimeout(() => {
            setSearchReult([]);
        }, 0);
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    {/* Phải thêm default vào nó mới lấy đường dẫn còn nếu không nó chỉ lấy ra 1 object (images.logo) */}
                    <img src={images.logo.default} alt="Tiktok" />
                </div>

                <Tippy
                    interactive // giúp có thể select vào được những gì trong tippy
                    visible={searchResult.length > 0} // nếu mà kết quả tìm kiếm > 0 mới hiện ra
                    // (khi có phần tử trong mảng/ khi mà có account nào đó)
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Account</h4>
                                <AccountItem/>
                                <AccountItem/>
                                <AccountItem/>
                                <AccountItem/>
                                
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
                </Tippy>

                <div className={cx('actions')}></div>
            </div>
        </header>
    );
}

export default Header;

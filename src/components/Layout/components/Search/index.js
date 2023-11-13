import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import HeadlessTippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless'; // different import path!
//import Wrapper
import { Wrapper as PopperWrapper } from '~/components/Popper'; // sửa tên lại
//import AccountItem
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchReult] = useState([]);

    const inputRef = useRef();

    //? xử lý việc có đang focus vào ô input không
    const [showResult, setShowResult] = useState(true);

    //? render ra popper khi hiển thị kết quả (fake api)
    useEffect(() => {
        setTimeout(() => {
            setSearchReult([1, 1, 2, 3]);
        }, 0);
    }, []);

    //* Xử lý khi bấm ra ngoài khu vực của tippy
    const handleHideResult = () => {
        setShowResult(false);
    };
    // {
    //     console.log(searchValue);
    // }
    return (
        <HeadlessTippy
            interactive //? giúp có thể select vào được những gì trong tippy
            visible={showResult && searchResult.length > 0} //? nếu mà kết quả tìm kiếm > 0 mới hiện ra
            //? (khi có phần tử trong mảng/ khi mà có account nào đó)
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
            //? Xử lý khi bấm ra ngoài khu vực của tippy
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && ( //? Đầu tiên chuyển searchValue sang boolean. Sau đó khi có search value thì nó mới hiển thị button này
                    <button
                        onClick={() => {
                            setSearchValue('');
                            setSearchReult([])
                            inputRef.current.focus();
                        }}
                        className={cx('clear')}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {/* loading */}
                {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}

                <button className={cx('search-btn')}>
                    {/* Search */}
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;

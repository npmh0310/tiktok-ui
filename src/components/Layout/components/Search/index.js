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
// import useDebounce
import { useDebounce } from '~/hooks';

// // import axios
// import axios from 'axios';

//import request component (import request from '~/utils/request')
//import searchService component sau khi tách ra
import * as searchServices from '~/apiServices/searchServices';

const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const inputRef = useRef();

    //? xử lý việc có đang focus vào ô input không
    const [showResult, setShowResult] = useState(true);
    //? xử lý việc khi đang nhập sẽ có icon loading
    const [loading, setLoading] = useState(false);

    //? Sử dụng useDebouce. Giải thích: nghĩa là khi người dùng ngừng gõ searchvalue 500ms.
    //?      Thì khi đó debouced mới được update = giá trị mới nhất của setValue
    const debounced = useDebounce(searchValue, 500);

    //? render ra popper khi hiển thị kết quả (fake api)
    useEffect(() => {
        //? xử lý việc searchValue mới đầu là ''
        //? .trim() để cắt đi dấu ' ' khi nhập vào
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debounced);
            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debounced]);

    //* Xử lý khi bấm ra ngoài khu vực của tippy
    const handleHideResult = () => {
        setShowResult(false);
    };
    // {
    //     console.log(searchValue);
    // }

    //? Xử lý khi input dấu space
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <HeadlessTippy
            interactive //? giúp có thể select vào được những gì trong tippy
            visible={showResult && searchResult.length > 0} //? nếu mà kết quả tìm kiếm > 0 mới hiện ra
            //? (khi có phần tử trong mảng/ khi mà có account nào đó)
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Account</h4>
                        {/* Render ra các searchResult */}
                        {/* Gửi vào trong AccountItem 1 props tên là data từ đó bên AccountItem có thể sử dụng nó */}
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
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
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue &&
                    !loading && ( //? Đầu tiên chuyển searchValue sang boolean. Sau đó khi có search value thì nó mới hiển thị button này. Và không có loading thì mới hiện
                        <button
                            onClick={() => {
                                setSearchValue('');
                                setSearchResult([]);
                                inputRef.current.focus();
                            }}
                            className={cx('clear')}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                {/* loading */}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button
                    className={cx('search-btn')}
                    // xử lý hủy hành vi click vào button search thì tạo border:
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {/* Search */}
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;

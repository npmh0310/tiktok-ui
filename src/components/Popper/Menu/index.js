import Tippy from '@tippyjs/react/headless'; // different import path!
import { Wrapper as PopperWrapper } from '~/components/Popper';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

//? bắt buộc đó là 1 function. Nếu không được truyền từ bên ngoài thì nó vẫn không lỗi
const defaultFn = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn, ...passProps }) {
    //? render ra items
    const [history, setHistory] = useState([{ data: items }]);
    // console.log(history);
    //? lấy ra trang nhất ( phần tử cuối mảng )
    const current = history[history.length - 1];
    // console.log(current);

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children; //? lý do viết !! vì item.children sẽ render ra object kh phải boolen nên dùng ! chuyển qua false và dùng !! chuyển sang true

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        // nếu có con thì sẽ làm
                        if (isParent) {
                            // push thêm mảng children vào trong history
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            // visible
           
            hideOnClick={hideOnClick} //? Xử lý khi click vào avatar thì Tippy sẽ tắt đi
            delay={[0, 700]} //? xử lý khi hover vào sẽ hiện ra và vài giây sau mới tắt
            offset={[12, 8]} //? để Menu lệch qua bên phải bớt (12: bên trái, 8: chiều cao)
            interactive
            placement="bottom-end" //? chỉnh cho tippy nằm vào bên trái dưới
            onHide={() => setHistory((prev) => prev.slice(0, 1))} //? xử lý khi hover đang phân cấp 2 đưa ra ngoài quay lại thì về lại phân cấp 1
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper
                        className={cx('meznu-popper')} //? thêm 1 className để custom lại padding. Và phải truyền nó vào PopperWrapper để nhận class đó Wrapper.js
                    >
                        {/* nếu mà có nhiều hơn 1 data- có nhiều hơn 1 items  trong đó  */}
                        {history.length > 1 && (
                            <Header
                                title={'Language'}
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1)); //? cắt từ phần tử thứ 0 đến phần tử gần cuối (slice(0,1) cắt bỏ phần tử index 1)
                                }}
                            />
                        )}
                        <div className={cx('menu-body')}> {renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;

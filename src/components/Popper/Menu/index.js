import Tippy from '@tippyjs/react/headless'; // different import path!
import { Wrapper as PopperWrapper } from '~/components/Popper';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
    const renderItems = () => {
        return items.map((item, index) => {
            return <MenuItem key={index} data={item} />;
        });
    };

    return (
        <Tippy
            delay={[0, 700]} //? xử lý khi hover vào sẽ hiện ra và vài giây sau mới tắt
            interactive
            // chỉnh cho tippy nằm vào bên trái dưới
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper
                        className={cx('menu-popper')} //? thêm 1 className để custom lại padding. Và phải truyền nó vào PopperWrapper để nhận class đó Wrapper.js
                    >
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;

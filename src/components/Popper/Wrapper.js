import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ children, className }) { //? className được truyền từ bên Menu qua và nhận thêm 1 className khác
    return <div className={cx('wrapper', className)}>{children}</div>;
}

export default Wrapper;
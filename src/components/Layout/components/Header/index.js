import classNames from 'classnames/bind'; // để có thể viết dấu - vào tên class
import style from './Header.module.scss';

const cx = classNames.bind(style);
console.log(cx);
function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}></div>
        </header>
    );
}

export default Header;

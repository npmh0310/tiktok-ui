import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Button({
    to,
    href,
    // Style
    outline = false,
    primary = false,
    text = false, // mặc định là text
    disabled = false,
    rounded = false,
    // Size
    small = false,
    large = false,
    children,
    // icon
    leftIcon,
    rightIcon,
    className,
    onClick,
    ...passProps
}) {
    console.log(primary);
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps, // dùng để đẩy các props khác mà không có
        //ví dụ như target="_blank" (mở tab mới bằng cửa sổ mới)
    };

    // xử lý trương hợp nếu disabled thì sẽ không onClick được
    if (disabled) {
        delete props.onClick;
    }

    // để có thể chuyển nó thành thẻ Link (thẻ Link ở f12 vẫn
    //có tên biến thẻ a nhưng không reload lại trang) hoặc thẻ a
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary: primary, //? khi nào props primary được truyền sẽ truyền class primary vào
        outline,
        text,
        disabled,
        rounded,
        small, //? xử lý size
        large,
    });
    console.log(primary);

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}> {children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;

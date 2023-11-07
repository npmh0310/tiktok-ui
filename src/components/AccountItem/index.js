import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/73ead36d6e46a7dea47d9d34a0c016fb.jpeg?x-expires=1699513200&x-signature=WhPlCe8qaPtrJ0JnpJQFl1RT94M%3D" alt="" />
            <div className={cx('infor')}>
                <h4 className={cx('name')}>
                <span>Nguyen Phuoc Minh Hieu</span>
                <FontAwesomeIcon className={cx('check')} icon={faCircleCheck}/>
                </h4>
                <span className={cx('username')}>npmh310</span>
            </div>
        </div>
    );
}

export default AccountItem;

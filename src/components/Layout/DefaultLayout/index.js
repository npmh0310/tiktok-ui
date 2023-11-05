import Header from '~/components/Layout/components/Header/index';
import Sidebar from './Sidebar/index';
import classNames from 'classnames/bind';
import style from './DefaultLayout.module.scss';

const cx = classNames.bind(style);
function DefaltLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaltLayout;

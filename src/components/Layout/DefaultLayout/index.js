import Header from '~/components/Layout/components/Header/index';
import Sidebar from './Sidebar/index';

function DefaltLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <Sidebar />
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default DefaltLayout;

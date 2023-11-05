
import Header from '~/components/Layout/components/Header/index';


function DefaltLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default DefaltLayout;

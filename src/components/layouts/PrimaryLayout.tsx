import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import Footer from './Footer';

const PrimaryLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default PrimaryLayout;
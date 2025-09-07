import { Outlet } from 'react-router';
import { Navbar } from './Navbar';

const PrimaryLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default PrimaryLayout;
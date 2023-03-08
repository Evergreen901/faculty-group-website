import React, { useContext, useEffect } from 'react';
import { Footer } from './';
import { useLocation } from 'react-router-dom';
import GlobalContext from '../../context/global/GlobalContext';

const Layout = ({ children }) => {
    const location = useLocation();
    const { setBlogData, setCareerData } = useContext(GlobalContext);

    useEffect(() => {
        setBlogData();
        setCareerData();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="w-screen min-h-screen relative">
            {children}
            {location.pathname !== '/' && <Footer />}
        </div>
    );
};

export default Layout;

import React, { useState } from 'react';
import { CrossIcon, MenuIcon } from '../../assets/icons';
import Logo from '../../assets/logo/logo.svg';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import useWidth from '../../hooks/useWidth';

const Header = ({
    isRoundLogo = false,
    isBlackLogo = false,
    isBlackMenu = false,
    isCompanyHover = false,
    closeHover = null,
}) => {
    // const [scrollPos, setScrollPos] = useState();
    const [isCollapsed, setCollapsed] = useState(false);
    const width = useWidth();
    // const mounted = useMounted();

    // window.addEventListener('scroll', (e) => {
    //     mounted.current && setScrollPos(window.scrollY);
    // });

    return (
        <div className="fixed top-4 md:top-[60px] z-[100] w-screen px-8">
            <div className="max-w-[1360px] mx-auto flex justify-between">
                <Link className={`flex items-center transition w-[200px]`} to="/">
                    {!isRoundLogo && !isCollapsed && (
                        <>
                            <img src={Logo} alt="faculty group logo" className="w-8 h-8" />
                            <h3 className={`text-2xl ml-3 unselectable ${isBlackLogo ? 'text-black' : 'text-white'}`}>
                                <b className="font-extrabold">Faculty</b>Group
                            </h3>
                        </>
                    )}
                </Link>
                {!isCollapsed && !isCompanyHover ? (
                    width > 768 ? (
                        <MenuIcon
                            width={32}
                            height={32}
                            className="cursor-pointer"
                            onClick={(e) => setCollapsed((prev) => !prev)}
                            fill={isBlackMenu ? 'black' : 'white'}
                        />
                    ) : (
                        <div className="bg-black w-10 h-10 rounded-full flex items-center justify-center md:p-0 md:bg-transparent">
                            <MenuIcon
                                width={24}
                                height={24}
                                className="cursor-pointer"
                                onClick={(e) => setCollapsed((prev) => !prev)}
                                fill={'white'}
                            />
                        </div>
                    )
                ) : (
                    <CrossIcon
                        className="cursor-pointer"
                        onClick={(e) => {
                            if (!isCompanyHover) setCollapsed((prev) => !prev);
                            else if (closeHover) closeHover();
                        }}
                    />
                )}
            </div>
            <Sidebar isOpen={isCollapsed} closeHandler={() => setCollapsed(false)} />
        </div>
    );
};

export default Header;

import { useEffect, useState } from 'react';
import Back2Company from '../../assets/svg/back2company.svg';
import { ArrowIcon } from '../../assets/icons';
import ExternalLink from './ExternalLink';
import useWidth from '../../hooks/useWidth';
import { t } from 'i18next';

const CompanyHover = ({ companies, selected, forceClose, onRelease = undefined, ...rest }) => {
    const [visitorCompany, setVisitor] = useState(-1);
    const [prevVisitor, setPrevVisitor] = useState(-1);
    const [isAnimation, setAnimation] = useState(false);
    const [isBgAnimation, setBgAnimation] = useState(false);
    const [isClosing, setClosing] = useState(false);
    const width = useWidth();

    useEffect(() => {
        if (!forceClose) return;
        backClicked();
        // eslint-disable-next-line
    }, [forceClose]);

    useEffect(() => {
        if (selected === -1) {
            setVisitor(-1);
            setPrevVisitor(-1);
            setBgAnimation(false);
            setClosing(false);
            return;
        }

        setPrevVisitor(selected);
        setBgAnimation(true);
        setTimeout(() => {
            setVisitor(selected);
            setBgAnimation(false);
        }, 700);

        setTimeout(() => {
            setAnimation(true);
        }, 1200);

        // setVisitor(selected);
        // setPrevVisitor(-1);
        // setTimeout(() => {
        //     setAnimation(true);
        // }, 1500);
    }, [selected]);

    const backClicked = () => {
        setAnimation(false);
        setClosing(true);

        setTimeout(() => {
            if (onRelease) onRelease();
        }, 700);
    };

    const prevSelected = () => {
        setAnimation(false);
        setPrevVisitor((visitorCompany - 1 + companies.length) % companies.length);
        setBgAnimation(true);

        setTimeout(() => {
            setVisitor((visitorCompany - 1 + companies.length) % companies.length);
            setBgAnimation(false);
            setAnimation(true);
        }, 700);
    };

    const afterSelected = () => {
        setAnimation(false);
        setPrevVisitor((visitorCompany + 1) % companies.length);
        setBgAnimation(true);

        setTimeout(() => {
            setVisitor((visitorCompany + 1) % companies.length);
            setBgAnimation(false);
            setAnimation(true);
        }, 700);
    };

    return (
        <div
            className={`fixed w-screen h-screen top-0 md:grid md:grid-cols-2 z-[99] ${
                visitorCompany < 0 ? 'pointer-events-none' : ''
            }`}
        >
            <div className="max-h-[100vh]">
                <div
                    className={`${
                        isBgAnimation
                            ? 'transition-all duration-[700ms] translate-y-[-100vh]'
                            : isClosing
                            ? 'transition-all duration-[700ms] translate-y-[100vh]'
                            : 'translate-y-0'
                    }`}
                >
                    <div
                        className={`w-full h-screen ${visitorCompany < 0 ? 'opacity-0' : 'opacity-100'}`}
                        style={{
                            background:
                                visitorCompany >= 0 && companies[visitorCompany].background
                                    ? companies[visitorCompany].background
                                    : 'linear-gradient(219deg, #29C2E2, #0000FF)',
                        }}
                    />
                    <div
                        className={`w-full h-screen`}
                        style={{
                            background:
                                prevVisitor >= 0 && companies[prevVisitor].background
                                    ? companies[prevVisitor].background
                                    : 'linear-gradient(219deg, #29C2E2, #0000FF)',
                        }}
                    />
                </div>
            </div>
            {visitorCompany >= 0 && (
                <div className="fixed w-screen h-screen top-0 left-0 p-6">
                    <div
                        className={`max-w-[1360px] mx-auto mt-[10vh] sm:mt-[20vh] ${
                            isAnimation ? 'opacity-100' : 'opacity-0'
                        } transition duration-[500ms]`}
                    >
                        <div className="w-full md:w-[50%] h-[50vh] flex flex-col justify-center gap-y-10">
                            <img className="w-14 h-14" src={companies[visitorCompany].logoWhite} alt="White Logo" />
                            <div className="text-white text-3xl mobile:text-4xl md:max-w-[550px]">
                                {companies[visitorCompany].desc1}
                            </div>
                            <div className="text-white text-base mobile:text-lg whitespace-pre-line md:max-w-[550px]">
                                {companies[visitorCompany].desc2}
                            </div>
                        </div>
                        <div className="mt-[5vh] sm:mt-[5vh] flex items-center flex-col sm:flex-row justify-around md:justify-between md:w-[50%] md:max-w-[500px] pr-4">
                            {companies[visitorCompany].link && (
                                <ExternalLink
                                    to={companies[visitorCompany].link}
                                    className="font-bold cursor-pointer rounded-[30px] border border-white py-[.5rem] px-[2rem] lg:px-[3.5rem] transition hover:bg-blue-500 hover:opacity-50 duration-500"
                                >
                                    {t('home.visit.website')}
                                </ExternalLink>
                            )}
                            <div
                                className="flex items-center cursor-pointer mt-4 sm:mt-0"
                                onClick={(e) => backClicked()}
                            >
                                <img className="mr-4 w-4 h-4" src={Back2Company} alt="back to company" />
                                Back to companies
                            </div>
                        </div>
                    </div>

                    {width < 768 && visitorCompany >= 0 && (
                        <div
                            className={`fixed w-screen h-[8vh] left-0 ${
                                isAnimation ? 'opacity-100' : 'opacity-0'
                            } bg-black flex items-center justify-evenly text-white ${
                                isAnimation ? 'bottom-0' : '-bottom-[10vh]'
                            }  transition-all duration-[500ms]`}
                        >
                            <div className="cursor-pointer flex items-center gap-x-2" onClick={(e) => prevSelected()}>
                                <ArrowIcon className="-rotate-90 w-4 h-4 cursor-pointer" />
                                {width >= 500 &&
                                    companies[(companies.length + visitorCompany - 1) % companies.length].title}
                            </div>
                            <div>{companies[visitorCompany].title}</div>
                            <div className="cursor-pointer flex items-center gap-x-2" onClick={(e) => afterSelected()}>
                                {width >= 500 && companies[(visitorCompany + 1) % companies.length].title}
                                <ArrowIcon className="rotate-90 w-4 h-4 cursor-pointer" />
                            </div>
                        </div>
                    )}
                </div>
            )}
            {width >= 768 && (
                <div className={`w-full h-screen transition-all duration-[700ms] `}>
                    <div className="max-h-[100vh]">
                        <div
                            className={`${
                                isBgAnimation
                                    ? 'transition-all duration-[700ms] translate-y-0'
                                    : isClosing
                                    ? 'transition-all duration-[700ms] translate-y-[-200vh]'
                                    : 'translate-y-[-100vh]'
                            }`}
                        >
                            <div className={`w-full h-screen bg-black`}>
                                <img
                                    src={
                                        prevVisitor >= 0 && companies[prevVisitor].img
                                            ? companies[prevVisitor].img
                                            : null
                                    }
                                    className="w-full h-screen object-cover"
                                    alt="Company Logo"
                                />
                            </div>
                            <div
                                className={`w-full h-screen bg-black ${
                                    visitorCompany < 0 ? 'opacity-0' : 'opacity-100'
                                }`}
                            >
                                <img
                                    src={
                                        visitorCompany >= 0 && companies[visitorCompany].img
                                            ? companies[visitorCompany].img
                                            : null
                                    }
                                    className="w-full h-screen object-cover"
                                    alt="Company Logo"
                                />
                            </div>
                        </div>
                    </div>

                    {visitorCompany >= 0 && (
                        <div
                            className={`fixed w-[50vw] h-[10vh] ${
                                isAnimation ? 'opacity-100' : 'opacity-0'
                            } bg-black flex items-center justify-around text-white ${
                                isAnimation ? 'bottom-0' : '-bottom-[10vh]'
                            }  transition-all duration-[500ms]`}
                        >
                            <div className="cursor-pointer flex items-center gap-x-2" onClick={(e) => prevSelected()}>
                                <ArrowIcon className="-rotate-90 w-4 h-4 cursor-pointer" />
                                {companies[(companies.length + visitorCompany - 1) % companies.length].title}
                            </div>
                            <div>{companies[visitorCompany].title}</div>
                            <div className="cursor-pointer flex items-center gap-x-2" onClick={(e) => afterSelected()}>
                                {companies[(visitorCompany + 1) % companies.length].title}
                                <ArrowIcon className="rotate-90 w-4 h-4 cursor-pointer" />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CompanyHover;

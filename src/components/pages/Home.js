import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'react-lottie';
import ReactFullpage from '@fullpage/react-fullpage';
import { useTranslation } from 'react-i18next';
import { Footer, Header } from '../layout';
import { CompanyItem, CompanyHover, NumberAnimation, TextAnimation } from '../reusable';
import ScrollDownAnimation from '../../assets/animation/scroll-down.json';
import BackVideo from '../../assets/video/back-video.mp4';
import BackVideoSP from '../../assets/png/back-video-sp.png';
import { statistics, companies } from '../../config/constants';
import useWidth from '../../hooks/useWidth';

const Home = () => {
    const { t } = useTranslation();
    const statementRef = useRef();
    const windowWidth = useWidth();
    const videoRef = useRef();
    const [page, setPage] = useState(-1);
    const [visitCompany, setVisitCompany] = useState(-1);
    const [forceClose, setForceClose] = useState(false);
    const [blurShow, setBlurShow] = useState(false);
    const [swipe, setSwipe] = useState({});
    const [bgBlack, setBGBlack] = useState(true);
    const [rendered, setRendered] = useState(false);

    if (statementRef.current) statementRef.current.innerHTML = t('home.statement');

    useEffect(() => {
        setPage(0);
    }, []);

    useEffect(() => {
        if (!blurShow) setPage(0);
        else if (page === 0) setPage(1);

        // eslint-disable-next-line
    }, [blurShow]);

    return (
        <div className="w-screen h-screen">
            <Header
                isRoundLogo={page > 0}
                isBlackLogo={page === 3}
                isBlackMenu={page === 3 && visitCompany < 0}
                isCompanyHover={visitCompany >= 0}
                closeHover={() => setForceClose(true)}
            />
            <CompanyHover
                companies={companies}
                selected={visitCompany}
                onRelease={() => {
                    setVisitCompany(-1);
                    setForceClose(false);
                }}
                forceClose={forceClose}
            />
            <div
                className={`fixed w-2 right-0 bg-gold-100 z-[100] transition-all duration-[600ms] ${
                    visitCompany >= 0 ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                    height: page * 25 + '%',
                }}
            />
            {page < 3 && (
                <div className="fixed w-full h-[80px] z-[90] bottom-10 -ml-4 px-8">
                    <div className="max-w-[1360px] mx-auto h-full relative">
                        <div className="w-[50px]">
                            <Lottie
                                options={{
                                    loop: true,
                                    autoplay: true,
                                    animationData: ScrollDownAnimation,
                                    rendererSettings: {
                                        preserveAspectRatio: 'xMidYMid slice',
                                    },
                                }}
                                isClickToPauseDisabled={true}
                                height={80}
                                width={50}
                            />
                        </div>
                    </div>
                </div>
            )}
            <ReactFullpage
                scrollingSpeed={1500}
                easing="cubic-bezier(0.25, 0.1, 0.25, 1)"
                onLeave={(origin, dest) => {
                    setPage(!dest.index ? (blurShow ? 1 : 0) : dest.index + 1);
                }}
                render={({ state, fullpageApi }) => {
                    if (state?.destination?.index === 0 && windowWidth > 768) {
                        videoRef.current.play();
                    }

                    if (state?.destination?.index === 2) {
                        setBGBlack(false);
                    }

                    if (state?.destination?.index === 1 || state?.destination?.index === 3) {
                        setBGBlack(true);
                    }

                    if (fullpageApi) {
                        if (!rendered) {
                            fullpageApi.moveSectionUp();
                            fullpageApi.moveSectionUp();
                            fullpageApi.moveSectionUp();
                            setRendered(true);
                        }
                        if (page === 3) {
                            fullpageApi.setAllowScrolling(visitCompany < 0);
                        } else if (page === 0) {
                            fullpageApi.setAllowScrolling(false);
                        }
                    }
                    return (
                        <ReactFullpage.Wrapper>
                            <div
                                className="section first-overlay-section"
                                onWheel={(e) => {
                                    if (page === 1 && e.deltaY < 0) {
                                        setTimeout(() => {
                                            setBlurShow(false);
                                        }, 500);
                                    }

                                    if (page === 0 && e.deltaY > 0) {
                                        setTimeout(() => {
                                            setBlurShow(true);
                                        }, 500);
                                    }

                                    if (e.deltaY > 0) {
                                        setTimeout(() => {
                                            fullpageApi.setAllowScrolling(true);
                                        }, 1500);
                                    }
                                }}
                                onTouchStart={(e) => {
                                    const touch = e.touches[0];
                                    setSwipe({ y: touch.clientY });
                                }}
                                onTouchMove={(e) => {
                                    if (e.changedTouches && e.changedTouches.length) {
                                        setSwipe({
                                            ...swipe,
                                            swiping: true,
                                        });
                                    }
                                }}
                                onTouchEnd={(e) => {
                                    const touch = e.changedTouches[0];
                                    if (swipe.swiping) {
                                        if (page === 1 && swipe.y < touch.clientY) {
                                            setTimeout(() => {
                                                setBlurShow(false);
                                            }, 500);
                                        }

                                        if (page === 0 && swipe.y > touch.clientY) {
                                            setTimeout(() => {
                                                setBlurShow(true);
                                            }, 500);
                                        }

                                        if (swipe.y > touch.clientY) {
                                            setTimeout(() => {
                                                fullpageApi.setAllowScrolling(true);
                                            }, 1500);
                                        }
                                    }
                                    setSwipe({});
                                }}
                            >
                                <section className="w-screen h-screen relative unselectable">
                                    {/* <HeaderLogo /> */}
                                    {windowWidth > 768 ? (
                                        <video
                                            autoPlay
                                            muted
                                            loop
                                            ref={videoRef}
                                            className={`absolute z-0 w-screen h-screen object-cover transition-all duration-1000 ${
                                                blurShow ? 'blur-[12px]' : ''
                                            }`}
                                        >
                                            <source src={BackVideo} />
                                        </video>
                                    ) : (
                                        <img
                                            className={`absolute z-0 w-screen h-screen object-cover transition-all duration-1000 ${
                                                blurShow ? '' : ''
                                            }`}
                                            src={BackVideoSP}
                                            alt="background video thumbnail"
                                        />
                                    )}

                                    {/* <div
                                        className={`w-screen h-screen absolute transition-all duration-1000 ${
                                            blurShow ? 'opacity-0' : 'opacity-100'
                                        }`}
                                    > */}
                                    <div
                                        className={`absolute w-full h-full bg-[#FEC900] mix-blend-multiply transition-all duration-1000 ${
                                            blurShow ? 'opacity-50' : 'opacity-50'
                                        }`}
                                    />
                                    <div
                                        className={`absolute w-full h-full bg-[#FEC900] mix-blend-color transition-all duration-1000 ${
                                            blurShow ? 'opacity-100' : 'opacity-100'
                                        }`}
                                    />
                                    <div
                                        className={`absolute w-full h-full bg-[#FEC900] mix-blend-overlay transition-all duration-1000 ${
                                            blurShow ? 'opacity-40' : 'opacity-40'
                                        }`}
                                    />
                                    <div className="absolute w-[70%] h-full home-mask-area-2" />
                                    <div className="absolute w-full h-[30%] bottom-0 home-mask-area-3" />
                                    {/* </div> */}
                                    <div
                                        className={`w-full h-full absolute bg-gold-500 transition-all duration-1000 blur-[50px] ${
                                            blurShow ? 'opacity-60 ' : 'opacity-0'
                                        }`}
                                    />

                                    <div className="w-full h-full px-8 relative z-20">
                                        <div className="max-w-[1360px] mx-auto w-full h-full relative">
                                            <div
                                                className={`left-0 absolute w-full h-full flex items-center transition-all ${
                                                    blurShow
                                                        ? 'opacity-100 duration-[2000ms]'
                                                        : 'opacity-0 duration-[200ms]'
                                                }`}
                                            >
                                                <TextAnimation
                                                    text={t('home.credibility')}
                                                    animationRunning={page === 1}
                                                />
                                            </div>
                                            <div
                                                className={`left-0 absolute w-full h-full transition-all  ${
                                                    blurShow
                                                        ? 'opacity-0 duration-[200ms]'
                                                        : 'opacity-100 duration-[2000ms]'
                                                }`}
                                            >
                                                <h1
                                                    className="text-2xl sm:text-3xl md:text-5xl pt-[55vh] tracking-tight"
                                                    ref={statementRef}
                                                >
                                                    {' '}
                                                </h1>
                                                <p
                                                    className="text-gold-100 font-bold mt-8 md:mt-14 text-sm md:text-lg cursor-pointer"
                                                    onClick={() => {
                                                        setBlurShow(true);
                                                    }}
                                                >
                                                    {t('home.learn-more')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {/* <section className="w-screen h-screen relative unselectable">
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        className="absolute z-0 w-screen h-screen object-cover blur-[36px]"
                                    >
                                        <source src={BackVideo} />
                                    </video>
                                    <div className="w-full h-full absolute bg-gold-500 opacity-90" />
                                    <div className="w-full h-full px-6 relative z-20">
                                        <div className="max-w-[1360px] mx-auto w-full h-full flex items-center">
                                            <TextAnimation text={t('home.credibility')} animationRunning={page === 0} />
                                        </div>
                                    </div>
                                </section> */}
                            </div>
                            {/* <div className="section">
                                
                            </div> */}
                            <div className="section">
                                <section
                                    className={`w-screen h-screen relative overflow-hidden flex flex-col justify-center transition duration-1000 ${
                                        bgBlack ? 'bg-black' : 'bg-[#F9F9F9]'
                                    }`}
                                >
                                    <div className="flex items-center justify-center gap-x-4 md:gap-x-12 flex-wrap max-w-[1000px] mx-auto">
                                        {statistics.map((stat) => (
                                            <NumberAnimation
                                                key={stat.text}
                                                prefix={stat.prefix}
                                                number={stat.number}
                                                suffix={stat.suffix}
                                                text={t(stat.text)}
                                                showCircle={page === 2}
                                            />
                                        ))}
                                    </div>
                                </section>
                            </div>
                            <div className="section">
                                <section
                                    className={`w-screen h-screen relative  transition duration-1000 overflow-hidden ${
                                        bgBlack ? 'bg-black' : 'bg-[#F9F9F9]'
                                    }`}
                                >
                                    <div className="w-full h-full px-6 relative">
                                        <div className="max-w-[1220px] mx-auto w-full h-full grid grid-cols-1 md:grid-cols-2 text-black items-center">
                                            <div className="h-[20vh] sm:h-fit col-span-1 px-0 pt-8 md:pt-0 md:px-8 max-w-[570px]">
                                                <h3 className="text-sm md:text-lg text-gold-100 font-bold">
                                                    {t('home.our.companies')}
                                                </h3>
                                                <TextAnimation
                                                    text={t('home.companies.title')}
                                                    animationRunning={page === 3}
                                                    isSmallFont={true}
                                                    isCentered={false}
                                                    className="mt-4"
                                                />
                                            </div>
                                            <div className="h-[80vh] sm:h-fit -mx-8 mt-4 md:mx-0 md:mt-0 col-span-1 grid grid-cols-2 md:grid-cols-3">
                                                {companies.map((company, index) => (
                                                    <CompanyItem
                                                        company={company}
                                                        key={index}
                                                        className={`col-span-1 h-[20vh] md:h-[200px] border-[1px] ${
                                                            index < 3 ? 'md:border-t-0' : ''
                                                        } ${index > 5 ? 'md:border-b-0' : ''} ${
                                                            index % 3 === 0 ? 'md:border-l-2' : ''
                                                        } ${index % 3 === 2 ? 'md:border-r-2' : ''}`}
                                                        onClick={(e) => {
                                                            setVisitCompany(index);
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className={`section`}>
                                <Footer
                                    className={`transition duration-1000 ${bgBlack ? 'bg-black' : 'bg-[#F9F9F9]'}`}
                                    onScrollTop={() => {
                                        setPage(0);
                                        setBlurShow(false);
                                        fullpageApi.moveSectionUp();
                                        fullpageApi.moveSectionUp();
                                        fullpageApi.moveSectionUp();
                                    }}
                                />
                            </div>
                        </ReactFullpage.Wrapper>
                    );
                }}
            />
            {/* <ReactPageScroller
                pageOnChange={(number) => setPage(number)}
                renderAllPagesOnFirstRender={false}
                customPageNumber={page}
                animationTimerBuffer={500}
                transitionTimingFunction="cubic-bezier(0.25, 0.1, 0.25, 1)"
            >
                
            </ReactPageScroller> */}
        </div>
    );
};

export default Home;

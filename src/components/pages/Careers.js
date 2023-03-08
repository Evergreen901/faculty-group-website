import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '../layout';
import BackVideo from '../../assets/video/back-video.mp4';
import BackVideoSP from '../../assets/png/back-video-sp.png';
import Search from '../../assets/svg/search.svg';
import GlobalContext from '../../context/global/GlobalContext';
import { Loading180Ring } from '../../assets/loading';
import { HeaderLogo } from '../reusable';
import { Link } from 'react-router-dom';
import useWidth from '../../hooks/useWidth';
// import { ArrowIcon } from '../../assets/icons';

const Careers = () => {
    const { t } = useTranslation();
    const { careerData, careerLoaded } = useContext(GlobalContext);
    const [scrollPos, setScrollPos] = useState();
    const [isBlackMenu, setBlackMenu] = useState(false);
    const windowWidth = useWidth();

    window.addEventListener('scroll', (e) => {
        setScrollPos(window.scrollY);
    });

    useEffect(() => {
        const sections = document.querySelectorAll('section');
        if (!scrollPos || !sections?.length) return;

        setBlackMenu(
            scrollPos + 80 > sections[1].offsetTop && scrollPos + 80 < sections[1].offsetTop + sections[1].clientHeight
        );
    }, [scrollPos]);

    return (
        <div className="w-screen">
            <Header isRoundLogo={scrollPos > 0} isBlackMenu={isBlackMenu} />
            <section className="w-screen h-[550px] relative">
                <HeaderLogo />
                {windowWidth > 768 ? (
                    <video autoPlay muted loop className="absolute z-0 w-screen h-[550px] object-cover">
                        <source src={BackVideo} />
                    </video>
                ) : (
                    <img
                        alt="background video thumbnail"
                        src={BackVideoSP}
                        className="absolute z-0 w-screen h-[550px] object-cover"
                    />
                )}
                <div className="absolute w-full h-full bg-[#FEC900] opacity-50 mix-blend-multiply" />
                <div className="absolute w-full h-full bg-[#FEC900] mix-blend-color" />
                <div className="absolute w-full h-full bg-[#FEC900] opacity-40 mix-blend-overlay" />
                <div
                    className="w-full h-[550px] absolute"
                    style={{
                        background: `linear-gradient(0deg, #000000 24%, transparent)`,
                    }}
                />
                <div
                    className="w-[50%] h-[550px] absolute"
                    style={{
                        background: `linear-gradient(70deg, #000000 24%, transparent 60%)`,
                    }}
                />
                <div className="w-full h-full px-6 relative z-20">
                    <div className="max-w-[1100px] mx-auto w-full h-full relative">
                        <div className="text-md md:text-lg pt-[250px] font-bold text-gold-100">{t('career.title')}</div>
                        <div className="pt-6 text-2xl md:text-3xl max-w-[480px] flex flex-col items-center justify-center">
                            {t('career.statement')}
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-screen relative bg-gray">
                <div className="w-full px-6 relative z-20">
                    <div className="max-w-[1100px] mx-auto w-full relative pt-32 pb-32 gap-x-5">
                        <div className="relative pb-8">
                            <input
                                className="w-full search-input border-none text-black outline-0 rounded-xl h-[66px] pl-[80px]"
                                placeholder="Search by title, company or location"
                            />
                            <div className="absolute top-[22px] left-[26px]">
                                <img src={Search} alt="Search Icon" />
                            </div>
                        </div>
                        {/* <div className="grid grid-cols-2 text-black pl-8 pr-8 pb-8">
                            <span>{jobs.length} Jobs Found</span>
                            <div className="flex justify-between">
                                <div className="flex items-center cursor-pointer">
                                    <span>Companies</span>
                                    <ArrowIcon className="rotate-180 ml-2" width={10} height={20} fill="black" />
                                </div>
                                <div className="flex items-center cursor-pointer">
                                    <span>Job Roles</span>
                                    <ArrowIcon className="rotate-180 ml-2" width={10} height={20} fill="black" />
                                </div>
                                <div className="flex items-center cursor-pointer">
                                    <span>Location</span>
                                    <ArrowIcon className="rotate-180 ml-2" width={10} height={20} fill="black" />
                                </div>
                            </div>
                        </div> */}
                        {!careerLoaded ? (
                            <div className="w-full h-60 flex items-center justify-center">
                                <Loading180Ring width={48} height={48} />
                            </div>
                        ) : (
                            careerData.map((job, index) => (
                                <div
                                    className="grid grid-cols-[2fr_8fr] md:grid-cols-[1fr_6fr_2fr] p-6 md:p-8 bg-white mb-4 rounded-xl items-center"
                                    key={job.id}
                                >
                                    <img
                                        src={job.acf.company_logo}
                                        alt="Job Logo"
                                        className="min-w-16 min-h-16 md:w-20 md:h-20"
                                    />
                                    <div className="flex flex-col justify-center pl-4">
                                        <span className="text-lg md:text-xl text-black mb-2">{job.title.rendered}</span>
                                        <span className="text-sm md:text-md text-gray-400">{job.acf.company}</span>
                                    </div>
                                    {/* <div className="flex flex-col justify-center text-gray-400">
                                        <span className="mb-2">Full Time</span>
                                        <span>Remote</span>
                                    </div> */}
                                    <div className="flex flex-col justify-center col-span-12 md:col-span-1 items-center">
                                        <Link
                                            to={`/career/${index}`}
                                            className="text-md text-black mt-4 md:mt-0 py-3 px-10 md:px-5 lg:px-10 border h-fit w-fit rounded-[4rem] border-black hover:bg-gray-100 hover:opacity-70 transition"
                                        >
                                            More Info
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                        <div className="pt-32 text-center text-gray-400 underline">
                            <a href="/career">See More</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Careers;

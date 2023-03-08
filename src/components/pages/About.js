import React, { useEffect, useState } from 'react';
import { Header } from '../layout';
import { HeaderLogo, TextAnimation } from '../reusable';
import { useTranslation } from 'react-i18next';
import TeamMember1 from '../../assets/png/team1.png';
import TeamMember2 from '../../assets/png/team2.png';
import TeamMember3 from '../../assets/png/team3.png';
import TeamMember4 from '../../assets/png/team4.png';
import TeamMember5 from '../../assets/png/team5.png';
import TeamMember6 from '../../assets/png/team6.png';
import BackVideo from '../../assets/video/back-video.mp4';
import BackVideoSP from '../../assets/png/back-video-sp.png';
import useWidth from '../../hooks/useWidth';

const teamMembers = [
    {
        name: 'Philipp Zimmerer',
        position: 'Partner',
        image: TeamMember5,
    },
    {
        name: 'Luke Lombe',
        position: 'Partner',
        image: TeamMember4,
    },
    {
        name: 'James Childs',
        position: 'Partner',
        image: TeamMember3,
    },
    {
        name: 'Yaroslav Writtle',
        position: 'Partner',
        image: TeamMember6,
    },
    {
        name: 'Michal Uhliarik',
        position: 'Partner',
        image: TeamMember1,
    },
    {
        name: 'James Scott',
        position: 'Partner',
        image: TeamMember2,
    },
];

const About = () => {
    const { t } = useTranslation();
    const [scrollPos, setScrollPos] = useState();
    const [isBlackMenu, setBlackMenu] = useState(false);
    // const [isLottieShow, setLottieShow] = useState(false);
    const [scrollOffset, setScrollOffset] = useState(0);
    const [fadeSize, setFadeSize] = useState(0);
    const windowWidth = useWidth();

    window.addEventListener('scroll', (e) => {
        setScrollPos(window.scrollY);
    });

    useEffect(() => {
        const sections = document.querySelectorAll('section');
        if (!scrollPos || !sections?.length) return;

        setBlackMenu(scrollPos + 80 > sections[1].offsetTop && scrollPos + 80 < sections[2].offsetTop);

        const vh = document.documentElement.clientHeight;
        if (scrollPos <= vh) {
            setFadeSize((scrollPos * 255) / vh);
        }

        if (scrollPos < sections[2].offsetTop - vh || scrollPos > sections[2].offsetTop + sections[2].clientHeight)
            return;
        const scrollArea = sections[2].clientHeight + vh;
        setScrollOffset(Math.floor(((scrollPos - sections[2].offsetTop + vh) * 100) / scrollArea));
    }, [scrollPos]);

    return (
        <div className="w-screen">
            <Header isRoundLogo={scrollPos > 0} isBlackMenu={isBlackMenu} />
            <section
                className="w-screen h-screen relative "
                style={{
                    background: `rgb(${fadeSize}, ${fadeSize}, ${fadeSize})`,
                }}
            >
                <HeaderLogo />
                {windowWidth > 768 ? (
                    <video autoPlay muted loop className="absolute z-0 w-screen h-[50vh] object-cover">
                        <source src={BackVideo} />
                    </video>
                ) : (
                    <img
                        alt="background video thumbnail"
                        src={BackVideoSP}
                        className="absolute z-0 w-screen h-[50vh] object-cover"
                    />
                )}

                <div className="absolute w-full h-[50vh] bg-[#FEC900] opacity-50 mix-blend-multiply" />
                <div className="absolute w-full h-[50vh] bg-[#FEC900] mix-blend-color" />
                <div className="absolute w-full h-[50vh] bg-[#FEC900] opacity-40 mix-blend-overlay" />
                <div
                    className="w-full h-[52vh] absolute"
                    style={{
                        background: `linear-gradient(0deg, rgb(${fadeSize}, ${fadeSize}, ${fadeSize}) 24%, transparent)`,
                    }}
                />
                <div
                    className="w-[50%] h-[52vh] absolute"
                    style={{
                        background: `linear-gradient(70deg, rgb(${fadeSize}, ${fadeSize}, ${fadeSize}) 24%, transparent 60%)`,
                    }}
                />
                <div className="w-full h-full px-6 relative z-20">
                    <div className="max-w-[1220px] mx-auto w-full h-full relative">
                        <div className="h-full flex flex-col items-center justify-center">
                            <TextAnimation
                                text={t('about.statement')}
                                animationRunning={true}
                                className="!max-w-[900px]"
                            />
                        </div>
                        <div
                            className="absolute bottom-16 w-full "
                            style={{
                                background: `rgb(${fadeSize}, ${fadeSize}, ${fadeSize})`,
                            }}
                        >
                            <h2
                                className="text-center text-lg font-bold transition mix-blend-difference"
                                // style={{
                                //     color: `rgb(${255 - fadeSize}, ${255 - fadeSize}, ${255 - fadeSize})`,
                                // }}
                            >
                                {t('about.meet.our.team')}
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-screen relative" style={{ background: `rgb(${fadeSize}, ${fadeSize}, ${fadeSize})` }}>
                <div className="w-full px-6 relative z-20">
                    <div className="max-w-[1220px] mx-auto w-full relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-20 md:pt-30 pb-20 md:pb-60 gap-x-5 gap-y-5">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="flex flex-col justify-end">
                                <div className="overflow-hidden flex flex-col justify-end items-center relative">
                                    <div className="">
                                        <img
                                            src={member.image}
                                            alt="team member"
                                            className="w-full h-auto relative z-10 w-[300px]"
                                        />
                                        <p className="mt-4 font-bold text-xl text-gray-500 bottom-12 left-0 text-center sm:text-left">
                                            {member.name}
                                        </p>
                                        <p className="text-xl text-gray-500 bottom-4 left-0 text-center sm:text-left">
                                            {member.position}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="w-screen px-6">
                <div className="max-w-[1220px] mx-auto relative pb-80">
                    <div className="pt-[270px] relative">
                        <h1
                            className="text-[120px] md:text-[280px] md:leading-[320px] opacity-10 absolute font-bold top-[90px] md:top-[60px] transition duration-[500ms]"
                            style={{
                                transform: `translate(${(100 - scrollOffset) * 7 - 200}px)`,
                            }}
                        >
                            {t('about.vision')}
                        </h1>
                        <h2 className="max-w-[740px] text-xl md:text-3xl ">{t('about.vision.text')}</h2>
                    </div>
                    <div className="pt-[230px] relative">
                        <h1
                            className="text-[120px] md:text-[280px] md:leading-[320px] opacity-10 absolute font-bold top-[40px] md:top-[20px] transition duration-[500ms]"
                            style={{
                                transform: `translate(${scrollOffset * 7 - 300}px)`,
                            }}
                        >
                            {t('about.mission')}
                        </h1>
                        <h2 className="max-w-[740px] text-xl md:text-3xl ml-auto">{t('about.mission.text')}</h2>
                    </div>
                    <div
                        className="absolute left-0 w-[50%] border-r-2 opacity-30 transition-all duration-500"
                        style={{
                            height: (scrollOffset - 50) * 4,
                            bottom: (50 - scrollOffset) * 4 + 200,
                        }}
                    />
                </div>
            </section>
        </div>
    );
};

export default About;

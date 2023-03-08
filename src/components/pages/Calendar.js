import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cal from '@calcom/embed-react';
import { Header } from '../layout';
import { HeaderLogo } from '../reusable';
import useWidth from '../../hooks/useWidth';
import BackVideo from '../../assets/video/back-video.mp4';
import BackVideoSP from '../../assets/png/back-video-sp.png';
import { Loading180Ring } from '../../assets/loading';

const Calendar = () => {
    const { id } = useParams();
    const [scrollPos, setScrollPos] = useState();

    const [loading, setLoading] = useState(true);
    const windowWidth = useWidth();

    window.addEventListener('scroll', (e) => {
        setScrollPos(window.scrollY);
    });

    useEffect(() => {
        const timerId = setInterval(() => {
            const element = document.querySelector('.cal-embed');
            setLoading(element === null);
        }, [100]);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    return (
        <div className="w-screen">
            <Header isRoundLogo={scrollPos > 0} />
            <section className="w-screen min-h-screen relative ">
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
                        background: `linear-gradient(0deg, rgb(0, 0, 0) 24%, transparent)`,
                    }}
                />
                <div
                    className="w-[50%] h-[52vh] absolute"
                    style={{
                        background: `linear-gradient(70deg, rgb(0, 0, 0) 24%, transparent 60%)`,
                    }}
                />
                <div className="w-full h-full px-6 relative z-20">
                    <div className="max-w-[1220px] mx-auto w-full h-full relative pt-[40vh] md:pt-[300px]">
                        {loading && (
                            <div className="absolute top-0 left-0 w-full h-screen z-[100] flex justify-center items-center">
                                <Loading180Ring width={48} height={48} />
                            </div>
                        )}
                        <Cal
                            calLink={id}
                            config={{
                                theme: 'dark',
                            }}
                            embedJsUrl="https://cal.faculty.group/embed/embed.js"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Calendar;

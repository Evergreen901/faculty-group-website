import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '../layout';
import BackVideo from '../../assets/video/back-video.mp4';
import BackVideoSP from '../../assets/png/back-video-sp.png';
import { CompanyItemLarge, HeaderLogo } from '../reusable';
import { companies } from '../../config/constants';
import useWidth from '../../hooks/useWidth';

const Companies = () => {
    const { t } = useTranslation();
    const [scrollPos, setScrollPos] = useState();
    const windowWidth = useWidth();
    // const [isLottieShow, setLottieShow] = useState(true);

    window.addEventListener('scroll', (e) => {
        setScrollPos(window.scrollY);
    });

    // useEffect(() => {
    //     const footer = document.querySelector('footer');
    //     if (footer) {
    //         setLottieShow(footer.offsetTop >= scrollPos + 80);
    //     }
    // }, [scrollPos]);

    return (
        <div className="w-screen">
            <Header isRoundLogo={scrollPos > 0} />
            <section className="w-screen relative">
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
                <div className="absolute w-full h-full bg-[#FEC900] opacity-50 mix-blend-multiply" />
                <div className="absolute w-full h-full bg-[#FEC900] mix-blend-color" />
                <div className="absolute w-full h-full bg-[#FEC900] opacity-40 mix-blend-overlay" />
                <div
                    className="w-full h-[52vh] absolute"
                    style={{
                        background: `linear-gradient(0deg, #000000 24%, transparent)`,
                    }}
                />
                <div
                    className="w-[50%] h-[52vh] absolute"
                    style={{
                        background: `linear-gradient(70deg, #000000 24%, transparent 60%)`,
                    }}
                />
                <div className="about-mask-area-2 w-full h-[52vh] absolute" />
                <div className="w-full h-full px-6 relative z-20">
                    <div className="max-w-[1100px] mx-auto w-full h-full relative">
                        <h2 className="text-md md:text-lg font-bold text-gold-100 pt-[250px]">
                            {t('home.our.companies')}
                        </h2>
                        <h1 className="text-2xl md:text-4xl mt-4 max-w-[500px]">{t('companies.title')}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-9 mt-10">
                            {companies.map((company, index) => (
                                <CompanyItemLarge key={index} className="" company={company} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Companies;

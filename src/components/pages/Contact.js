import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '../layout';
import BackVideo from '../../assets/video/back-video.mp4';
import BackVideoSP from '../../assets/png/back-video-sp.png';
import EnterSVG from '../../assets/svg/enter.svg';
import { HeaderLogo, PrimaryButton } from '../reusable';
import useWidth from '../../hooks/useWidth';
import { useParams } from 'react-router-dom';
import { Widget } from 'react-typeform-embed';

const Contact = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [step, setStep] = useState(0);
    const windowWidth = useWidth();

    useEffect(() => {
        if (!id) return;
        setStep(1);
        document.documentElement.scrollTop = 0;
    }, [id]);

    const keyDownHandler = (e) => {
        if (e.key === 'Enter') {
            if (step < 4) setStep((prev) => prev + 1);
        }
    };

    useEffect(() => {
        if (step) return;
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };

        // eslint-disable-next-line
    }, [step]);

    return (
        <div className="w-screen h-screen">
            <Header isRoundLogo={true} />
            <section className="w-screen h-screen relative overflow-hidden">
                <HeaderLogo />
                {windowWidth > 768 ? (
                    <video
                        autoPlay
                        muted
                        loop
                        className="absolute z-0 w-screen h-screen object-cover blur-[20px] opacity-60"
                    >
                        <source src={BackVideo} />
                    </video>
                ) : (
                    <img
                        alt="background video thumbnail"
                        src={BackVideoSP}
                        className="absolute z-0 w-screen h-screen object-cover blur-[20px] opacity-60"
                    />
                )}
                <div className="w-full h-full absolute contact-mask-area" />
                <div className="w-full h-full px-6 relative z-20">
                    <div className="max-w-[1220px] mx-auto w-full h-full">
                        {step === 0 ? (
                            <div className=" w-full h-full flex items-center justify-center md:justify-evenly flex-col md:flex-row">
                                <div>
                                    <h1 className="text-3xl md:text-6xl">{t('footer.title')}</h1>
                                    <p className="text-sm md:text-[16px] font opacity-50  max-w-[470px] mt-8">
                                        {t('footer.text')}
                                    </p>
                                </div>
                                <div className="flex items-center mt-12">
                                    <PrimaryButton
                                        text="Get Started"
                                        className="!text-sm !md:text-[16px] w-48"
                                        clickHandler={() => setStep(1)}
                                    />
                                    {/* <button className="text-md font-inter font-bold w-48 rounded-full bg-gradient-to-l from-gold-100 to-gold-400 py-3 hover:opacity-80 transition">
                                        Get Started
                                    </button> */}
                                    <img className="ml-8 mt-1" src={EnterSVG} alt="press enter" />
                                    <span className="text-sm md:text-md opacity-60 ml-2">
                                        {t('footer.press.enter')}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-[745px] mx-auto w-full h-full flex flex-col justify-center">
                                <Widget
                                    id="RUTB6XjR"
                                    style={{
                                        width: '100%',
                                        height: 'calc(100vh - 200px)',
                                        maxHeight: '700px',
                                    }}
                                    opacity={0}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;

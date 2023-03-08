import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Widget } from 'react-typeform-embed';
import { Header } from '../layout';
import { BackIcon } from '../../assets/icons';
import { Loading180Ring } from '../../assets/loading';
import GlobalContext from '../../context/global/GlobalContext';
import { ContentWrapper, ExternalLink, HeaderLogo, PrimaryButton } from '../reusable';

const CareerDetail = () => {
    const { careerData, careerLoaded } = useContext(GlobalContext);
    const { id } = useParams();
    const careerIndex = Number(id.replace(':', ''));
    const [scrollPos, setScrollPos] = useState();

    window.addEventListener('scroll', (e) => {
        setScrollPos(window.scrollY);
    });

    return (
        <div className="w-screen">
            <Header isRoundLogo={scrollPos > 0} />
            <div className="w-full px-6 pt-[220px] relative">
                <HeaderLogo />
                <div className="blog-detail-container">
                    <div className="relative z-30 w-full">
                        {/* first section */}

                        {!careerLoaded ? (
                            <div className="w-full h-60 flex items-center justify-center">
                                <Loading180Ring width={48} height={48} />
                            </div>
                        ) : (
                            <div className="max-w-[750px] mx-auto">
                                <Link to="/career" className="flex items-center">
                                    <BackIcon className="mr-2" />
                                    Back to jobs
                                </Link>

                                <ContentWrapper
                                    className="detail pb-8"
                                    description={careerData[careerIndex]?.content.rendered}
                                />
                                {careerData[careerIndex].acf.application_type === 'external' ? (
                                    <ExternalLink to={careerData[careerIndex].acf.application_site}>
                                        <PrimaryButton text="Apply Now" className="w-60 mt-8" />
                                    </ExternalLink>
                                ) : (
                                    <div className="mx-auto w-full h-full flex flex-col justify-center mt-[0px]">
                                        <Widget
                                            id="LigwvQtD"
                                            style={{
                                                width: '100%',
                                                height: '700px',
                                            }}
                                            opacity={0}
                                            hidden={{
                                                from_website: window.location.href,
                                                job_posting: careerData[careerIndex].title.rendered,
                                                company: careerData[careerIndex].acf.company,
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerDetail;

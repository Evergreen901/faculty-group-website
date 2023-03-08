import 'tw-elements';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import ContentWrapper from './ContentWrapper';
import { BLOG_TAG_TYPE } from '../../config/constants';
// import EmptyUser from '../../assets/png/EmptyUser.png';

const ImageSlider = ({ sliderData, className, clickHandler, isStory = false }) => {
    const [selected, setSelection] = useState(0);
    const contentRef = useRef();
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (contentRef.current) contentRef.current.innerHTML = sliderData?.description;
        const timerId = setInterval(() => {
            setSelection((prev) => (prev + 1) % sliderData.length);
        }, 8000);

        return () => {
            clearInterval(timerId);
        };
    }, [sliderData]);

    const goDetail = (index) => {
        navigate(`/insight/${index}`);
    };

    return (
        <div
            id="carouselExampleCaptions"
            className={clsx(
                className,
                'carousel slide carousel-fade carousel-dark relative h-[450px] rounded-[10px]',
                isStory ? 'h-[550px] sm:h-[450px]' : ''
            )}
            data-bs-ride="carousel"
            onClick={clickHandler}
        >
            <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                {sliderData.map((item, index) => (
                    <button
                        key={index}
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={index}
                        className={selected === index ? 'active' : ''}
                        aria-current={selected === index ? 'true' : ''}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => setSelection(index)}
                    ></button>
                ))}
            </div>
            <div
                className={clsx(
                    className,
                    'carousel-inner relative w-full overflow-hidden h-[450px] rounded-[10px]',
                    isStory ? 'h-[550px] sm:h-[450px]' : ''
                )}
            >
                {sliderData.map((item, index) => (
                    <div
                        className={clsx(
                            'carousel-item relative float-left w-full h-full rounded-[10px] overflow-hidden cursor-pointer',
                            selected === index ? 'active' : ''
                        )}
                        key={index}
                        onClick={() => (isStory ? void 0 : goDetail(item?.blogIndex))}
                    >
                        <img
                            src={isStory ? item.image : item?.jetpack_featured_media_url}
                            className="rounded-t-[10px] min-w-full min-h-full object-cover transition blur-[4px]"
                            alt="..."
                        />
                        <div className="absolute left-0 top-0 bg-black-100 w-full h-full opacity-50" />
                        {!isStory && (
                            <div className="absolute left-[10%] right-[10%] top-[10%] flex items-center justify-end">
                                {/* <div className="flex items-center">
                                    <img
                                        src={
                                            item?._embedded.author[0].avatar_urls
                                                ? item?._embedded.author[0].avatar_urls[96]
                                                : EmptyUser
                                        }
                                        className="block w-[20px] h-[20px] rounded-[99px] bg-transparent"
                                        alt="avatar"
                                    />
                                    <span className="font-bold text-[10px] text-white leading-[12px] pl-1">
                                        {item?._embedded.author[0].name}
                                    </span>
                                    <span className="text-[10px] text-white leading-[12px] pl-1">
                                        {item?._embedded.author[0].description}
                                    </span>
                                </div> */}
                                <span
                                    className={clsx(
                                        'font-bold text-[10px] text-white leading-[21px] tracking-[1px] bg-origin-padding bg-no-repeat rounded-[6px] px-6 py-1',
                                        item.tags.includes(BLOG_TAG_TYPE.PODCAST)
                                            ? 'bg-[#E55800]'
                                            : 'bg-gradient-to-r from-gold-600 to-gold-800'
                                    )}
                                >
                                    {item.tags.includes(BLOG_TAG_TYPE.PODCAST)
                                        ? t('blog.tags.podcast').toUpperCase()
                                        : item.tags.includes(BLOG_TAG_TYPE.NEWS)
                                        ? t('blog.tags.news').toUpperCase()
                                        : item.tags.includes(BLOG_TAG_TYPE.INSIGHTS)
                                        ? t('blog.tags.insights').toUpperCase()
                                        : item.tags.includes(BLOG_TAG_TYPE.RESEARCH)
                                        ? t('blog.tags.research').toUpperCase()
                                        : ''}
                                </span>
                            </div>
                        )}

                        <div
                            className={clsx(
                                'left-[10%] w-[80%] py-5 absolute',
                                isStory
                                    ? 'top-[10%] md:top-[15%] text-center'
                                    : 'bottom-[15%] text-left hidden md:block'
                            )}
                        >
                            <h2
                                className={clsx(
                                    'font-bold ',
                                    isStory
                                        ? 'gradient-text2 text-[22px] leading-[28px] -tracking-[0.6px]'
                                        : 'text-white text-[36px] leading-[50px] -tracking-[0.9px]'
                                )}
                            >
                                {isStory ? item.title : item.title.rendered}
                            </h2>
                            {isStory ? (
                                <div className="flex items-center justify-center h-[300px]">
                                    <p className="pt-4 md:pt-10 font-bold text-[24px] md:text-[36px] leading-[32px] md:leading-[50px] -tracking-[0.6px] md:-tracking-[0.9px] text-[#FAFAFA]">
                                        {item.description}
                                    </p>
                                </div>
                            ) : (
                                <ContentWrapper type="white" description={item.excerpt.rendered} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;

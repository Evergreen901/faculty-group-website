import { Header } from '../layout';
import clsx from 'clsx';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { ContentWrapper, BlogCard, SecondaryButton, HeaderLogo } from '../reusable';
import { Loading180Ring } from '../../assets/loading';
import GlobalContext from '../../context/global/GlobalContext';
import { useTranslation } from 'react-i18next';

const InsightDetail = () => {
    const { blogData, blogLoaded } = useContext(GlobalContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const [viewAll, setViewAll] = useState(false);

    const goDetail = (index) => {
        navigate(`/insight/${index}`);
    };

    const blogIndex = Number(id.replace(':', ''));

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
                    <div className="relative z-30">
                        {/* first section */}

                        {!blogLoaded ? (
                            <div className="w-full h-60 flex items-center justify-center">
                                <Loading180Ring width={48} height={48} />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-8 xl:gap-20 md:grid-cols-2 lg:grid-cols-3 pb-8 border-solid border-b">
                                <ContentWrapper
                                    className="col-span-1 lg:col-span-2 detail"
                                    description={blogData[blogIndex]?.content.rendered}
                                />
                                <div className="col-span-1 latest-news-container w-full md:!w-[350px] md:before:hidden md:after:hidden">
                                    <div className="flex flex-col items-center justify-center rounded-t-[10px] px-5 py-7 md:px-10 md:py-14">
                                        <h4 className="text-gold-100 font-bold text-lg ">
                                            {t('blog.detail.latest-news')}
                                        </h4>
                                        <div className="grid gap-4 pt-10">
                                            {blogData?.length !== 0 &&
                                                blogData.map((item, index) => {
                                                    if (index >= 5 && !viewAll) return <div key={index}></div>;
                                                    return (
                                                        <BlogCard
                                                            key={index}
                                                            imgUrl={item.jetpack_featured_media_url}
                                                            type={item.tags}
                                                            caption={item.title.rendered}
                                                            description={item.content.rendered}
                                                            clickHandler={() => goDetail(index)}
                                                            detail
                                                        />
                                                    );
                                                })}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center rounded-b-[10px] pb-10 md:border-t md:border-solid md:border-black md:py-4 w-full">
                                        <SecondaryButton
                                            className={clsx(
                                                'md:font-bold md:text-[14px] md:leading-[17px] md:text-[#333333] md:underline md:!border-none md:before:hidden md:hover:!text-inherit',
                                                viewAll
                                                    ? 'opacity-20 before:hidden hover:!text-inherit !border-[#0000ff]'
                                                    : 'md:opacity-100'
                                            )}
                                            text={t('blog.view-all')}
                                            color={'black'}
                                            clickHandler={() => setViewAll(true)}
                                            isDisabled={viewAll}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsightDetail;

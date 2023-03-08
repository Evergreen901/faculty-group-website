import { Header } from '../layout';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { CustomSelect, BlogCard, InsightsSignUpCard, ImageSlider, SecondaryButton, HeaderLogo } from '../reusable';
import { useTranslation } from 'react-i18next';
import GlobalContext from '../../context/global/GlobalContext';
import { useWidth } from '../../hooks';
import { Loading180Ring } from '../../assets/loading';
import { BLOG_TAG_TYPE } from '../../config/constants';

const Insights = () => {
    const { blogData, blogLoaded, featuredBlogs, setSearchBlogs, searchBlogs } = useContext(GlobalContext);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [viewAll, setViewAll] = useState(false);
    const windowWidth = useWidth();

    const getColSpan = () => {
        if (!searchBlogs || !searchBlogs.length) return 1;
        if (searchBlogs.length % 3 === 0) return 1;
    };

    const goDetail = (index) => {
        navigate(`/insight/${index}`);
    };

    const itemChanged = (selected) => {
        const searchResult = blogData.filter((el) => {
            if (Number(selected.value) === BLOG_TAG_TYPE.ALL || el.tags.includes(Number(selected.value))) {
                return true;
            }
            return false;
        });
        setSearchBlogs(searchResult);
    };

    const [scrollPos, setScrollPos] = useState();

    window.addEventListener('scroll', (e) => {
        setScrollPos(window.scrollY);
    });

    return (
        <div className="w-screen">
            <Header isRoundLogo={scrollPos > 0} />
            <div className="w-full px-6 pt-[220px] relative">
                <HeaderLogo />
                <div className="blog-container after:hidden before:hidden md:after:block md:before:block relative">
                    <h2 className="text-md md:text-lg font-bold text-gold-100">{t('blog.tags.insights')}</h2>
                    <h1 className="text-2xl md:text-4xl mt-4 max-w-[500px]">{t('blog.title')}</h1>
                    <div className="relative z-30">
                        {/* first section */}

                        {!blogLoaded ? (
                            <div className="w-full h-60 flex items-center justify-center">
                                <Loading180Ring width={48} height={48} />
                            </div>
                        ) : (
                            <>
                                {/* second section */}
                                <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
                                    <div className="flex items-center justify-between md:col-end-3 lg:col-end-4">
                                        <span className="font-medium text-[14px] text-white leading-[21px]">
                                            {searchBlogs?.length} {t('filters.result')}
                                        </span>
                                        <CustomSelect changeHandler={itemChanged} />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center md:grid md:justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    <ImageSlider sliderData={featuredBlogs} className="col-span-2 hidden md:block" />
                                    {searchBlogs?.length !== 0 &&
                                        searchBlogs.map((item, index) => {
                                            if (windowWidth <= 768 && !viewAll && index >= 5)
                                                return <div key={index}></div>;
                                            return (
                                                <BlogCard
                                                    key={index}
                                                    imgUrl={item.jetpack_featured_media_url}
                                                    type={item.tags}
                                                    caption={item.title.rendered}
                                                    description={item.content.rendered}
                                                    clickHandler={() => goDetail(item.blogIndex)}
                                                />
                                            );
                                        })}
                                    <SecondaryButton
                                        className={clsx(
                                            'w-[40vw] my-10 md:hidden',
                                            viewAll
                                                ? 'opacity-20 before:hidden hover:!text-inherit !border-[#0000ff]'
                                                : 'md:opacity-100'
                                        )}
                                        text={t('button.view-more')}
                                        color={'black'}
                                        clickHandler={() => setViewAll(true)}
                                        isDisabled={viewAll}
                                    />
                                    <InsightsSignUpCard type={getColSpan()} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Insights;

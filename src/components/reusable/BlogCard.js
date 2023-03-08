import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Podcast } from '../../assets/icons';
import { BLOG_TAG_TYPE } from '../../config/constants';
import ContentWrapper from './ContentWrapper';

const BlogCard = ({ imgUrl, type, caption, description, clickHandler, detail = false }) => {
    const { t } = useTranslation();

    return (
        <div className={clsx('blog-card-container', detail ? 'detail' : '')} onClick={clickHandler}>
            {type.includes(BLOG_TAG_TYPE.PODCAST) && !detail && <Podcast className="absolute top-8 left-8 z-[2]" />}
            <div
                className={clsx(
                    'overflow-hidden',
                    detail
                        ? 'rounded-[10px] aspect-square max-w-[125px] min-w-[125px] max-h-[125px]'
                        : 'rounded-t-[10px] max-h-[220px]'
                )}
            >
                <img
                    src={imgUrl}
                    alt="blog item"
                    className={clsx(
                        'min-w-full min-h-full object-cover transition',
                        detail ? 'rounded-[10px]' : 'rounded-t-[10px]'
                    )}
                />
            </div>
            <div
                className={clsx(
                    'bg-[#171717] bg-origin-padding bg-no-repeat overflow-hidden mask-area-vertical',
                    detail ? 'rounded-[10px] max-h-[125px] ml-4' : 'rounded-b-[10px] p-8 max-h-[220px]'
                )}
            >
                <span
                    className={clsx(
                        'font-extrabold text-[10px] leading-[12px] tracking-[2px]',
                        type.includes(BLOG_TAG_TYPE.PODCAST) ? 'text-[#E55800]' : 'text-gold-100'
                    )}
                >
                    {type.includes(BLOG_TAG_TYPE.NEWS)
                        ? t('blog.tags.news').toUpperCase()
                        : type.includes(BLOG_TAG_TYPE.PODCAST)
                        ? t('blog.tags.podcast').toUpperCase()
                        : type.includes(BLOG_TAG_TYPE.INSIGHTS)
                        ? t('blog.tags.insights').toUpperCase()
                        : type.includes(BLOG_TAG_TYPE.RESEARCH)
                        ? t('blog.tags.research').toUpperCase()
                        : ''}
                </span>
                {!detail && (
                    <h4 className="font-bold text-white text-[20px] leading-[28px] -tracking-[0.55px] py-2 transition">
                        {caption}
                    </h4>
                )}

                <ContentWrapper description={description} />
            </div>
        </div>
    );
};

export default BlogCard;

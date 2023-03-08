import clsx from 'clsx';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import React, { useEffect, useRef, useState } from 'react';
import { PrimaryButton } from '../reusable';
import { fetchWrapper } from '../../helpers/fetch-wrapper';

const InsightsSignUpCard = ({ type = 2 }) => {
    const ref = useRef();
    const { t } = useTranslation();
    const [email, setEmail] = useState();
    const [token, setToken] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (ref.current) ref.current.innerHTML = t('insights.title');

        // eslint-disable-next-line
    }, []);

    const handleSubscribe = () => {
        const data = new FormData();

        setLoading(true);

        data.append('your-email', email);
        data.append('_wpcf7', 174);
        data.append('_wpcf7_version', 5.6);
        data.append('_wpcf7_locale', 'en_US');
        data.append('_wpcf7_unit_tag', 'wpcf7-f174-p175-o1');
        data.append('_wpcf7_container_post', 175);
        data.append(
            '_wpcf7cf_options',
            JSON.stringify({
                form_id: 174,
                conditions: [],
                settings: {
                    animation: 'yes',
                    animation_intime: 200,
                    animation_outtime: 200,
                    conditions_ui: 'normal',
                    notice_dismissed: false,
                },
            })
        );
        data.append('_wpcf7_recaptcha_response', token);
        fetchWrapper
            .post('/wp-json/contact-form-7/v1/contact-forms/174/feedback', data)
            .then((res) => {
                if (res?.status === 'mail_sent') {
                    toast.success(res?.message);
                } else {
                    toast.error(res?.message);
                }
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            });
    };

    return (
        <div
            className={clsx(
                'insights-sign-up-card-container p-8 -mx-6 md:mx-0 md:rounded-[10px] w-full',
                type === 1 ? 'col-span-1' : 'col-span-2'
            )}
        >
            <div className="flex item-center">
                <span
                    className={clsx(
                        'text-[#ffffff60] text-[28px] leading-[37px] -tracking-[0.7px] max-w-[500px]',
                        type === 1 ? '' : 'md:text-[36px] md:leading-[50px] md:-tracking-[0.9px]'
                    )}
                    ref={ref}
                />
            </div>
            <p className="max-w-[450px] text-white text-[16px] leading-[25px] -tracking-[0.35px]">
                {t('insights.description')}
            </p>
            <div className={clsx('grid gap-4', type === 1 ? '' : 'md:grid-cols-3')}>
                <input
                    type="email"
                    className={clsx(
                        'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none h-[50px] ',
                        type === 1 ? '' : 'md:col-span-2'
                    )}
                    value={email || ''}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('input.email')}
                />
                <PrimaryButton
                    className={clsx(type === 1 ? 'w-full' : '', 'font-inter text-lg w-[150px] ml-4')}
                    text={t('button.sign-up')}
                    onClick={handleSubscribe}
                    isLoading={loading}
                    disabled={loading}
                />
                <GoogleReCaptcha onVerify={(token) => setToken(token)} />
            </div>
        </div>
    );
};

export default InsightsSignUpCard;

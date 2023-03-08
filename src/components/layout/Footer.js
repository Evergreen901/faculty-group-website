import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from '../reusable';
import ArrowIcon from '../../assets/svg/arrow-top.svg';
import LogoFooter from '../../assets/logo/logo-footer.svg';

const navigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Companies', path: '/company' },
    { name: 'Insights', path: 'https://www.theperiphery.io/' },
    { name: 'Careers', path: '/career' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
];

const Footer = ({ onScrollTop, className }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const isContactPage = location.pathname.startsWith('/contact');
    const isPrivacyPolicy = location.pathname.startsWith('/privacy-policy');

    return (
        <footer
            className={`text-white w-screen ${isContactPage || isPrivacyPolicy ? '' : 'h-screen'} px-8 ${className}`}
        >
            <div className="max-w-[1220px] mx-auto h-full">
                {!isContactPage && !isPrivacyPolicy && (
                    <div className="h-[75vh] flex items-center justify-center">
                        <div className="flex justify-between items-center w-full">
                            <div className="w-full flex items-center flex-col md:block">
                                <h1 className="text-3xl text-center md:text-6xl md:text-left">{t('footer.title')}</h1>
                                <p className="text-sm md:text-[16px] font opacity-50  max-w-[470px] mt-8">
                                    {t('footer.text')}
                                </p>
                                <Link to="/contact/1">
                                    <button className="text-sm md:text-md font-inter font-bold w-48 mt-10 rounded-full bg-gradient-to-l from-gold-100 to-gold-400 py-3 hover:opacity-80 transition">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                            <div className="flex items-center mb-6 hidden md:block ml-12">
                                <img className="w-[120px] h-[120px]" src={LogoFooter} alt="footer logo fg" />
                            </div>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-12 h-[25vh] relative">
                    <div className="col-span-4 hidden md:block">
                        <p className="opacity-40">Navigate</p>
                        <div className="grid grid-cols-2 mt-4 gap-y-1 w-[70%]">
                            {navigation.map((nav) => {
                                return nav.name === 'Insights' ? (
                                    <ExternalLink to={nav.path} key={nav.path} className="opacity-70">
                                        {nav.name}
                                    </ExternalLink>
                                ) : (
                                    <Link key={nav.path} to={nav.path} className="opacity-70">
                                        {nav.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-span-6 md:col-span-2">
                        <p className="opacity-40">Follow Us</p>
                        <div className="grid grid-cols-1 gap-y-1 opacity-70 mt-4">
                            <ExternalLink to="https://twitter.com/Faculty__Group">Twitter</ExternalLink>
                            <ExternalLink to="https://www.linkedin.com/company/faculty-group/">Linkedin</ExternalLink>
                        </div>
                    </div>
                    <div className="col-span-6 md:col-span-2">
                        <p className="opacity-40">Email Us</p>
                        <ExternalLink to="mailto:hello@faculty.group" className="opacity-70 block mt-4">
                            hello@faculty.group
                        </ExternalLink>
                    </div>
                    <div
                        className="absolute right-0 -rotate-90 top-14 text-[14px] font-bold opacity-70 flex items-center cursor-pointer hidden md:flex"
                        onClick={() => {
                            document.documentElement.scrollTop = 0;
                            onScrollTop && onScrollTop();
                        }}
                    >
                        <span>BACK TO TOP</span>
                        <img src={ArrowIcon} alt="arrow icon" className="rotate-90 ml-4" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

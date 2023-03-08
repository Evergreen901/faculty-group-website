import { useLocation, Link } from 'react-router-dom';
import { ExternalLink } from '../reusable';
import useWidth from '../../hooks/useWidth';
import BackVideo from '../../assets/video/back-video.mp4';
import BackVideoSP from '../../assets/png/back-video-sp.png';

const Sidebar = ({ isOpen, closeHandler }) => {
    const location = useLocation();
    const width = useWidth();

    const urls = [
        { name: 'Home', path: '/', isActive: location.pathname === '/' },
        { name: 'About', path: '/about', isActive: location.pathname === '/about' },
        { name: 'Companies', path: '/company', isActive: location.pathname === '/company' },
        {
            name: 'Insights',
            path: 'https://www.theperiphery.io/',
            // isActive: location.pathname.startsWith('/insight'),
            isActive: false,
        },
        { name: 'Careers', path: '/career', isActive: location.pathname.startsWith('/career') },
        { name: 'Contact', path: '/contact', isActive: location.pathname.startsWith('/contact') },
    ];
    return (
        <div
            className={`min-h-screen flex ${
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            } transition duration-[500ms] w-screen absolute text-white top-[-1rem] md:top-[-60px] z-[-1] -ml-8`}
        >
            {width >= 768 ? (
                <>
                    <div className="absolute w-full h-full bg-[#FEC900] opacity-50 mix-blend-multiply" />
                    <div className="absolute w-full h-full bg-[#FEC900] mix-blend-color" />
                    <div className="absolute w-full h-full bg-[#FEC900] opacity-40 mix-blend-overlay" />
                    <div className="bg-black w-screen min-h-screen fixed right-[0px] sidebar-clip-area bg-gradient-to-r to-gold"></div>
                    {width > 768 ? (
                        <video autoPlay muted loop className="w-2/3 h-screen object-cover">
                            <source src={BackVideo} />
                        </video>
                    ) : (
                        <img
                            alt="background video thumbnail"
                            src={BackVideoSP}
                            className="w-2/3 h-screen object-cover"
                        />
                    )}
                </>
            ) : (
                <div className="absolute w-full h-full backdrop-blur bg-[#000000A0]"></div>
            )}
            <div className="flex text-white z-0 h-2/4 my-auto flex-none mx-auto md:ml-[-25%] lg:ml-[-20%] xl:ml-[-15%] gap-x-8 md:gap-x-16 lg:gap-x-24 xl:gap-x-32">
                <div className="grid grid-rows-6 text-2xl md:text-3xl font-inter cursor-pointer">
                    {urls.map((url, index) => {
                        return url.name === 'Insights' ? (
                            <ExternalLink
                                key={index}
                                to={url.path}
                                className={`${url.isActive ? 'opacity-100 font-bold' : 'opacity-50'} pb-4`}
                                onClick={(e) => {
                                    if (url.path === location.pathname) {
                                        closeHandler();
                                    }
                                }}
                            >
                                {url.name}
                            </ExternalLink>
                        ) : (
                            <Link
                                key={index}
                                to={url.path}
                                className={`${url.isActive ? 'opacity-100 font-bold' : 'opacity-50'} pb-4`}
                                onClick={(e) => {
                                    if (url.path === location.pathname) {
                                        closeHandler();
                                    }
                                }}
                            >
                                {url.name}
                            </Link>
                        );
                    })}
                </div>
                <div className="border-l h-[250px] my-auto"></div>
                <div className="flex flex-col justify-around text-base md:text-lg">
                    <div>
                        <div className="opacity-30">Follow Us</div>
                        <ExternalLink
                            to="https://twitter.com/Faculty__Group"
                            className="pt-4 opacity-50 cursor-pointer block"
                        >
                            Twitter
                        </ExternalLink>
                        <ExternalLink
                            to="https://www.linkedin.com/company/faculty-group/"
                            className="opacity-50 cursor-pointer block"
                        >
                            Linkedin
                        </ExternalLink>
                    </div>
                    <div>
                        <div className="opacity-30">Email Us</div>
                        <ExternalLink to="mailto:hello@faculty.group" className="pt-4 opacity-50 cursor-pointer block">
                            hello@faculty.group
                        </ExternalLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

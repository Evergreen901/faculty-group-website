import CompanyLogoFC from '../assets/svg/company-fc.svg';
import CompanyLogoFCWhite from '../assets/svg/company-fc-white.svg';
import CompanyLogoFL from '../assets/svg/company-fl.svg';
import CompanyLogoFLWhite from '../assets/svg/company-fl-white.svg';
import CompanyLogoFE from '../assets/svg/company-fe.svg';
import CompanyLogoFEWhite from '../assets/svg/company-fe-white.svg';
import CompanyLogoArtis from '../assets/svg/company-artis.svg';
import CompanyLogoArtisWhite from '../assets/svg/company-artis-white.svg';
import CompanyLogoX8C from '../assets/svg/company-x8c.svg';
import CompanyLogoX8CWhite from '../assets/svg/company-x8c-white.svg';
import CompanyLogoOtaris from '../assets/svg/company-otaris.svg';
import CompanyLogoOtarisWhite from '../assets/svg/company-otaris-white.svg';
import CompanyLogoFS from '../assets/svg/company-fs.svg';
import CompanyLogoFSWhite from '../assets/svg/company-fs-white.svg';
import CompanyBgFC from '../assets/png/company-bg-fc.png';
import CompanyBgFE from '../assets/png/company-bg-fe.png';
import CompanyBgSpool from '../assets/png/company-bg-spool.png';
import CompanyBgOtaris from '../assets/png/company-bg-otaris.png';
import CompanyBgArtis from '../assets/png/company-bg-artis.png';
import CompanyBgFL from '../assets/png/company-bg-fl.png';
import CompanyBgX8C from '../assets/png/company-bg-x8c.png';

export const BLOG_TAG_TYPE = {
    ALL: 99,
    NEWS: 3,
    PODCAST: 4,
    FEATURED: 5,
    INSIGHTS: 6,
    RESEARCH: 7,
};

export const MAX_FILE_SIZE = 1024 * 1024 * 10;

export const PROJECT_TAG_TYPE = {
    FEATURED: 8,
};

export const navigation = [
    {
        label: 'home.title',
        link: '/',
    },
    {
        label: 'story.title-menu',
        link: '/story',
    },
    // {
    //     label: 'solution.title-menu',
    //     link: '/solution',
    // },
    {
        label: 'portfolio.title',
        link: '/portfolio',
    },
    {
        label: 'blog.title',
        link: '/blog',
    },
    {
        label: 'contact.title',
        link: '/contact',
    },
];

export const statistics = [
    {
        prefix: '',
        number: 100,
        suffix: '+',
        text: 'home.statistics.text1',
    },
    {
        prefix: '',
        number: 9,
        suffix: '',
        text: 'home.statistics.text2',
    },
    {
        prefix: '$',
        number: 40,
        suffix: 'm',
        text: 'home.statistics.text3',
    },
    {
        prefix: '$',
        number: 9.2,
        suffix: 'b',
        text: 'home.statistics.text4',
    },
    {
        prefix: '',
        number: 120,
        suffix: '+',
        text: 'home.statistics.text5',
    },
];

export const companies = [
    {
        label: 'Venture Capital',
        logo: CompanyLogoFC,
        logoWhite: CompanyLogoFCWhite,
        img: CompanyBgFC,
        link: 'https://www.facultycapital.com/',
        title: 'Faculty Capital',
        desc1: 'Smart Capital & Advisory.',
        desc2: 'Deploying capital is just the beginning. We unite a wealth of resources to fully support projects on their path to success.',
        background: 'linear-gradient(219deg, #29C2E2, #0000FF)',
    },
    {
        label: 'Marketing & PR',
        logo: CompanyLogoX8C,
        logoWhite: CompanyLogoX8CWhite,
        img: CompanyBgX8C,
        link: 'https://x8c.io/',
        title: 'X8C',
        desc1: 'Growth Marketing & PR.',
        desc2: 'A Web3 marketing agency offering unique and tailored strategies to fuel and accelerate organic growth. \n\nOur team of marketing professionals provide innovative solutions that projects need to scale and thrive.',
        background: 'linear-gradient(37deg, #009DBF, #71D1E6)',
    },
    {
        label: 'Market Making',
        logo: CompanyLogoArtis,
        logoWhite: CompanyLogoArtisWhite,
        img: CompanyBgArtis,
        link: 'https://artis.systems/',
        title: 'Artis',
        desc1: 'Market Making & Treasury Management.',
        desc2: 'Artis provides leading secondary market solutions via a proprietary market making platform structured to meet specific client needs.',
        background: 'linear-gradient(43deg, #B70742, #EE2E71)',
    },
    {
        label: 'Incubation',
        logo: CompanyLogoFL,
        logoWhite: CompanyLogoFLWhite,
        img: CompanyBgFL,
        link: 'https://www.facultylab.io/',
        title: 'Faculty Labs',
        desc1: 'Incubator Programme.',
        desc2: 'Full scope Web2 to Web3 incubator to activate the next generation of blockchain projects.',
        background: 'linear-gradient(217deg, #A05BB9, #76358C)',
    },
    {
        label: 'Launch Infrastructure',
        logo: CompanyLogoOtaris,
        logoWhite: CompanyLogoOtarisWhite,
        img: CompanyBgOtaris,
        link: 'https://otaris.io',
        title: 'Otaris',
        desc1: 'Innovation Hub.',
        desc2: 'Compliant capital raising, launch tools and scaling solutions for Web3 builders. \n\nExclusive access to world-class blockchain projects. \nCustomized incubation infrastructure for protocols.',
        background: 'linear-gradient(199deg, #6FD7B3, #4BA0B4)',
    },
    {
        label: 'Web3 Accelerator',
        logo: CompanyLogoFE,
        logoWhite: CompanyLogoFEWhite,
        img: CompanyBgFE,
        link: 'https://facultyentertainment.com',
        title: 'Faculty Entertainment',
        desc1: 'Building the future of entertainment.',
        desc2: 'Investing, advising, launching and scaling the world’s leading entertainment brands and celebrity ventures in web3.',
        background: 'linear-gradient(219deg, black, black)',
    },
    {
        label: 'Venture Builder',
        logo: CompanyLogoFS,
        logoWhite: CompanyLogoFSWhite,
        img: CompanyBgSpool,
        link: 'https://spool.fi/',
        title: 'Faculty Studio',
        desc1: 'Faculty Studio.',
        desc2: 'Venture Studio purpose-built to ideate, build and launch tools for Web3.\n\nFounding contributors to Spool DAO.',
        background: 'linear-gradient(0deg, #5CB5F7, #5CB5F7)',
    },
];

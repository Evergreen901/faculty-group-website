import ExternalLink from './ExternalLink';
import { ArrowIcon } from '../../assets/icons';

const CompanyItemLarge = ({ className, company }) => {
    return (
        <div
            className={`${className} relative overflow-hidden bg-[#FFFFFF20] rounded-xl h-[300px] w-full company-item-large`}
        >
            <div
                className={`absolute w-[200%] h-[200%] z-10 bg-overlay opacity-0 transition duration-500 left-[50%] bottom-[50%] rotate-[45deg]`}
                style={{
                    background: company.background,
                }}
            />
            <div
                className={`absolute z-20 w-full h-full detail opacity-0 transition duration-500 flex flex-col justify-end p-9`}
            >
                <p className="text-xl md:text-2xl pb-8">{company.desc1}</p>
                {company.link && (
                    <div className="flex items-center">
                        <ExternalLink
                            to={company.link}
                            className="text-[16px] transition duration-500 hover:opacity-50"
                        >
                            Visit {company.title}
                        </ExternalLink>

                        <ArrowIcon className="rotate-90 ml-2" width={10} height={20} />
                    </div>
                )}
            </div>
            <div className="relative z-20 w-full h-full flex flex-col justify-center items-center opacity-100 logo">
                <img
                    src={company.logo}
                    alt={'company logo'}
                    className={`h-[60px] max-w-[90px] ${company.title === 'Spool' ? '!h-[80px]' : ''}`}
                />
            </div>
            <span
                className={`z-20 absolute top-4 left-4 bg-[#FFFFFF30] text-white text-[10px] p-2 px-4 rounded-full transition`}
            >
                {company.label}
            </span>
        </div>
    );
};

export default CompanyItemLarge;

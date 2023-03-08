const CompanyItem = ({ className, company, ...rest }) => {
    return (
        <div className={`${className} relative overflow-hidden cursor-pointer company-item`} {...rest}>
            <div
                className={`absolute w-[200%] h-[200%] z-10 bg-overlay opacity-0 transition duration-500 left-[50%] bottom-[50%] rotate-[45deg]`}
                style={{
                    background: company.background,
                }}
            />
            <div className="relative z-20 w-full h-full flex flex-col justify-center items-center">
                <img
                    className={`${
                        company.title === 'Spool' ? 'md:h-[60px]' : 'md:h-[45px]'
                    } max-w-[10vh] md:max-w-[80px] white-logo opacity-0 transition hidden h-[5vh]`}
                    src={company.logoWhite}
                    alt={'company white logo'}
                />
                <img
                    className={`${
                        company.title === 'Spool' ? 'md:h-[60px]' : 'md:h-[45px]'
                    } max-w-[10vh] md:max-w-[80px] logo opacity-100 transition block h-[5vh]`}
                    src={company.logo}
                    alt={'company logo'}
                />
                <span
                    className={`font-bold absolute top-4 left-4 label bg-white text-[#333] text-[10px] p-2 px-4 rounded-full transition`}
                >
                    {company.label}
                </span>
                <p className={`font-bold absolute bottom-8 text-white transition duration-1000 title opacity-0`}>
                    {company.title}
                </p>
            </div>
        </div>
    );
};

export default CompanyItem;

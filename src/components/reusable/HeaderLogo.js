import { Link } from 'react-router-dom';
import Logo from '../../assets/logo/logo.svg';

const HeaderLogo = ({ className, company, ...rest }) => {
    return (
        <div className="absolute left-0 top-5 md:top-[60px] z-[99] w-full h-8 px-8">
            <Link to="/" className="max-w-[1360px] mx-auto flex items-center">
                <img src={Logo} alt="faculty group logo" className="w-8 h-8" />
                <h3 className={`text-2xl ml-3 unselectable text-white`}>
                    <b className="font-extrabold">Faculty</b>Group
                </h3>
            </Link>
        </div>
    );
};

export default HeaderLogo;

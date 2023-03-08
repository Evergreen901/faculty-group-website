// import CountUp from 'react-countup';
import AnimatedNumbers from 'react-animated-numbers';
import { CircleIcon } from '../../assets/icons';
import useWidth from '../../hooks/useWidth';

const NumberAnimation = ({ prefix, suffix, number, /*decimals = 0, */ text, showCircle = true }) => {
    const windowWidth = useWidth();
    const radius = windowWidth > 768 ? 270 : windowWidth > 500 ? windowWidth * 0.35 : windowWidth * 0.4;

    return (
        <div className="number-animation w-[40vw] h-[40vw] sm:w-[35vw] sm-[35vw] md:w-[270px] md:h-[270px] flex flex-col justify-center items-center relative">
            {/* <CountUp end={number} duration={3} prefix={prefix} suffix={suffix} useEasing redraw decimals={decimals} /> */}
            {showCircle && (
                <div className="absolute ">
                    <CircleIcon width={radius} height={radius} />
                </div>
            )}
            {showCircle ? (
                <div className="flex items-center justify-center">
                    <span>{prefix}</span>
                    <AnimatedNumbers
                        animateToNumber={number}
                        configs={(number, index) => {
                            return { mass: 1, tension: 230 * (index + 1), friction: 80 };
                        }}
                    />
                    <span>{suffix}</span>
                </div>
            ) : (
                <div className="h-[5vw] md:h-[60px]" />
            )}
            <p className="text-center text-sm md:text-xl w-[80%] h-[2em] -mt-1">{text}</p>
        </div>
    );
};

export default NumberAnimation;

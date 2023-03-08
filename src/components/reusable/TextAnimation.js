import { useEffect, useState } from 'react';

const TextAnimation = ({
    text,
    animationRunning,
    isSmallFont = false,
    isCentered = true,
    isBold = false,
    className,
}) => {
    const [index, setIndex] = useState(-1);
    const [words, setWords] = useState([]);

    useEffect(() => {
        if (!text) return;
        setWords(text.split(' '));
    }, [text]);

    useEffect(() => {
        if (!words?.length) return;
        setIndex(0);
    }, [words, animationRunning]);

    useEffect(() => {
        if (index < 0) return;
        if (!animationRunning) {
            setIndex(-1);
            return;
        }

        setTimeout(() => {
            setIndex((prev) => Math.min(prev + 1, words.length - 1));
        }, [words[index].length * 30]);

        // eslint-disable-next-line
    }, [index, animationRunning]);

    return (
        <div
            className={`flex ${isCentered ? 'justify-center' : ''} ${
                isSmallFont ? 'gap-x-2' : 'gap-x-4'
            } flex-wrap max-w-[820px] mx-auto ${className}`}
        >
            {words &&
                words.map((word, i) => (
                    <h1
                        key={i}
                        className={`${
                            isSmallFont ? 'text-[14px] md:text-[34px]' : 'text-2xl sm:text-3xl md:text-5xl'
                        } ${i <= index ? 'opacity-100' : 'opacity-20'} ${
                            isBold ? 'font-bold' : ''
                        } transition duration-[1000ms] tracking-tight`}
                    >
                        {word}
                    </h1>
                ))}
        </div>
    );
};

export default TextAnimation;

import clsx from 'clsx';
import { useEffect, useRef } from 'react';

const ContentWrapper = ({ className = '', type = 'dark', description }) => {
    const ref = useRef();

    useEffect(() => {
        if (ref.current) ref.current.innerHTML = description;

        // eslint-disable-next-line
    }, [description]);

    return <div className={clsx('content-wrapper', type, className)} ref={ref} />;
};

export default ContentWrapper;

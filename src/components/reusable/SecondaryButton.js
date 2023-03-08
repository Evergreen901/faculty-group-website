const SecondaryButton = ({ text, className, color, clickHandler, isDisabled = false }) => {
    return (
        <button
            className={`text-white text-lg px-8 py-[11px] rounded-[4px] transition btn-secondary ${className}`}
            onClick={clickHandler}
            disabled={isDisabled}
        >
            <span className={`relative z-10 font-semibold ${color === 'white' ? 'text-white' : ''}`}>{text}</span>
        </button>
    );
};

export default SecondaryButton;

import clsx from 'clsx';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { SearchIcon } from '../../assets/icons';

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        background: state.isSelected
            ? 'transparent linear-gradient(76deg, #2D4EF5 0%, #29C2E2 100%) 0% 0% no-repeat padding-box'
            : '',
    }),
    container: (provided, state) => ({
        ...provided,
        padding: '.5rem 0',
    }),
    control: (provided, state) => ({
        ...provided,
        width: '210px',
        background: '#FAFAFA 0% 0% no-repeat padding-box',
        borderRadius: '3px',
        border: 'none',
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        const color = '#fff';
        return { ...provided, color, opacity, transition };
    },
    menu: (provided, state) => ({
        ...provided,
        width: '210px',
        top: '45px',
        boxShadow: 'none',
    }),
    menuList: (provided, state) => ({
        ...provided,
        maxHeight: '140px',
        textAlign: 'left',
        font: 'normal normal normal 14px/21px Inter',
        color: '#333333',
        scrollBehavior: 'smooth',
        width: '100%',
        height: '100%',
        overflow: 'auto',

        '&::-webkit-scrollbar': {
            width: '10px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
            borderRadius: '5px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#EBEBEB 0% 0% no-repeat padding-box',
            borderRadius: '5px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
        },
    }),
    input: (provided, state) => ({
        ...provided,
        borderRadius: '3px',
    }),
    placeholder: (provided, state) => ({
        ...provided,
        textAlign: 'left',
        font: 'normal normal normal 14px/21px Inter',
        color: '#999999',
    }),
    indicatorSeparator: (provided, state) => ({
        ...provided,
        display: 'none',
    }),
};

const Dropdown = ({ children, isOpen, target, onClose }) => {
    const Menu = (props) => {
        return <div className="bg-white rounded-[4px] mt-[8px] absolute z-[9999]" {...props} />;
    };

    return (
        <div className="relative">
            {target}
            {isOpen ? <Menu>{children}</Menu> : null}
        </div>
    );
};

const DropdownIndicator = () => <SearchIcon width={20} height={20} fill={'#999999'} style={{ marginRight: '.5rem' }} />;

const CustomSelect = ({ changeHandler }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(undefined);
    const { t } = useTranslation();

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const onSelectChange = (value) => {
        toggleOpen();
        setValue(value);
        changeHandler(value);
    };

    const customOptions = [
        { value: '99', label: t('blog.tags.all') },
        { value: '7', label: t('blog.tags.research') },
        { value: '3', label: t('blog.tags.news') },
        { value: '6', label: t('blog.tags.insights') },
        { value: '4', label: t('blog.tags.podcast') },
    ];

    return (
        <Dropdown
            isOpen={isOpen}
            onClose={toggleOpen}
            target={
                <button
                    className={clsx(
                        "relative flex items-center w-[225px] h-[50px] rounded-[3px] px-4 bg-white bg-origin-padding bg-no-repeat shadow-[0px_10px-_16px_#D4D4D466] after:absolute after:content-[''] after:w-2 after:h-2 after:border-l-2 after:border-t-2 after:border-solid after:border-black after:right-[1rem] after:transition after:duration-300",
                        isOpen ? 'after:rotate-45 after:top-[50%]' : 'after:rotate-[-135deg]'
                    )}
                    onClick={() => toggleOpen()}
                >
                    <span className="font-extrabold text-[#333333] text-[14px] leading-[21px]">
                        {t('filters.filter-by')}: {value ? value.label : ''}
                    </span>
                </button>
            }
        >
            <div className="flex justify-center w-[225px] h-[200px] rounded-[3px] bg-white bg-origin-padding bg-no-repeat shadow-[0px_10px_16px_#D4D4D466]">
                <Select
                    autoFocus
                    backspaceRemovesValue={false}
                    components={{ DropdownIndicator, IndicatorSeparator: null }}
                    controlShouldRenderValue={false}
                    hideSelectedOptions={false}
                    isClearable={false}
                    isSearchable={true}
                    menuIsOpen
                    onChange={onSelectChange}
                    options={customOptions}
                    placeholder={t('filters.placeholder')}
                    styles={customStyles}
                    tabSelectsValue={false}
                    value={value}
                />
            </div>
        </Dropdown>
    );
};

export default CustomSelect;

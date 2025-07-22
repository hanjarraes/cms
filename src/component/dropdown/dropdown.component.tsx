import { useEffect, useRef, useState } from 'react'
import Select, {
    components,
    InputProps,
    OptionProps,
    StylesConfig,
    ValueContainerProps,
} from 'react-select'
import { IDropdown, IDropdownItem } from './dropdown.interface'
import './dropdown.style.css'
import AsyncSelect from 'react-select/async'

function Dropdown<T>({
    isLoading = false,
    isClearable = false,
    isSearchable = false,
    isMultiSelect = false,
    required = false,
    dropDownIndicator = false,
    disabled = false,
    useBorder = true,
    isAsync = false,
    isError = false,
    options,
    useUppercaseLabel = false,
    disabledVariant = 'gray',
    borderColorClassName,
    heightInput = 33,
    ...props
}: IDropdown<T>) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement | null>(null)

    const showLabelClass = !props.label || props.label === '' ? 'hidden' : ''
    const isRequired = required ? 'required' : ''
    const dropdownValue =
        props?.value || props.defaultValue ? props?.value : null
    const dataTestIdComponent = props.dataTestId
        ? `${props.dataTestId}_DROPDOWN`
        : ''
    const overflowOption = isMultiSelect ? `overflow-option` : ''
    const isDropdownOpenClass = isOpen ? `dropdown-open` : 'dropdown-closed'

    // control label color
    const labelBgGolor = disabled ? 'text-[--gray-v1]' : 'bg-white'

    // isloading
    if (isLoading) {
        options = [{ value: 'loading', label: 'Loading Data' }]
    }

    const checkboxOption = (optionProps: OptionProps<IDropdownItem<T>>) => {
        return (
            <components.Option {...optionProps}>
                <div className="flex items-center gap-4">
                    <span
                        style={{
                            display: 'inline-flex',
                            width: 16,
                            height: 16,
                            borderRadius: 4,
                            border: optionProps.isSelected
                                ? 'none'
                                : '1px solid var(--gray-v5)',
                            backgroundColor: optionProps.isSelected
                                ? 'var(--info-v5)'
                                : 'var(--white)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexShrink: 0,
                        }}
                    >
                        {optionProps.isSelected && (
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        )}
                    </span>
                    <div>{optionProps.label}</div>
                </div>
            </components.Option>
        )
    }

    const defaultOptionComponent = (
        optionProps: OptionProps<IDropdownItem<T>>,
    ) => {
        let dataTestId = ''
        if (dataTestIdComponent) {
            const sequenceNumber =
                Number(optionProps?.innerProps?.id?.split('-').pop()) + 1 || 0
            dataTestId =
                sequenceNumber <= 5
                    ? `${dataTestIdComponent}_OPTION_${sequenceNumber}`
                    : ''
        }

        return (
            <div data-testid={dataTestId}>
                <components.Option {...optionProps} />
            </div>
        )
    }

    const getOptionComponent = (optionProps: OptionProps<IDropdownItem<T>>) => {
        if (props?.customOptionComponent) {
            return props?.customOptionComponent(optionProps)
        }

        if (isMultiSelect) {
            return checkboxOption(optionProps)
        }
        return defaultOptionComponent(optionProps)
    }

    const defaultInputComponent = (
        optionProps: InputProps<IDropdownItem<T>>,
    ) => {
        const dataTestId = dataTestIdComponent
            ? `${dataTestIdComponent}_INPUT`
            : ''
        return (
            <components.Input
                {...optionProps}
                data-testid={dataTestId}
                about="halow"
            />
        )
    }

    const customValueContainer = (props: ValueContainerProps<any>) => {
        // no card in selected item if multiple
        const selected = props.getValue()
        const count = selected.length

        if (isMultiSelect) {
            return (
                <components.ValueContainer {...props}>
                    {count === 0
                        ? props.children
                        : `${count} item${count > 1 ? 's' : ''} selected`}
                </components.ValueContainer>
            )
        }
        return (
            <components.ValueContainer {...props}>
                {props.children}
            </components.ValueContainer>
        )
    }

    const customStyles: StylesConfig<IDropdownItem<T>> = {
        control: (base) => ({
            ...base,
            border: 'none',
            boxShadow: 'none',
            '&:hover': {
                border: 'none',
            },

            height: heightInput ? heightInput : '100%',
            minHeight: '30px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden', // Hindari pembesaran element

            backgroundColor:
                disabled && disabledVariant === 'gray'
                    ? 'var(--gray-v1)'
                    : 'var(--white)',
            color:
                disabled && disabledVariant === 'gray'
                    ? 'var(--gray-v6)'
                    : 'var(--gray-v5)',
        }),
        placeholder: (base) => ({
            ...base,
            color: 'var(--gray-v4)',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        }),
        menuPortal: (base) => ({
            ...base,
            zIndex: '99',
        }),
        menuList: (base) => ({
            ...base,
            '::-webkit-scrollbar': {
                width: '12px',
                height: '15px',
                marginBottom: '50px',
            },
            '::-webkit-scrollbar-track': {
                backgroundColor: 'transparent',
            },
            '::-webkit-scrollbar-thumb': {
                backgroundColor: 'var(--gray-v2)',
                border: '3px',
                borderStyle: 'solid',
                borderColor: 'transparent',
                borderRadius: '9px',
                backgroundClip: 'content-box',
            },
            '::-webkit-scrollbar-thumb:hover': {
                backgroundColor: 'var(--gray-v3)',
                borderRadius: '15px',
            },
            paddingBottom: '0px',
            marginTop: useBorder ? '' : '-16px',
            backgroundColor: 'var(--white)',
            fontSize: '12px',
            lineHeight: '20px',
            borderRadius: '5px',
            border: '1px',
            borderColor: 'var(--gray-v2)',
            borderStyle: 'solid',
            position: 'relative',
            color: 'var(--gray-v6)',
        }),
        dropdownIndicator: (base, state) => ({
            ...base,
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : '',
            transition: 'transform 0.3s ease-in-out',
            color: 'var(--gray-v6)',
        }),
        clearIndicator: (base) => ({
            ...base,
            cursor: 'pointer',
        }),
        option: (base, { isSelected, isDisabled }) => ({
            ...base,
            textAlign: isLoading ? 'center' : 'left',
            backgroundColor: isSelected
                ? isMultiSelect
                    ? 'var(--gray-v2)'
                    : 'var(--info-v2)'
                : 'inherit',
            '&:hover': {
                backgroundColor: 'var(--gray-v1)',
            },
            color: isDisabled
                ? 'var(--gray-v2)'
                : 'var(--gray-v6)',
            position: 'relative',
            cursor: 'pointer',
            paddingTop: '4px',
            paddingBottom: '4px',
            marginLeft: '4px',
            marginRight: '4px',
            marginBottom: '4px',
        }),

        singleValue: (base) => ({
            ...base,
            color: 'var(--gray-v7)',
        }),

        indicatorSeparator: (base: any) => ({
            ...base,
            backgroundColor: 'hsl(0, 0%, 80%)',
        }),
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (!isMultiSelect) return
        const target = e.target as HTMLElement

        // cek full container
        if (!ref.current) return
        const isExists = ref.current.contains(e.target as Node)
        if (isExists) return

        // handling click on div label (special case)
        const valueContainer =
            target.closest('.select__value-container')?.outerHTML ?? null
        const divDropdownLabel =
            ref.current?.querySelector('.select__value-container')?.outerHTML ??
            null
        if (valueContainer !== null && divDropdownLabel !== null) {
            if (valueContainer === divDropdownLabel) {
                return
            }
        }
        setIsOpen(false)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div
            className={`dropdownParent-style css-dropdown-container 
                ${props.parentDivClassname} 
                ${borderColorClassName} 
                ${isDropdownOpenClass}
                 'border-[--gray-v6]
                 ${isError && '!border-[--danger-v5]'}
            `}
            data-testid={props?.dataTestId}
        >
            <label
                className={`${showLabelClass}`}
            >
                <div
                    className={`dropdownLabelDiv-style css-dropdown-label-div ${labelBgGolor}`}
                >
                    <p
                        className={`${isRequired} ${props.labelDivClassname} text-[--gray-v5] ${isError && '!text-[--danger-v5]'}`}
                    >
                        {useUppercaseLabel
                            ? props.label?.toUpperCase()
                            : props.label}
                    </p>
                </div>
            </label>

            <div
                className={` 
                    ${props.parentDivClassname} 
                  ${useBorder ? '' : 'border-none'} 
                    ${overflowOption} dropDown css-dropdown
                `}
                onMouseDown={(e) => {
                    e.preventDefault()
                    setIsOpen(() => !isOpen)
                }}
                ref={ref}
            >
                {!isAsync ? (
                    <Select
                        className={`${props.className}`}
                        classNamePrefix={'select'}
                        components={{
                            ...(props?.customMenuComponent && {
                                MenuList: props.customMenuComponent,
                            }),
                            Option: getOptionComponent,
                            Input: defaultInputComponent,
                            ValueContainer: customValueContainer,
                        }}
                        // custom label option
                        formatOptionLabel={(option, { context }) => {
                            return context === 'menu' &&
                                option.customLabelOption
                                ? option.customLabelOption
                                : option.label
                        }}
                        closeMenuOnSelect={
                            isMultiSelect === true ? false : true
                        }
                        defaultValue={props?.defaultValue}
                        placeholder={props.placeholder}
                        value={dropdownValue}
                        isMulti={isMultiSelect}
                        isDisabled={disabled}
                        isLoading={isLoading}
                        isClearable={isClearable}
                        isSearchable={isSearchable}
                        options={options}
                        isOptionDisabled={(options) =>
                            options?.value === 'loading'
                        }
                        menuPosition="fixed"
                        menuIsOpen={disabled ? false : isOpen}
                        onMenuOpen={() => setIsOpen(true)}
                        onMenuClose={() => setIsOpen(false)}
                        maxMenuHeight={115}
                        onChange={(e: IDropdownItem<T> | null | any) => {
                            if (props.onClick) props.onClick(e)
                            if (props.additionalDataHandling)
                                props.additionalDataHandling(
                                    e?.additionalData ?? null,
                                )
                        }}
                        onInputChange={(value) => {
                            if (props.onInputChange)
                                return props.onInputChange(value)
                        }}
                        filterOption={(option, inputValue) => {
                            if (isLoading) {
                                return true
                            }
                            return option.label
                                .toUpperCase()
                                .includes(inputValue.toUpperCase())
                        }}
                        unstyled={false}
                        styles={customStyles}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 4,
                        })}
                        hideSelectedOptions={false}
                    />
                ) : (
                    <AsyncSelect
                        loadOptions={props?.loadOptions && props?.loadOptions}
                        className={`${props.className}`}
                        classNamePrefix={'select'}
                        components={{
                            ...(props?.customOptionComponent && {
                                Option: props?.customOptionComponent,
                            }),
                            ...(props?.customMenuComponent && {
                                MenuList: props.customMenuComponent,
                            }),
                        }}
                        closeMenuOnSelect={
                            isMultiSelect === true ? false : true
                        }
                        placeholder={props.placeholder}
                        value={dropdownValue}
                        isMulti={isMultiSelect}
                        isDisabled={disabled}
                        isLoading={isLoading}
                        isClearable={isClearable}
                        isSearchable={isSearchable}
                        options={options}
                        isOptionDisabled={(options) =>
                            options?.value === 'loading'
                        }
                        menuPosition="fixed"
                        menuIsOpen={disabled ? false : isOpen}
                        onMenuOpen={() => setIsOpen(true)}
                        onMenuClose={() => setIsOpen(false)}
                        maxMenuHeight={115}
                        onChange={(e: IDropdownItem<T> | null | any) => {
                            if (props.onClick) props.onClick(e)
                            if (props.additionalDataHandling)
                                props.additionalDataHandling(
                                    e?.additionalData ?? null,
                                )
                        }}
                        defaultOptions={
                            props.defaultOptions || props?.defaultValue
                        }
                        unstyled={false}
                        styles={customStyles}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 4,
                        })}
                    />
                )}
            </div>
        </div>
    )
}
export default Dropdown

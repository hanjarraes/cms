import React, { useState, useEffect } from 'react';
import Input from 'component/input/input.component';
import { IInput } from 'component/input/input.interface';

interface IPhoneInputProps extends Omit<IInput, 'type' | 'value' | 'onChange'> {
  maxLength?: number;
  defaultCountryCode?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const formatPhone = (val: string) => {
  const onlyDigits = val.replace(/\D/g, '');
  if (onlyDigits.length <= 4) return onlyDigits;
  if (onlyDigits.length <= 8) return `${onlyDigits.slice(0, 4)}-${onlyDigits.slice(4)}`;
  return `${onlyDigits.slice(0, 4)}-${onlyDigits.slice(4, 8)}-${onlyDigits.slice(8, 12)}`;
};

const stripCountryCode = (val: string, code: string) => {
  const raw = val.replace(/\D/g, '');
  const codeDigits = code.replace('+', '');
  if (raw.startsWith(codeDigits)) {
    return raw.slice(codeDigits.length);
  }
  return raw;
};

const PhoneInput = ({
  maxLength = 12,
  defaultCountryCode = '+62',
  value = '',
  onChange,
  ...props
}: IPhoneInputProps) => {
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [rawNumber, setRawNumber] = useState('');

  // Sync with external value
  useEffect(() => {
    const raw = stripCountryCode(value, countryCode);
    setRawNumber(raw.slice(0, maxLength));
  }, [value, countryCode, maxLength]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value;
    setCountryCode(newCode);
    const raw = stripCountryCode(value, newCode);
    triggerChange(newCode, raw);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, maxLength);
    setRawNumber(digits);
    triggerChange(countryCode, digits);
  };

  const triggerChange = (code: string, number: string) => {
    const combined = `${code}${number}`;
    if (onChange) {
      const fakeEvent = {
        target: {
          value: combined,
        },
      };
      onChange(fakeEvent as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        className="border rounded-md py-[6px] bg-white text-sm"
        value={countryCode}
        onChange={handleCountryChange}
      >
        <option value="+62">🇮🇩 +62</option>
        <option value="+1">🇺🇸 +1</option>
        <option value="+91">🇮🇳 +91</option>
        <option value="+81">🇯🇵 +81</option>
        <option value="+44">🇬🇧 +44</option>
      </select>

      <Input
        {...props}
        type="tel"
        value={formatPhone(rawNumber)}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="8123-4567-890"
        icon={props.icon || 'ri-phone-line'}
        useArrow={false}
      />
    </div>
  );
};

export default PhoneInput;

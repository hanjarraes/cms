import React from 'react';
import clsx from 'clsx';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      {label && <span className="text-sm">{label}</span>}

      <div
        onClick={() => {
          if (!disabled) onChange(!checked);
        }}
        className={clsx(
          'w-11 h-6 flex items-center rounded-full p-1 transition-colors',
          checked ? 'bg-[--info-v6]' : 'bg-[--gray-v4]',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <div
          className={clsx(
            'bg-white w-4 h-4 rounded-full shadow-md transform transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </div>
    </label>
  );
};

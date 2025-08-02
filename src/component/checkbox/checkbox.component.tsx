import React from 'react';

interface CheckBoxProps {
  type: 'options' | 'checkbox';
  label:string
  checked: boolean;
  onChange: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  type,
  label,
  checked,
  onChange,
}) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type={type === 'options' ? 'radio' : 'checkbox'}
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />

      <div className={`
        w-5 h-5 rounded border border[--gray-v6] 
        flex items-center justify-center 
        peer-checked:border-[--info-v6] peer-checked:bg-[--info-v6]
        transition-all
      `}>
        {type === 'options' ? (
          <div className="w-2 h-2 rounded-full bg-white peer-checked:bg-white" />
        ) : (
          <svg
            className="w-3 h-3 text-white peer-checked:block hidden"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      <span className="text-sm text-[--gray-v9]">{label}</span>
    </label>
  );
};

export default CheckBox;

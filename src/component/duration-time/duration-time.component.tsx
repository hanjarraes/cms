import Input from '../input/input.component'

interface IDurationPickerProps {
    label?: string
    value?: {
        hours: number
        minutes: number
        seconds: number
    }
    onChange?: (val: { hours: number; minutes: number; seconds: number }) => void
    disabled?: boolean
    required?: boolean
    isError?: boolean
    useUppercaseLabel?: boolean
    parentInputClassName?: string
}

const pad = (n: number) => String(n).padStart(2, '0')

const DurationPicker = ({
    label = 'Durasi',
    value = { hours: 0, minutes: 0, seconds: 0 },
    onChange,
    disabled = false,
    required = false,
    isError = false,
    useUppercaseLabel = false,
    parentInputClassName,
}: IDurationPickerProps) => {
    const handleChange = (type: 'hours' | 'minutes' | 'seconds', val: string) => {
        const num = parseInt(val, 10)
        if (!isNaN(num)) {
            onChange?.({ ...value, [type]: num })
        }
    }

    return (
        <div className={`space-y-1 ${parentInputClassName}`}>
            <label className="block text-[--gray-v5]  mb-1 text-[12px]">
                {label && (useUppercaseLabel ? label.toUpperCase() : label)}
                {required && <span className="text-[--danger-v5]">*</span>}
            </label>

            <div className="flex gap-2 items-center">
                <Input
                    type="number"
                    min={0}
                    label="Jam"
                    placeholder="00"
                    value={pad(value.hours)}
                    onChange={(e) => handleChange('hours', e.target.value)}
                    disabled={disabled}
                    isError={isError}
                    useArrow={false}
                    className="w-16 text-center"
                />
                <span>:</span>
                <Input
                    type="number"
                    min={0}
                    max={59}
                    label="Menit"
                    placeholder="00"
                    value={pad(value.minutes)}
                    onChange={(e) => handleChange('minutes', e.target.value)}
                    disabled={disabled}
                    isError={isError}
                    useArrow={false}
                    className="w-16 text-center"
                />
                <span>:</span>
                <Input
                    type="number"
                    min={0}
                    max={59}
                    label="Detik"
                    placeholder="00"
                    value={pad(value.seconds)}
                    onChange={(e) => handleChange('seconds', e.target.value)}
                    disabled={disabled}
                    isError={isError}
                    useArrow={false}
                    className="w-16 text-center"
                />
            </div>
        </div>
    )
}

export default DurationPicker

import { IButton } from './button.interface'
import { Tooltip } from 'react-tooltip'

const Button = ({
    editor,
    command,
    iconClass,
    isActive,
    tooltip,
    id,
}: IButton & { tooltip?: string; id?: string }) => {
    return (
        <div>
            <button
                className={`padding-toolbar-button ${
                    isActive ? 'active-toolbar-button' : ''
                }`}
                onClick={command}
                id={id}
            >
                <span className={`toolbar-icon ${iconClass}`}></span>
            </button>
            <Tooltip place="bottom" content={tooltip} anchorSelect={`#${id}`} />
        </div>
    )
}

export default Button

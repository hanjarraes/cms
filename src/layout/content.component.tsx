import './layout.style.css'

export default function Content({
    children,
}: {
    children: React.ReactElement
}): React.ReactElement {
    return (
        <div className='hh'>
            {children}
        </div>
    )
}

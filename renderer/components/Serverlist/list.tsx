import Icon from "../Icons/icon";

export default function List({ isHomeSelected, children }: { isHomeSelected?: boolean, children: JSX.Element[] }) {
    return (
        <div className="server-list">
            <div className={`app-home${isHomeSelected ? ' selected' : ''}`}>
                <div className={isHomeSelected ? 'indicator full' : 'absolute'}></div>
                <img src="/images/VentureIcon.svg" alt="Venture Logo" className='app-home-icon' />
            </div>
            <div className="separator"></div>
            {children}
            <div className="separator"></div>
            <div className="extra-item">
                <Icon name='add' filled size={28} weight={300} className='extra-icon' />
            </div>
        </div>
    );
}
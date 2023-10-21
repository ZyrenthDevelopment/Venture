import Icon from "../Icons/icon";

export default function List({ isHomeSelected, children }: { isHomeSelected?: boolean, children: JSX.Element[] }) {
    return (
        <div className="App__ServerList">
            <div className={`ServerList__Home${isHomeSelected ? ' Home__Selected' : ''}`}>
                <div className={isHomeSelected ? 'Home__UnreadIndicator UnreadIndicator__SelectedItem' : 'absolute'}></div>
                <img src="/images/VentureIcon.svg" alt="Venture Logo" />
            </div>
            <div className="ServerList__Separator"></div>
            {children}
            <div className="ServerList__Separator"></div>
            <div className="ServerList__ExtraItem">
                <Icon name='add' filled size={28} weight={300} />
            </div>
        </div>
    );
}
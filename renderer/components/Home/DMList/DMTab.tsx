import Icon from "../../Icons/icon";

export default function DMTab({ name, icon, notificationCount, isSelected }: { name: string, icon: string, notificationCount?: number, isSelected?: boolean }) {
    return (
        <a href="#" className={`DMTabs__Tab${isSelected ? ' Tab__Selected' : ''}`}>
            <Icon name={icon} filled size={24} className="Tab__Icon" />
            <span className="Tab__Text">{name}</span>
            {notificationCount ? <div className="Tab__NotificationCount">
                <span className="NotificationCount__Text">{notificationCount > 9 ? `9+` : notificationCount}</span>
            </div> : null}
        </a>
    );
}
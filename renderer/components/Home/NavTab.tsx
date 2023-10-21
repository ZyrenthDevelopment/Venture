export default function NavTab({ name, notificationCount, active, filled, onClick }: { name: string, notificationCount?: number, active?: boolean, filled?: boolean, onClick?: () => void }) {
    const extraFields = [];

    if (active) extraFields.push(`NavTab__Active`);
    if (filled) extraFields.push(`NavTab__Filled`);

    return (
        <div className={`NavTabs__NavTab ${extraFields.join(' ')}`}>
            <span className="NavTab__Name">{name}</span>
            {notificationCount ? <span className="NavTab__NotificationCount">{notificationCount > 9 ? `9+` : notificationCount}</span> : null}
        </div>
    );
}
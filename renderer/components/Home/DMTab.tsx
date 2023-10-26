import Link from 'next/link';
import Icon from '../Icons/icon';

export default function DMTab({
    name,
    icon,
    notificationCount,
    href = '#',
    isSelected,
}: {
    name: string;
    icon: string;
    notificationCount?: number;
    href?: string;
    isSelected?: boolean;
}) {
    return (
        <Link href={href} className={`DMTabs__Tab${isSelected ? ' Tab__Selected' : ''}`}>
            <Icon name={icon} filled size={24} className="Tab__Icon" />
            <span className="Tab__Text">{name}</span>
            {notificationCount ? (
                <div className="Tab__NotificationCount">{notificationCount > 9 ? `9+` : notificationCount}</div>
            ) : null}
        </Link>
    );
}

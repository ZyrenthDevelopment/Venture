import Icon from "../../Icons/icon";

export default function Tab({ name, icon, isSelected }: { name: string, icon: string, isSelected?: boolean }) {
    return (
        <a href="#" className={`tab${isSelected ? ' selected' : ''}`}>
            <Icon name={icon} filled size={22} />
            <span className="text">{name}</span>
        </a>
    );
}
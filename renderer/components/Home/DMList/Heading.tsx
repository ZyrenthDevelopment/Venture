import Icon from "../../Icons/icon";

export default function DMHeading({ name, icon }: { name: string, icon: string }) {
    return (
        <div className="DM_Sidebar__Heading">
            <span className="Heading__Text">{name}</span>
            <Icon name={icon} filled size={20} className="Heading__Icon" />
        </div>
    );
}
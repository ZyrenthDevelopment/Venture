import Icon from "../Icons/icon";
import NavTab from "./NavTab";

export default function Page({ name, icon, tabs, children }: { name: string, icon: string, tabs: JSX.Element[], children: React.ReactNode }) {
    return (
        <div className="App__Home_Page">
            <div className="Home_Page__Navbar">
                <div className="Navbar__NavTitle">
                    <Icon name={icon} filled size={24} className="NavTitle__Icon" />
                    <div className="NavTitle__Name">
                        <span>{name}</span>
                    </div>
                    <div className="NavTitle__Separator"></div>
                    <div className="NavTitle__NavTabs">
                        {tabs}
                    </div>
                </div>
                <div className="Navbar__NavButtons">
                    <div className="NavButtons__NavButton">
                        <Icon name="settings" filled size={24} />
                    </div>
                </div>
            </div>
            <div className="Home_Page__Separator">
                <div className="Separator__Border"></div>
                <div className="Separator__Dropshadow"></div>
            </div>
        </div>
    );
}
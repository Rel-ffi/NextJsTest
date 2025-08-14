import "./Sidebar.css";
import UserAccountComponent from "../UserAccountComponent/UserAccountComponent";
import Link from "next/link";

const SidebarComponent = () => {
    return (
        <aside className="sb-sidebar">
            <div>
                <div className="sb-wrapper-logo-name">
                    <img alt="icon" src="/logo/ico.png"/>
                    <h1 className="sb-logo"> MovieApp</h1>
                </div>
                <nav className="sb-nav">
                    <Link href="/" className="sb-nav-link">Home</Link>
                    <Link href="/favorites" className="sb-nav-link">Favorites</Link>
                </nav>
            </div>
            <UserAccountComponent/>
        </aside>
    );
};

export default SidebarComponent;

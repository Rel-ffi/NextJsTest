import type {Metadata} from "next";
import "./layout.css"
import "./Nullfier-Fonts.css";
import SidebarComponent from "../components/SideBar/SideBarComponent";
import ClientProvider from "@/action/ClientProvider";

export const metadata: Metadata = {
    title: "MovieApp",
    description: "MovieApp created by rel.ffi",
    icons: "/logo/ico.png"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <div className="layout">
            <SidebarComponent />
            <div className="main-content">
                <ClientProvider>{children}</ClientProvider>
            </div>
        </div>
        </body>
        </html>
    );
}

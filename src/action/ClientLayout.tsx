"use client";

import {usePathname} from "next/navigation";
import TopbarComponent from "../components/TopBar/TopBarComponent";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isMoviesPage = pathname === "/";

    return (
        <>
            {isMoviesPage && <TopbarComponent />}
            <div className="page-content">{children}</div>
        </>
    );
}

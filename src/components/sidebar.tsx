import { useNavigate, useLocation } from "react-router-dom";

const DashboardIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10.5" y="1" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1" y="10.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10.5" y="10.5" width="6.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

// const LogoutIcon = () => (
//     <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M7 3H3C2.44772 3 2 3.44772 2 4V14C2 14.5523 2.44772 15 3 15H7" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
//         <path d="M12 6L16 9L12 12" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//         <path d="M16 9H7" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
//     </svg>
// );

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
    { id: "codingLabs", label: "Coding Labs", icon: DashboardIcon, path: "/coding-labs" },
    { id: "activities", label: "Activities", icon: DashboardIcon, path: "/activities" },
];

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const active = navItems.find(item => location.pathname.startsWith(item.path))?.id ?? "dashboard";

    const handleNavClick = (path: string) => {
        navigate(path);
    };

    return (
        <nav className="w-60 min-h-screen bg-gray-100 flex flex-col font-sans border-r border-gray-200 relative">
            
            {/* Logo area */}
            <div className="px-6 pt-7 pb-5">
                <h1 className="font-semibold text-gray-900">♾️Vidh Teach</h1>
                <p className="text-xs text-gray-400 mt-0.5 tracking-tight">VI Management Portal</p>
            </div>

            {/* Nav list */}
            <ul className="list-none mt-4 p-0 flex-1">
                {navItems.map(({ id, label, icon: Icon, path }) => {
                    const isActive = active === id;
                    return (
                        <li key={id} className="relative flex items-center">
                            {/* Active bar */}
                            {isActive && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 bg-orange-400 rounded-r-[3px]" />
                            )}
                            <button
                                onClick={() => handleNavClick(path)}
                                className={`flex items-center gap-3 w-full px-5 py-2.5 bg-transparent border-none cursor-pointer transition-colors duration-150 text-left ${
                                    isActive ? "bg-black/[0.04]" : "hover:bg-black/[0.02]"
                                }`}
                            >
                                <span className={isActive ? "text-gray-900" : "text-gray-500"}>
                                    <Icon />
                                </span>
                                <span className={`text-sm font-medium ${isActive ? "text-gray-900" : "text-gray-500"}`}>
                                    {label}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
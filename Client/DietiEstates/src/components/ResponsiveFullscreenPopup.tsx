import { ReactNode } from "react";

interface ResponsiveFullscreenPopupProps {
    children: ReactNode;
    className?: string;
    open: boolean;
    close: () => void,
  };

export const ResponsiveFullscreenPopup: React.FC<ResponsiveFullscreenPopupProps> = ({ children, className = "", open, close}) => {
    return (
        <>
        <div className={`absolute inset-0 bg-black/20 backdrop-blur-sm z-[150] hover:cursor-pointer ${open ? "block" : "hidden"}`} onClick={close}></div>
        <div className={`absolute inset-0 md:inset-16 bg-[#FAFAFA] z-[200] md:rounded-md ${open ? "flex flex-col" : "hidden"} overflow-hidden shadow-md select-none ` + className}>
            {children}
        </div>
        </>
    )
}
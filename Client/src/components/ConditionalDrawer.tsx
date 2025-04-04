import React, { ReactNode } from 'react';
import Drawer from 'react-modern-drawer'
import { useMediaQuery } from 'react-responsive';


type ConditionalDrawerProps = {
    children: ReactNode;
    className: string;
    open: boolean;
    close: () => void;
  };
  
  const ConditionalDrawer: React.FC<ConditionalDrawerProps> = ({ children, className, open, close }) => {

    const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)'});

    return (
        !isLargeScreen ?
        <Drawer open={open} onClose={() => close()} direction='right' size={"90%"} className="flex flex-col space-y-2 items-center py-2 bg-[#FAFAFA]" >
            <div className="font-bold ml-auto mr-2 hover:cursor-pointer" onClick={close}>X</div>
            {children}
        </Drawer>
        :
        <div className={"flex flex-1 flex-col items-center justify-end space-y-2 border-l border-gray-300 my-2 py-1" + className}>
            {children}
        </div>
      );
  };
  
  export default ConditionalDrawer;
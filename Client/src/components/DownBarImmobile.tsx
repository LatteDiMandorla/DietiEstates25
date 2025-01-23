import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import Logo from "../assets/Logo.svg";

function SottobarImmobile(){
    const navigate = useNavigate();

    return (
        <div className="font-bold bg-[#DDF5FF] h-16 flex justify-between p-2 w-full z-[100]">
          {/* Logo */}
          <div className="w-28 hidden md:flex hover:cursor-pointer" onClick={() => navigate("/home")}>
            <img src={Logo} className="object-cover" />
          </div>
      
          {/* Sign In + Avatar */}
          <div className="flex items-center space-x-2">
            <a href="Ciao.it" className="text-[#135672] font-light">
              Sign In
            </a>
            <RxAvatar className="h-10 w-10" />
          </div>
        </div>
      );      
}

export default SottobarImmobile;
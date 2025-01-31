import { MdMapsHomeWork } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
      <footer className="bg-gray-100 p-6 mt-10 border-t">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Sezione Agenzie */}
          <div>
            <h3 className="text-lg font-semibold flex items-center space-x-2"><MdMapsHomeWork  size={24} /><p>Per le Agenzie</p></h3>
            <ul className="mt-2 space-y-2">
              <li><Link to="/agency/login" className="text-blue-600 hover:underline">Amministrazione Agenzia</Link></li>
              <li><Link to="/agency/verify" className="text-blue-600 hover:underline">Verifica la tua Agenzia</Link></li>
              <li><Link to="/agency/info" className="text-blue-600 hover:underline">Pubblica Annunci con Noi</Link></li>
            </ul>
          </div>
  
          {/* Sezione Admin */}
          <div>
            <h3 className="text-lg font-semibold flex items-center space-x-2"><RiAdminFill size={24} /><p>Amministrazione</p></h3>
            <ul className="mt-2 space-y-2">
              <li><Link to="/admin" className="text-blue-600 hover:underline">Portale Admin</Link></li>
            </ul>
          </div>

        {/* Chi Siamo */}
        <div>
        <h3 className="text-lg font-semibold flex items-center space-x-2"><FaUserFriends size={24} /><p>Chi siamo</p></h3>
        <ul className="mt-2 space-y-2">
            <li><Link to="/about" className="text-blue-600 hover:underline">La Nostra Storia</Link></li>
            <li><Link to="/careers" className="text-blue-600 hover:underline">Lavora con Noi</Link></li>
            <li><Link to="/blog" className="text-blue-600 hover:underline">Blog / News</Link></li>
          </ul>
        </div>

        {/* Legale */}
        <div>
        <h3 className="text-lg font-semibold flex items-center space-x-2"><FaBalanceScale size={24} /><p>Legale</p></h3>
        <ul className="mt-2 space-y-2">
            <li><Link to="/terms" className="text-blue-600 hover:underline">Termini e Condizioni</Link></li>
            <li><Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link></li>
            <li><Link to="/cookies" className="text-blue-600 hover:underline">Cookie Policy</Link></li>
          </ul>
        </div>

      </div>

      {/* Social & Contatti */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">Seguici su:</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://facebook.com" className="text-blue-600 hover:underline">Facebook</a>
          <a href="https://instagram.com" className="text-pink-500 hover:underline">Instagram</a>
          <a href="https://linkedin.com" className="text-blue-700 hover:underline">LinkedIn</a>
          <a href="https://twitter.com" className="text-blue-400 hover:underline">Twitter</a>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          📧 support@dietiestates.com | 📞 +39 123 456 789
        </p>
      </div>
    </footer>
    );
  };
  
  export default Footer;
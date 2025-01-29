import RegisterForm from "../components/RegisterForm";
import image from "../assets/DietiRealLogo.png";

function RegisterPage() {

    return (
        <div className="flex flex-row h-full bg-[#FAFAFA]">
            <div className="w-full h-full flex-1 flex flex-col justify-center items-center space-y-6">
                <RegisterForm />
                <div className="flex space-x-1 font-semibold">
                    <div className="text-black-500 font-bold hover:cursor-pointer">Sei un'agenzia immobiliare?</div>
                    <a className="text-blue-500 font-bold hover:cursor-pointer">Registrati Ora</a>
                </div>
                <div className="flex h-min items-center justify-center">
                    <button type="submit" className="bg-gray-600 text-white font-bold px-3 py-2 rounded-full">Accedi</button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden justify-center items-center bg-[#DDF5FF] rounded-2xl">
                <img className="object-cover w-48 h-48" src={image} />
            </div>
        </div>
    )
}

export default RegisterPage;
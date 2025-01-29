import LoginForm from "../components/LoginForm";
import image from "../assets/DietiRealLogo.png";
import AlternativeLogin from "../components/AlternativeLogin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

function LoginPage() {
    const axios = useAxiosPrivate();
    const {setAuth} = useAuth();
    const test = async () => {
        try {
            const {data} = await axios.get("utente/self");
            alert("loggato");
        } catch (error) {
            alert("non loggato");
        }
    }
    return (
        <div className="flex h-full bg-[#FAFAFA]">
            <div className="flex flex-1 overflow-hidden justify-center items-center bg-[#DDF5FF] rounded-2xl">
                <img className="object-cover w-48 h-48" src={image} />
            </div>
            <div className="w-full h-full flex-1 flex flex-col justify-center items-center space-y-6">
                <LoginForm />
                <AlternativeLogin />
                <button onClick={test}>test</button>
                <button onClick={() => setAuth(undefined)}>logut</button>
                <div className="flex space-x-1 font-semibold">
                    <div>Non hai un Account?</div>
                    <div className="text-blue-500 font-bold underline hover:cursor-pointer">Registrati Ora</div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
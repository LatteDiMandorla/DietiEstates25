import LoginForm from "../components/LoginForm";
import image from "../assets/mountain-7300017.jpg";
import AlternativeLogin from "../components/AlternativeLogin";

function LoginPage() {
    return (
        <div className="flex h-full">
            <div className="flex flex-1 overflow-hidden justify-center items-center">
                <img className="object-cover w-full h-full" src={image} />
            </div>
            <div className="w-full h-full flex-1 flex flex-col justify-center items-center space-y-6">
                <LoginForm />
                <AlternativeLogin />
                <div className="flex space-x-1 font-semibold">
                    <div>Non hai un Account?</div>
                    <div className="text-blue-500 font-bold underline hover:cursor-pointer">Registrati Ora</div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
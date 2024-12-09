function LoginForm() {
    return (
        <div className="flex flex-col justify-center items-center space-y-3">
            <p className="font-bold text-2xl" >Login</p>
            <input placeholder="Email..." className="bg-gray-200 rounded-full p-2" />
            <input placeholder="Password..." className="bg-gray-200 rounded-full p-2" />
            <button className="bg-blue-600 text-white font-bold px-3 py-2 rounded-full">Accedi</button>
        </div>
    )
}

export default LoginForm;
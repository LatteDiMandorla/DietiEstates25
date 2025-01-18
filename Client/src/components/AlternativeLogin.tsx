function AlternativeLogin() {
    return (
        <div className="flex flex-col items-center space-y-2">
        <p className="text-gray-500 font-semibold">Oppure</p>
        <div className="flex space-x-6">
            <div className="flex justify-center items-center w-12 h-12 shadow-md hover:cursor-pointer rounded-md overflow-hidden"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" className="w-8 h-8" /></div>
            <div className="flex justify-center items-center w-12 h-12 shadow-md hover:cursor-pointer rounded-md overflow-hidden"><img src="https://z-m-static.xx.fbcdn.net/rsrc.php/v4/yD/r/5D8s-GsHJlJ.png" className="w-8 h-8" /></div>
        </div>
        </div>
    )
}

export default AlternativeLogin;
export const CaratteristicsAndDescription = () => {
    return (
        <div className="relative flex flex-col items-center h-96 w-96 bg-[#FFFFF] rounded-xl">
            <div className="relative z-10 flex flex-row items-center justify-between px-4 py-2 w-full">
                <div className="flex flex-row items-center space-x-2">
                    <img src="https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png" alt="User_profile_image" className="w-10 h-10 object-cover rounded-full shadow-lg" />
                    <div className="flex flex-col">
                        <span> Sergio Di Martino </span>
                        <span> Agente Immobiliare</span>
                    </div> 
                </div>
            </div>

            <div className="flex flex-col items-center absolute top-16 left-1 right-1 bottom-1 bg-white rounded-xl z-0">
                <button className="flex items-center justify-between bg-[#65558F] text-white rounded-full shadow-md hover:bg-purple-700 px-2 py-1 mt-2 ">
                    <span>Prenota un appuntamento</span>
                </button>
            </div>
        </div>

    )
}
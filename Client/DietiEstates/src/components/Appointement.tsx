import StarRating from "./StarRating";

export const Appointement = () => {
    
    return (
        <div className="flex flex-col items-center h-96 w-96 bg-[#DDF5FF]">
            <div className="flex flex-row items-center justify-between mt-2">
                <img src="https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png" alt="User_profile_image" className="w-10 h-10 object-cover rounded-full shadow-lg" />
                <div className="flex flex-col">
                    <span> Sergio Di Martino </span>
                    <span> Agente Immobiliare</span>
                </div> 
                <StarRating />
            </div>
            <div className="flex flex-col items-center h-72 w-80 mt-4 bg-[#ffffff]">
                <button className="mt-2"> Prenota un appuntamento </button>
            </div>
        </div>
    )
}
interface house_card_props {
    title: string;
    street: string;
    size: string;
    bathroom_number: string;
    local_number: string;
    house_image: string; 
    agent_image: string; 
}


export const house_card = (props: house_card_props) => {
    return (
        <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
        {/* Immagine di copertina */}
        <div className="relative">
          <img src={props.house_image} alt="apartment_image" className="w-full h-48 object-cover" />
          <img
            src={props.agent_image}
            alt="User_profile_image"
            className="absolute top-4 right-4 w-10 h-10 rounded-full border-2 border-white shadow-lg"
          />
        </div>
        {/* Contenuto */}
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800">{props.title}</h2>
          <p className="text-sm text-gray-600">{props.street}</p>
          {/* Icone e dati */}
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <span className="material-icons">square_foot</span>
              <span>{props.size} m²</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="material-icons">bathtub</span>
              <span>{props.bathroom_number} bagni</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="material-icons">meeting_room</span>
              <span>{props.local_number} stanze</span>
            </div>
          </div>
        </div>
      </div>
    );
};
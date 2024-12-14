import apartment from '../assets/Apartment.png'



export const FirstStep = () => {

  const handleOptionClick = (option: "vendita" | "affitto") => {
    { /*TODO*/ }
  };

  return (
    <div className="flex flex-col items-center #fafafa min-h-screen">
      {    /* Header*/     }
      <header className="py-4 shadow-md w-full">
        <div className="flex justify-between items-center w-full px-10">
            <button onClick={() => ("something_to_do")}
              className="text-blue-950 font-mono">
               <span className="text-xl">‹ </span>
               <span className="underline"> Indietro</span>
            </button>
            <span className="text-blue-950 text-opacity-65 font-bold text-xl">
                È un locale in vendita o in affitto?
            </span>
            <button onClick={() => ("something_to_do")} 
              className="text-blue-950 font-mono">
                <span className="underline"> Avanti</span> 
                <span className="text-xl"> ›</span>
            </button>

        </div>
      </header>

      {/* Step indicator */}
      <div className="my-6">
        <div className="flex items-center space-x-1">
          <span className="w-3 h-3 rounded-full bg-blue-900"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
          <span className="w-2 h-2 rounded-full bg-gray-200"></span>
        </div>
      </div>

      {/* Main option */}
      <div className="flex h-full space-x-6 justify-center px-6 w-full">
        {/* Button for "Sale" */}
        <button
          onClick={() => handleOptionClick("vendita")}
          className="relative flex-grow h-[60vh] bg-blue-400 bg-opacity-20 bg-transparent bg-center bg-cover rounded-lg shadow-lg border-2 border-gray-100 hover:shadow-xl hover:scale-105 transition-transform duration-300"
          style={{
            backgroundImage: "",
  
          }}
        >
          <div className="full-w bg-white py-4 shadow-md" > 
            <span className="relative bg-white text-center text-blue-900 font-bold py-4">
              IN VENDITA
            </span>
          </div>
        </button>

        {/* Button for "Rent" */}
        <button
          onClick={() => handleOptionClick("affitto")}
          className="relative flex-grow h-[60vh] bg-blue-400 bg-opacity-20 bg-transparent bg-center bg-cover rounded-lg shadow-lg border-2 border-gray-100 hover:shadow-xl hover:scale-105 transition-transform duration-300"
          style={{
            backgroundImage: "",
            backgroundSize:     "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="full-w bg-white py-4 shadow-md" > 
            <span className="relative bg-white text-center text-blue-900 font-bold py-4">
              IN AFFITTO
            </span>
          </div>
 
        </button>
      </div> 

    </div>
  );
};



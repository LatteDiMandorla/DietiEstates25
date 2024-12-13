
export const FirstStep = () => {

  const handleOptionClick = (option: "vendita" | "affitto") => {
    { /*TODO*/ }
  };

  return (
    <div className="flex flex-col items-center #fafafa min-h-screen">
      {    /* Header*/     }
      <header className="w-full #fafafa py-4 shadow-md">
        <div className="flex justify-between items-center w-full px-10">
            <span>
                Indietro
            </span>
            <span>
                È un locale in vendita o in affitto?
            </span>
            <span>
                Avanti
            </span>

        </div>
      </header>

      {/* Step indicator */}
      <div className="my-6">
        <div className="flex items-center space-x-1">
          <span className="w-3 h-3 rounded-full bg-blue-600"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
          <span className="w-2 h-2 rounded-full bg-gray-200"></span>
        </div>
      </div>

      {/* Main option */}
      <div className="flex space-x-6 justify-center px-6 w-full">
        {/* Button for "Sale" */}
        <button
          onClick={() => handleOptionClick("vendita")}
          className="relative flex-grow h-[60vh] bg-transparent bg-center bg-cover rounded-lg shadow-lg border-2 border-gray-100 hover:shadow-xl hover:scale-105 transition-transform duration-300"
          style={{
            backgroundImage: "",
          }}
        >
          <span className="center bg-white bg-opacity-80 text-center text-blue-900 font-bold py-4">
            IN VENDITA
          </span>
        </button>

        {/* Button for "Rent" */}
        <button
          onClick={() => handleOptionClick("affitto")}
          className="relative flex-grow h-[60vh] bg-transparent bg-center bg-cover rounded-lg shadow-lg border-2 border-gray-100 hover:shadow-xl hover:scale-105 transition-transform duration-300"
          style={{
            backgroundImage: "",
          }}
        >
          <span className="center bg-white bg-opacity-80 text-center text-blue-900 font-bold py-4">
            IN AFFITTO
          </span>
        </button>
      </div> 

    </div>
  );
};



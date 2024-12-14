import affitto from '../assets/AffittoPicture.png'
import vendita from '../assets/VenditaPicture.png'
import StepIndicator from '../components/StepIndicator';
import useRangeCounter from '../hooks/useRangeCounter';



export const FirstStep = () => {
  const steps = 3;
  const {counter: step, prev, next} = useRangeCounter(steps);

  const handleOptionClick = (option: "vendita" | "affitto") => {
    console.log(option);
    { /*TODO*/ }
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col items-center border">
      {    /* Header*/     }
      <header className="py-4 shadow-md w-full">
        <div className="flex justify-between items-center w-full px-10">
            <button onClick={() => (prev())}
              className="text-blue-950 font-mono">
               <span className="text-xl"> </span>
               <span className="underline"> Indietro</span>
            </button>
            <span className="text-blue-950 text-opacity-65 font-bold text-xl">
                È un locale in vendita o in affitto?
            </span>
            <button onClick={() => (next())} 
              className="text-blue-950 font-mono">
                <span className="underline"> Avanti</span> 
                <span className="text-xl"> </span>
            </button>

        </div>
      </header>

      {/* Step indicator */}
      <div className="my-6">
        <StepIndicator selected={step} steps={steps} />
      </div>

      {/* Main option */}
      <div className="w-full h-full overflow-hidden flex space-x-6 justify-evenly p-6">

        {/* Button for "Sale" */}
        <button onClick={() => handleOptionClick("vendita")} className="relative bg-[#DDF5FF] flex justify-center items-center overflow-hidden rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
          <div className="absolute flex items-center justify-center text-blue-900 text-xl font-bold bg-white px-4 py-2 z-20 w-full h-14">
            Vendita
          </div>
          <img src={vendita} className="h-full w-full object-cover opacity-50 border" />
        </button>

        {/* Button for "Rent" */}
        <button onClick={() => handleOptionClick("affitto")} className="relative bg-[#DDF5FF] flex justify-center items-center overflow-hidden rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
          <div className="absolute flex items-center justify-center text-blue-900 text-xl font-bold bg-white px-4 py-2 z-20 w-full h-14">
            Affitto
          </div>
          <img src={affitto} className="h-full w-full object-cover opacity-50 border" />
        </button>
      </div> 

    </div>
  );
};



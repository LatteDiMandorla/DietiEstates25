
import { useState } from 'react';
import StepIndicator from '../components/StepIndicator';
import useRangeCounter from '../hooks/useRangeCounter';


export const SecondStep = () => {

    {/*State to set button on click, null as initial state*/}
    const [activeOption, setActiveOption] = useState<string | null>(null);

    const HandleOptionClick = (option : string) => {
        console.log(option);
        setActiveOption(option);
    }


    const steps = 3;
    const {counter: step, prev, next} = useRangeCounter(steps);

    return (

        <div className=" bg-white">
          {/* Header */}
          <header className="py-4 shadow-md w-full">
                <div className="flex justify-between items-center w-full px-10">
                    <button onClick={() => (prev())}
                            className="text-blue-950 font-mono">
                        <span className="text-xl"> </span>
                        <span className="underline"> Indietro</span>
                    </button>
                        <span className="text-blue-950 text-opacity-65 font-bold text-xl">
                                Inserisci le informazioni preliminari
                        </span>
                    <button onClick={() => (next())} 
                            className="text-blue-950 font-mono">
                        <span className="underline"> Avanti</span> 
                        <span className="text-xl"> </span>
                    </button>

                </div>
         </header>


         <div className="my-6 flex justify-center">
            <StepIndicator selected={1} steps={steps} />
         </div>

         
         <div className="bg-white w-full h-screen mt-28 flex justify-center">
            
            <div className="flex gap-6 max-w-7xl w-full"> 

                <div className="bg-white w-1/2 rounded-lg p-5">
                    <h1 className="text-blue-950 font-mono text-center underline text-2xl"> 
                        Scegli la tipologia di immobile
                    </h1>

                    {/* First Part */}
                    <div className="grid grid-cols-2 gap-3 mt-10">
                        <button onClick={() => HandleOptionClick("Casa")}
                                className={`bg-blue-200 p-20 rounded-lg shadow-md transition-all text-blue-950 ${
                                            activeOption === "Casa" ? "scale-95 bg-blue-400" : "hover:scale-95 hover:bg-blue-400"}`}>
                                Casa
                        </button>
                        <button onClick={() => HandleOptionClick("Villa")}
                                className={`bg-blue-200 p-20 rounded-lg shadow-md transition-all text-blue-950 ${
                                            activeOption === "Villa" ? "scale-95 bg-blue-400" : "hover:scale-95 hover:bg-blue-400"}`} > 
                                Villa
                        </button>
                        <button onClick={() => HandleOptionClick("Appartamento")}
                                className={`bg-blue-200 p-20 rounded-lg shadow-md transition-all text-blue-950 ${
                                            activeOption === "Appartamento" ? "scale-95 bg-blue-400" : "hover:scale-95 hover:bg-blue-400"}`} >
                                Appartamento
                        </button>
                        <button onClick={() => HandleOptionClick("Baita")}
                                className={`bg-blue-200 p-20 rounded-lg shadow-md transition-all text-blue-950 ${
                                            activeOption === "Baita" ? "scale-95 bg-blue-400" : "hover:scale-95 hover:bg-blue-400"}`} > 
                                Baita
                        </button>
                    </div>

                </div>

                {/* Second Part */}
                <div className="bg-white w-1/2 rounded-lg p-5 h-3/4 shadow-md">
                    <h1 className="text-blue-950 font-mono text-center underline text-2xl">
                        Delinea l'immobile
                    </h1>
                </div>


            </div>

         </div>
    
        </div>
    );
};
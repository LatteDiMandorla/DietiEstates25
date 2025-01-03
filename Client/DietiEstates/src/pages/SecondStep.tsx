
import StepIndicator from '../components/StepIndicator';
import useRangeCounter from '../hooks/useRangeCounter';


export const SecondStep = () => {
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

         
         <div className="bg-white w-full h-screen mt-28 flex justify-center">
            
            <div className="flex gap-6 max-w-7xl w-full"> 

                <div className="bg-white w-1/2 rounded-lg p-5">
                    <h1 className="text-blue-950 font-mono text-center underline text-2xl"> 
                        Scegli la tipologia di immobile
                    </h1>

                    {/* First Part */}
                    <div className="grid grid-cols-2 gap-3 mt-10">
                        <button className="bg-blue-200 p-20 rounded-lg shadow-md">
                            Casa
                        </button>
                        <button className="bg-blue-200 p-20 rounded-lg shadow-md"> 
                            Villa
                        </button>
                        <button className="bg-blue-200 p-20 rounded-lg shadow-md">
                            Appartamento
                        </button>
                        <button className="bg-blue-200 p-20 rounded-lg shadow-md">
                            Baita
                        </button>
                    </div>

                </div>

                {/* Second Part */}
                <div className="bg-white w-1/2 rounded-lg p-5 shadow-md">
                    <h1 className="text-blue-950 font-mono text-center underline text-2xl">
                        Delinea l'immobile
                    </h1>
                </div>


            </div>

         </div>
    
        </div>
    );
};
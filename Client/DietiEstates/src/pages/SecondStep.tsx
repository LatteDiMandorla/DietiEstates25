
import { useState } from 'react';
import StepIndicator from '../components/StepIndicator';
import useRangeCounter from '../hooks/useRangeCounter';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import  MapButton from '../components/MapButton'
import * as Yup from 'yup';
import map from '../assets/placeholder.png'


interface Values {
    n_bathroom: string,
    metres:     string,
    n_locals:   string,
    street:     string,
    cap:        string,
    title:      string,
    city:       string,
    civic:      string,
    price:      string
}


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
                                className={`bg-blue-200 py-20 rounded-lg shadow-md transition-all text-blue-950 ${
                                            activeOption === "Casa" ? "scale-95 bg-blue-400" : "hover:scale-95 hover:bg-blue-400"}`}>
                                <span className="text-center"> Casa </span>
                        </button>
                        <button onClick={() => HandleOptionClick("Villa")}
                                className={`bg-blue-200 py-20 rounded-lg shadow-md transition-all text-blue-950 ${
                                            activeOption === "Villa" ? "scale-95 bg-blue-400" : "hover:scale-95 hover:bg-blue-400"}`}> 
                                <span className="text-center"> Villa </span>
                        </button>
                        <button onClick={() => HandleOptionClick("Appartamento")}
                                className={`bg-blue-200 py-20 rounded-lg shadow-md transition-all text-blue-950 overflow-hidden text-center ${
                                            activeOption === "Appartamento" ? "scale-95 bg-blue-400" : "hover:scale-95 hover:bg-blue-400"}`}>
                                <span className="text-center"> Appartamento </span>  
                        </button>
                        <button onClick={() => HandleOptionClick("Baita")}
                                className={`bg-blue-200 py-20 rounded-lg shadow-md transition-all text-blue-950 ${
                                            activeOption === "Baita" ? "scale-95 bg-blue-400" : "hover:scale-95 hover:bg-blue-400"}`}> 
                                <span className="text-center"> Baita </span>
                        </button>
                    </div>

                </div>

                {/* Second Part */}
                <div className="bg-white w-1/2 rounded-lg p-5 h-3/4 shadow-md">
                    <h1 className="text-blue-950 font-mono text-center underline text-2xl">
                        Delinea l'immobile
                    </h1>
                    <div className="mt-4 w-full h-3/4">
                                  <DetailBox />
                    </div>
                </div>


            </div>

         </div>
    
        </div>
    );
};


const DetailSchema = Yup.object().shape({
    metres:     Yup.number().positive("I metri non possono essere negativi!").required("Metratura obbligatoria"),
    n_locals:   Yup.number().min(1, "Minimo un locale").max(6, "Massimo sei locali").required("Locali obbligatori"),
    n_bathroom: Yup.number().min(1, "Minimo un bagno").required("Bagno obbligatorio"),
    street:     Yup.string().required("Strada obbligatoria"),
    cap:        Yup.number().min(4, "5 numeri per il CAP").required("CAP obbligatorio"),
    title:      Yup.string().required("Titolo obbligatorio"),
    city:       Yup.string().required("Devi indicare la città!"),
    civic:      Yup.number().min(1),
    price:      Yup.number().positive("Prezzo non può essere negativo o zero!").required("Un prezzo indicativo deve essere inserito!")
})

const DetailBox = () => {

    const handleSubmit = (values: Values, {resetForm} : FormikHelpers<Values>) => {
        console.log(values);
        resetForm();
    }

    return (
        <Formik initialValues={{n_bathroom: "", metres: "", n_locals: "", street: "", cap: "", title: "", civic: "", price: "", city: ""}} validationSchema={DetailSchema} onSubmit={handleSubmit}>
            {({errors, touched}) => (
            <Form>
                <div className="flex w-full mt-10"> 
                    <div className="flex w-full flex-col justify-between relative">
                        <Field type="number" name="metres" maxLength="15" placeholder="m²..." className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-28 px-2 h-10 transition-all duration-75 " + ((errors.metres && touched.metres) ? "border border-red-500" : (touched.metres && "border border-green-500"))} />
                        <ErrorMessage name="metres">{msg => <div className="text-xs text-red-500 absolute top-full mt-1">{msg}</div>}</ErrorMessage>

                    </div>
                    <div className="flex w-full flex-col justify-between relative">
                        <Field type="number" name="n_locals" maxLength="15" placeholder="N.locals" className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-28 px-2 h-10 transition-all duration-75 " + ((errors.n_locals && touched.n_locals) ? "border border-red-500" : (touched.n_locals && "border border-green-500"))} />
                        <ErrorMessage name="n_locals">{msg => <div className="text-xs text-red-500 absolute top-full mt-1">{msg}</div>}</ErrorMessage>
                    </div>
                    <div className="flex w-full flex-col justify-between relative">
                        <Field type="number" name="n_bathroom" maxLength="15" placeholder="N.bathroom" className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-28 px-2 h-10 transition-all duration-75  " + ((errors.n_bathroom && touched.n_bathroom) ? "border border-red-500" : (touched.n_bathroom && "border border-green-500"))} />
                        <ErrorMessage name="n_bathroom">{msg => <div className="text-xs text-red-500 absolute top-full mt-1">{msg}</div>}</ErrorMessage>    
                    </div>

                </div>     
                <div className="flex w-full mt-10">
                    <div className="flex flex-col justify-between relative">
                        <Field name="title" maxLength="30" placeholder="Title" className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-46 px-2 h-10 transition-all duration-75 " + ((errors.title && touched.title) ? "border border-red-500" : (touched.title && "border border-green-500"))} />
                        <ErrorMessage name="title">{msg => <div className="text-xs text-red-500 absolute top-full mt-1">{msg}</div>}</ErrorMessage> 
                    </div>

                    

                </div>   
                <div className="flex w-full mt-10"> 
                    <div className="flex w-full flex-col justify-between relative">
                        <Field name="street" maxLength="15" placeholder="Street..." className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-48 px-2 h-10 transition-all duration-75 " + ((errors.street && touched.street) ? "border border-red-500" : (touched.street && "border border-green-500"))} />
                        <ErrorMessage name="street">{msg => <div className="text-xs text-red-500 absolute top-full mt-1">{msg}</div>}</ErrorMessage>

                    </div>
                    <div className="flex w-full flex-col justify-between relative">
                        <Field type="number"name="civic" maxLength="15" placeholder="N." className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-16 px-2 h-10 transition-all duration-75 " + ((errors.civic && touched.civic) ? "border border-red-500" : (touched.civic && "border border-green-500"))} />
                        <ErrorMessage name="civic">{msg => <div className="text-xs text-red-500 absolute top-full mt-1">{msg}</div>}</ErrorMessage>
                    </div>


                </div>

                <div className="flex w-full mt-10"> 
                    <div className="flex w-full flex-col justify-between relative">
                        <Field name="city" maxLength="30" placeholder="City..." className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-60 px-2 h-10 transition-all duration-75 " + ((errors.city && touched.city) ? "border border-red-500" : (touched.city && "border border-green-500"))} />
                        <ErrorMessage name="city">{msg => <div className="text-xs text-red-500 absolute top-full mt-1">{msg}</div>}</ErrorMessage>

                    </div>
                    <div className="flex w-full flex-col justify-between relative">
                        <Field type="number"name="cap" maxLength="4" placeholder="CAP" className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-28 px-2 h-10 transition-all duration-75 " + ((errors.cap && touched.cap) ? "border border-red-500" : (touched.cap && "border border-green-500"))} />
                        <ErrorMessage name="number">{msg => <div className="text-xs text-red-500 absolute top-full mt-1">{msg}</div>}</ErrorMessage>
                    </div>

                </div>

                <div className="flex w-full mt-10 justify-center"> 
                    <div className="flex w-full flex-col relative">
                        <Field name="price" maxLength="30" placeholder="Prezzo..." className={"bg-green-100 hover:bg-green-200 rounded-md ml-2 w-60 px-2 h-10 transition-all duration-75 " + ((errors.price && touched.price) ? "border border-red-500" : (touched.price && "border border-green-500"))} />
                        <ErrorMessage name="price">{msg => <div className="text-xs text-red-500 absolute top-full mt-1">{msg}</div>}</ErrorMessage>

                    </div>
                    <div className="bg-white w-full ">
                        <MapButton />
                    </div>
                </div>                               
            </Form>
            )}
        </Formik>
    )
}
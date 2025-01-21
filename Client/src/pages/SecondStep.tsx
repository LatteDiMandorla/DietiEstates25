
import { useState } from 'react';
import StepIndicator from '../components/StepIndicator';
import useRangeCounter from '../hooks/useRangeCounter';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { IoExit } from 'react-icons/io5';



interface Values 
{
    n_bathroom: string,
    metres:     string,
    n_locals:   string,
    street:     string,
    cap:        string,
    title:      string,
    price:      string,
    civic:      string,
    city:       string
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

        <div className=" bg-white w-full h-full flex flex-col items-center jusitfy-center lg:overflow-hidden overflow-y-auto">
          {/* Header */}
      <header className="py-4 shadow-md w-full sticky top-0 z-10 bg-white">
        <div className="flex justify-center lg:justify-between items-center w-full px-3">
            <button onClick={() => (prev())}
              className="hidden lg:block text-blue-950 text-opacity-65 font-mono lg:flex flex-row items-start justify-start hover:scale-90 transition-transform">
                <FaArrowAltCircleLeft className='mt-1 text-xl text-blue-800'> </FaArrowAltCircleLeft>
               <span className="text-xl ml-2 underline font-mono"> Indietro</span>
            </button>
            <span className="text-blue-950 text-opacity-65 font-bold text-xl text-center">
                Definisci la tua struttura!
            </span>
            <button onClick={() => (next())} 
              className="hidden lg:block text-blue-950 text-opacity-65 font-mono lg:flex flex-row items-start justify-start hover:scale-90 transition-transform">
                <span className="text-xl mr-2 underline font-mono"> Avanti</span> 
                <FaArrowAltCircleRight className='mt-1 text-xl text-blue-800'> </FaArrowAltCircleRight>
            </button>

        </div>
      </header>


         <div className="my-6 flex justify-center">
            <StepIndicator selected={1} steps={steps} />
         </div>

         
         <div className="bg-white min-h-screen w-full flex justify-center items-center flex-col">

            <div className='bg-white w-full h-full items-center justify-center flex lg:flex-row flex-col'>
                    <div className='bg-white flex lg:w-1/2 w-full h-1/2 lg:h-full items-center justify-start p-4 flex-col'>
                        <h1 className='text-blue-950 text-xl text-opacity-65 font-bold'> Che tipo di struttura è? </h1>
                        <div className="grid grid-cols-2 gap-3 lg:w-1/2 w-full mt-3">
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
  
                    <div className="bg-white p-2 flex lg:w-1/2 w-full h-2/3 lg:h-full items-start justify-center">
                        <div className="bg-white w-full rounded-lg p-5 h-full shadow-md flex items-center justify-start flex-col">
                        <h1 className='text-blue-950 text-opacity-65 text-xl font-bold'>
                            Inserisci informazioni
                        </h1>
                            <div className="w-full h-full">
                                  <DetailBox />
                            </div>
                        </div>
                        
                    </div>
                                    
            </div>


        </div>

        <div className="block lg:hidden w-full h-20 bg-white border border-gray-200 items-center flex justify-between fixed bottom-0 left-0 right-0 z-20">
                              <button
                                onClick={() => {}} 
                                className="flex items-center justify-center rounded-md bg-[#DDF5FF] h-10 w-14 ml-2 text-blue-900 hover:bg-blue-300 transition-all duration-300 hover:scale-90">
                                  <FaArrowAltCircleLeft className="w-8 h-8"></FaArrowAltCircleLeft>
                              </button>
                              <button 
                                onClick={() => {}}
                                className="flex items-center justify-center bg-red-400 rounded-full w-10 h-10 text-white hover:bg-red-500 hover:scale-95 transition-all">
                                <IoExit className='w-6 h-6'/>
                              </button>
                              <button className="flex items-center justify-center rounded-md bg-[#DDF5FF] h-10 w-14 mr-2 text-blue-900 hover:bg-blue-300 transition-all duration-300 hover:scale-90">
                                  <FaArrowAltCircleRight className="w-8 h-8"></FaArrowAltCircleRight>
                              </button>
        </div>
    
    </div>
  );
};



{/*DetailSchema allows users to insert important info about the property*/}

const DetailSchema = Yup.object().shape({
    metres:     Yup.number().positive("I metri non possono essere negativi!").required("Metratura obbligatoria"),
    n_locals:   Yup.number().min(1, "Minimo un locale").max(6, "Massimo sei locali").required("Locali obbligatori"),
    n_bathroom: Yup.number().min(1, "Minimo un bagno").required("Bagno obbligatorio"),
    street:     Yup.string().required("Strada obbligatoria"),
    cap:        Yup.number().min(5, "5 numeri per il CAP").max(5, "5 numeri per il CAP").required("CAP obbligatorio"),
    title:      Yup.string().required("Titolo obbligatorio"),
    city:       Yup.string().required("Devi indicare la città!"),
    civic:      Yup.number().min(1, "Civico zero non può esistere").required("Civico obbligatorio"),
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
                <div className="flex w-full mt-6"> 
                    <div className="flex w-full flex-col lg:flex-row lg:items-start lg:space-x-0 justify-between relative">
                        <Field type="number" name="metres" maxLength="15" placeholder="m²..." className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-28 px-2 h-10 transition-all duration-75 " + ((errors.metres && touched.metres) ? "border border-red-500 animate-shake" : (touched.metres && "border border-green-500"))}/>
                        <ErrorMessage name="metres">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2 mr-2">{msg}</div>}</ErrorMessage>

                    </div>
                    <div className="flex w-full flex-col justify-between relative">
                        <Field type="number" name="n_locals" maxLength="15" placeholder="N.locali" className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-28 px-2 h-10 transition-all duration-75 " + ((errors.n_locals && touched.n_locals) ? "border border-red-500 animate-shake" : (touched.n_locals && "border border-green-500"))} />
                        <ErrorMessage name="n_locals">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2">{msg}</div>}</ErrorMessage>
                    </div>
                    <div className="flex w-full flex-col justify-between relative">
                        <Field type="number" name="n_bathroom" maxLength="15" placeholder="N.Bagni" className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-28 px-2 h-10 transition-all duration-75  " + ((errors.n_bathroom && touched.n_bathroom) ? "border border-red-500 animate-shake" : (touched.n_bathroom && "border border-green-500"))} />
                        <ErrorMessage name="n_bathroom">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2">{msg}</div>}</ErrorMessage>    
                    </div>

                </div>     
                <div className="flex w-full mt-10">
                    <div className="flex flex-col justify-between relative">
                        <Field name="title" maxLength="30" placeholder="Titolo" className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-46 px-2 h-10 transition-all duration-75 " + ((errors.title && touched.title) ? "border border-red-500 animate-shake" : (touched.title && "border border-green-500"))} />
                        <ErrorMessage name="title">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2">{msg}</div>}</ErrorMessage> 
                    </div>

                    

                </div>   
                <div className="flex w-full mt-10"> 
                    <div className="flex w-full flex-col justify-between relative">
                        <Field name="street" maxLength="15" placeholder="Via..." className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-48 px-2 h-10 transition-all duration-75 " + ((errors.street && touched.street) ? "border border-red-500 animate-shake" : (touched.street && "border border-green-500"))} />
                        <ErrorMessage name="street">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2">{msg}</div>}</ErrorMessage>

                    </div>
                    <div className="flex w-full flex-col justify-between relative">
                        <Field type="number"name="civic" maxLength="15" placeholder="N." className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-16 px-2 h-10 transition-all duration-75 " + ((errors.civic && touched.civic) ? "border border-red-500 animate-shake" : (touched.civic && "border border-green-500"))} />
                        <ErrorMessage name="civic">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2">{msg}</div>}</ErrorMessage>
                    </div>


                </div>

                <div className="flex w-full mt-10"> 
                    <div className="flex w-full flex-col justify-between relative">
                        <Field name="city" maxLength="30" placeholder="Città..." className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-60 px-2 h-10 transition-all duration-75 " + ((errors.city && touched.city) ? "border border-red-500 animate-shake" : (touched.city && "border border-green-500"))} />
                        <ErrorMessage name="city">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2">{msg}</div>}</ErrorMessage>

                    </div>
                    <div className="flex w-full flex-col justify-between relative">
                        <Field type="number"name="cap" maxLength="4" placeholder="CAP" className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-28 px-2 h-10 transition-all duration-75 " + ((errors.cap && touched.cap) ? "border border-red-500 animate-shake" : (touched.cap && "border border-green-500"))} />
                        <ErrorMessage name="cap">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2">{msg}</div>}</ErrorMessage>
                    </div>

                </div>

                <div className="flex w-full mt-10 justify-center"> 
                    <div className="flex w-full flex-col relative">
                        <Field name="price" maxLength="30" placeholder="Prezzo..." className={"bg-green-100 hover:bg-green-200 rounded-md ml-2 w-60 px-2 h-10 transition-all duration-75 " + ((errors.price && touched.price) ? "border border-red-500 animate-shake" : (touched.price && "border border-green-500"))} />
                        <ErrorMessage name="price">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2">{msg}</div>}</ErrorMessage>

                    </div>
                </div>                               
            </Form>
            )}
        </Formik>
    )
}
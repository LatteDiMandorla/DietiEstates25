
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { useStepForm } from '../hooks/useStepForm';
import useAddressAutocomplete from "../hooks/useAddressAutocomplete";
import SuggestionsDrowdown from "../components/SuggestionsDropdown";
import { ClipLoader } from "react-spinners";



interface Values {
    type: string,
    bathrooms: string,
    size: string,
    locals: string,
    street: string,
    lat: number,
    lon: number,
    cap: string,
    title: string,
    price: string,
    civic: string,
    city: string
}


export const SecondStep = () => {
    return (

        <div className="w-full h-full flex flex-col items-center jusitfy-center lg:overflow-hidden overflow-y-auto">
            <DetailBox />

            {/* <div className="lg:hidden w-full h-20 bg-white border border-gray-200 items-center flex justify-between fixed bottom-0 left-0 right-0 z-20">
                <button
                    onClick={() => { }}
                    className="flex items-center justify-center rounded-md bg-[#DDF5FF] h-10 w-14 ml-2 text-blue-900 hover:bg-blue-300 transition-all duration-300 hover:scale-90">
                    <FaArrowAltCircleLeft className="w-8 h-8"></FaArrowAltCircleLeft>
                </button>
                <button
                    onClick={() => { }}
                    className="flex items-center justify-center bg-red-400 rounded-full w-10 h-10 text-white hover:bg-red-500 hover:scale-95 transition-all">
                    <IoExit className='w-6 h-6' />
                </button>
                <button className="flex items-center justify-center rounded-md bg-[#DDF5FF] h-10 w-14 mr-2 text-blue-900 hover:bg-blue-300 transition-all duration-300 hover:scale-90">
                    <FaArrowAltCircleRight className="w-8 h-8"></FaArrowAltCircleRight>
                </button>
            </div> */}

        </div>
    );
};



{/*DetailSchema allows users to insert important info about the property*/ }

const DetailSchema = Yup.object().shape({
    type: Yup.string().required("Scegli una tipologia di immobile"),
    size: Yup.number().positive("I metri non possono essere negativi!").required("Metratura obbligatoria"),
    locals: Yup.number().min(1, "Minimo un locale").max(6, "Massimo sei locali").required("Locali obbligatori"),
    bathrooms: Yup.number().min(1, "Minimo un bagno").required("Bagno obbligatorio"),
    street: Yup.string().required("Strada obbligatoria"),
    lat: Yup.number().required().notOneOf([0], "Scegliere un indirizzo valido dalla barra"),
    lon: Yup.number().required().notOneOf([0], "Scegliere un indirizzo valido dalla barra"),
    title: Yup.string().required("Titolo obbligatorio"),
    price: Yup.number().positive("Prezzo non può essere negativo o zero!").required("Un prezzo indicativo deve essere inserito!")
})


const DetailBox = () => {

    const handleSubmit = (values: Values, { resetForm }: FormikHelpers<Values>) => {
        console.log(values);
        resetForm();
    }

    const { formikRefs } = useStepForm();
    const { suggestions, isLoading, handleInputChange } = useAddressAutocomplete("street");
    return (
        <Formik initialValues={{ type: "", bathrooms: "", size: "", locals: "", street: "", cap: "", title: "", civic: "", price: "", city: "", lat: 0, lon: 0 }} validationSchema={DetailSchema} onSubmit={handleSubmit} innerRef={(ref) => formikRefs.current[1] = ref}>
            {({ values, errors, touched, setFieldValue }) => (
                <Form className='p-2 flex gap-2 w-full justify-between items-center space-x-8'>
                    <div className='flex-1 bg-white shadow-md rounded-md px-4 py-2 h-fit'>
                        <label className='font-semibold'>Tipologia</label>
                        <Field name="type">
                            {() => (<div className="grid grid-cols-2 gap-3 w-full">
                                <button type='button' onClick={() => setFieldValue("type", "Casa")}
                                    className={`bg-blue-200 py-20 rounded-lg shadow-md transition-all text-blue-950 ${values.type === "Casa" ? "scale-95 bg-blue-400" : "hover:scale-95 hover:bg-blue-400"}`}>
                                    <span className="text-center"> Casa </span>
                                </button>
                                <button type='button' onClick={() => setFieldValue("type", "Villa")}
                                    className={`bg-blue-200 py-20 rounded-lg shadow-md transition-all text-blue-950 ${values.type === "Villa" ? "scale-95 bg-blue-400" : "hover:scale-95 hover:bg-blue-400"}`}>
                                    <span className="text-center"> Villa </span>
                                </button>
                                <button type='button' onClick={() => setFieldValue("type", "Appartamento")}
                                    className={`bg-blue-200 py-20 rounded-lg shadow-md transition-all text-blue-950 overflow-hidden text-center ${values.type === "Appartamento" ? "scale-95 bg-blue-400" : "hover:scale-95 hover:bg-blue-400"}`}>
                                    <span className="text-center"> Appartamento </span>
                                </button>
                                <button type='button' onClick={() => setFieldValue("type", "Baita")}
                                    className={`bg-blue-200 py-20 rounded-lg shadow-md transition-all text-blue-950 ${values.type === "Baita" ? "scale-95 bg-blue-400" : "hover:scale-95 hover:bg-blue-400"}`}>
                                    <span className="text-center"> Baita </span>
                                </button>
                            </div>)}
                        </Field>
                        <ErrorMessage name="type">{msg => <div className="text-xs text-red-500 top-full">{msg}</div>}</ErrorMessage>
                    </div>
                    <div className='flex-1 flex flex-col space-y-4'>
                        <div className='flex flex-col gap-6 bg-white shadow-md px-2 py-6 rounded-md'>
                            <label className='font-semibold'>Informazioni annuncio</label>
                            <div className="flex w-full">
                                <div className="flex flex-col justify-between relative">
                                    <label className=''>Titolo</label>
                                    <Field name="title" maxLength="30" placeholder="Titolo" className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-46 px-2 h-10 transition-all duration-75 " + ((errors.title && touched.title) ? "border border-red-500 animate-shake" : (touched.title && "border border-green-500"))} />
                                    <ErrorMessage name="title">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2">{msg}</div>}</ErrorMessage>
                                </div>
                            </div>
                            <div className="flex w-full">
                                <div className="flex w-full flex-col lg:items-start lg:space-x-0 justify-between relative">
                                    <label className=''>Metratura</label>
                                    <Field type="number" name="size" maxLength="15" placeholder="m²..." className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-28 px-2 h-10 transition-all duration-75 " + ((errors.size && touched.size) ? "border border-red-500 animate-shake" : (touched.size && "border border-green-500"))} />
                                    <ErrorMessage name="size">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2 mr-2">{msg}</div>}</ErrorMessage>

                                </div>
                                <div className="flex w-full flex-col justify-between relative">
                                    <label className=''>Locali</label>
                                    <Field type="number" name="locals" maxLength="15" placeholder="N.locali" className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-28 px-2 h-10 transition-all duration-75 " + ((errors.locals && touched.locals) ? "border border-red-500 animate-shake" : (touched.locals && "border border-green-500"))} />
                                    <ErrorMessage name="locals">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2">{msg}</div>}</ErrorMessage>
                                </div>
                                <div className="flex w-full flex-col justify-between relative">
                                    <label className=''>Bagni</label>
                                    <Field type="number" name="bathrooms" maxLength="15" placeholder="N.Bagni" className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-28 px-2 h-10 transition-all duration-75  " + ((errors.bathrooms && touched.bathrooms) ? "border border-red-500 animate-shake" : (touched.bathrooms && "border border-green-500"))} />
                                    <ErrorMessage name="bathrooms">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2">{msg}</div>}</ErrorMessage>
                                </div>
                            </div>
                            <div className="flex w-full justify-center">
                                <div className="flex w-full flex-col relative">
                                    <label className=''>Prezzo</label>
                                    <Field name="price" maxLength="30" placeholder="Prezzo..." className={"bg-gray-100 hover:bg-gray-200  rounded-md ml-2 w-60 px-2 h-10 transition-all duration-75 " + ((errors.price && touched.price) ? "border border-red-500 animate-shake" : (touched.price && "border border-green-500"))} />
                                    <ErrorMessage name="price">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2">{msg}</div>}</ErrorMessage>
                                </div>
                            </div>
                            <div className="flex w-full flex-col justify-between relative">
                                <label className=''>Indirizzo</label>
                                <Field name="street">
                                    {() => (
                                        <div tabIndex={1} className="group relative">
                                            <div className="relative flex items-center">
                                                <input value={values.street} onChange={(e) => {setFieldValue("street", e.target.value); handleInputChange(e)}} maxLength={15} placeholder="Via..." className={"bg-gray-100 hover:bg-gray-200 rounded-md ml-2 w-96 px-2 h-10 transition-all duration-75 " + ((errors.street && touched.street) ? "border border-red-500 animate-shake" : (touched.street && "border border-green-500"))} />
                                                <ClipLoader loading={isLoading} size={20} className="absolute right-16" />
                                            </div>
                                            {suggestions && suggestions.length > 0 && <SuggestionsDrowdown suggestions={suggestions} className={"group-focus-within:block"} setText={(street: any) => setFieldValue("street", street.text)} onClick={(street: any) => { setFieldValue("street", street.text); setFieldValue("lat", street.lat); setFieldValue("lon", street.lon) }} />}
                                        </div>
                                    )}
                                </Field>
                                <ErrorMessage name="street">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2">{msg}</div>}</ErrorMessage>
                                <ErrorMessage name="lat">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2">{msg}</div>}</ErrorMessage>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
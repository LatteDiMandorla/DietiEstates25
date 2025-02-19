import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

interface Values {
    nome: string,
    cognome: string
}

const ClienteInfoSchema = Yup.object().shape({
    nome: Yup.string().required("Nome is required"),
    cognome: Yup.string().required("Cognome is required"),
})

function ChangeClienteInfoForm({nome: nomeI, cognome: cognomeI} : Values) {
    const axios = useAxiosPrivate();
    const {setAuth} = useAuth();

    const handleSubmit = async (values: Values, {resetForm} : FormikHelpers<Values>) => {
        console.log(values);
        if(values && values.nome && values.cognome){
            try {
                await axios.post("/utente/info", {nome: values.nome, cognome: values.cognome});
                setAuth(prev => ({...prev, nome: values.nome, cognome: values.cognome}));
            } catch (error) {
                console.log(error);
                resetForm();
            }
        }
    }

    return (
        <Formik initialValues={{nome: nomeI, cognome: cognomeI}} validationSchema={ClienteInfoSchema} onSubmit={handleSubmit}>
            {({errors, touched, values, setValues}) => (
            <Form className="flex flex-col space-y-3 w-fit h-fit">
                <div className="flex flex-col">
                        <p className="font-semibold">Nome: </p>
                        <Field name="nome" placeholder="Nome..." className={"border border-gray-300 hover:bg-gray-300 rounded-md ml-2 w-48 px-2 h-10 " + ((errors.nome && touched.nome) ? "border border-red-500" : (touched.nome && values.nome != nomeI && "border border-blue-500"))} />
                        <ErrorMessage name="nome">{msg => <div className="text-xs text-center text-red-500 w-56">{msg}</div>}</ErrorMessage>
                </div>                
                <div className="flex flex-col">
                        <p className="font-semibold">Cognome: </p>
                        <Field name="cognome" maxLength="20" type="text" placeholder="Cognome..." className={"border border-gray-300 hover:bg-gray-300 rounded-md ml-2 w-48 px-2 h-10 " + ((errors.cognome && touched.cognome) ? "border border-red-500" : (touched.cognome && values.cognome != cognomeI && "border border-blue-300"))} />
                        <ErrorMessage name="cognome">{msg => <div className="text-xs text-center text-red-500 w-56">{msg}</div>}</ErrorMessage>
                </div>                
                {(values.nome != nomeI || values.cognome != cognomeI) && 
                <div className="w-full flex justify-between">
                    <button type="button" onClick={() => setValues({nome: nomeI, cognome: cognomeI})} className="border border-grey-300 px-2 py-1 rounded-md hover:bg-gray-200">Indietro</button>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md">Salva</button>
                </div>}
            </Form>
            )}
        </Formik>
    )
}

export default ChangeClienteInfoForm;
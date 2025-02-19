import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

interface Values {
    email: string,
    nome: string,
    cognome: string,
    role: "supporto" | "agente" | "",
}

const InviteSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    nome: Yup.string().required("Nome is required"),
    cognome: Yup.string().required("Cognome is required"),
    role: Yup.string().oneOf(["supporto", "agente"], "Seleziona un ruolo valido").required("Scegliere un ruolo tra quelli proposti"),
})

function InviteForm() {
    const axios = useAxiosPrivate()

    const handleSubmit = async (values: Values, {resetForm} : FormikHelpers<Values>) => {
        if(values && values.email && values.role){
            const {data} = await axios.post(`/auth/register/${values.role}`, {...values, callback: `${import.meta.env.VITE_API_URL}/resetpassword`});
            console.log(values);
            if(data){
                console.log(data);
            }
        }
        resetForm();
    }

    return (
        <Formik initialValues={{email: "", role: "", nome: "", cognome: ""}} validationSchema={InviteSchema} onSubmit={handleSubmit}>
            {({errors, touched}) => (
            <Form className="flex flex-col justify-center items-center space-y-3">
                <p className="font-bold text-2xl" >Invita un collaboratore</p>
                <div className="flex flex-col items-center">
                        <Field name="email" placeholder="Email..." className={"bg-gray-200 hover:bg-gray-300 rounded-full ml-2 w-48 px-2 h-10 " + ((errors.email && touched.email) ? "border border-red-500" : (touched.email && "border border-green-500"))} />
                        <ErrorMessage name="email">{msg => <div className="text-xs text-center text-red-500 w-56">{msg}</div>}</ErrorMessage>
                </div> 
                <div className="flex flex-col items-center">
                        <Field name="nome" placeholder="Nome..." className={"bg-gray-200 hover:bg-gray-300 rounded-full ml-2 w-48 px-2 h-10 " + ((errors.nome && touched.nome) ? "border border-red-500" : (touched.nome && "border border-green-500"))} />
                        <ErrorMessage name="nome">{msg => <div className="text-xs text-center text-red-500 w-56">{msg}</div>}</ErrorMessage>
                </div>        
                <div className="flex flex-col items-center">
                        <Field name="cognome" placeholder="Cognome..." className={"bg-gray-200 hover:bg-gray-300 rounded-full ml-2 w-48 px-2 h-10 " + ((errors.cognome && touched.cognome) ? "border border-red-500" : (touched.cognome && "border border-green-500"))} />
                        <ErrorMessage name="cognome">{msg => <div className="text-xs text-center text-red-500 w-56">{msg}</div>}</ErrorMessage>
                </div>                       
                <div>
                    <label className="block text-lg font-medium">Seleziona un ruolo:</label>
                    <div className="flex gap-4 mt-2">
                    <label className="flex items-center">
                        <Field type="radio" name="role" value="supporto" className="mr-2" />
                        Supporto
                    </label>
                    <label className="flex items-center">
                        <Field type="radio" name="role" value="agente" className="mr-2" />
                        Agente
                    </label>
                    </div>
                    <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
                </div>                
                <button type="submit" className="bg-blue-600 text-white font-bold px-3 py-2 rounded-full">Aggiungi</button>
            </Form>
            )}
        </Formik>
    )
}

export default InviteForm;
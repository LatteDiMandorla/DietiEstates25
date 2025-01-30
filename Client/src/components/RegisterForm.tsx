import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';
import axios from "../api/axios";

interface Values {
    username: string,
    email: string,
    nome: string,
    cognome: string,
    password: string,
    confirmPassword: string,
}

const RegisterSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    nome: Yup.string().required("Name is required"),
    cognome: Yup.string().required("Surname is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().min(5, "Password must contain 5 characters minimum").max(20, "Password must contain 20 characters maximum").required("Password is required").matches(/^[a-zA-Z0-9._@!?-]+$/, "Special character invalid"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Passwords must match")
        .required("Confirm password is required")   
})

function RegisterForm() {

    const handleSubmit = async (values: Values, {resetForm} : FormikHelpers<Values>) => {
        if (values.email && values.password && values.confirmPassword && values.nome && values.cognome && values.username) {
            try {
                const payload = {
                    username: values.username,
                    password: values.password,
                    nome: values.nome,
                    cognome: values.cognome,
                    email: values.email,
                };
    
                const { data } = await axios.post("/auth/register", payload, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
    
                console.log("Risposta dal server:", data); // DEBUG: Stampa la risposta
    
            } catch (error: any) {
                if (error.response) {
                    // Stampa il messaggio di errore ricevuto dal server
                    console.error('Errore durante la registrazione:', error.response.data.message || error.response.data);
                    alert(`Errore: ${error.response.data.message || 'Errore sconosciuto'}`);
                } else {
                    console.error('Errore di rete:', error.message);
                    alert('Errore di rete: ' + error.message);
                }
            }
        }
    }

    return (
        <Formik initialValues={{ email: "", password: "", confirmPassword: "", username: "", nome: "", cognome: "", image: null }} validationSchema={RegisterSchema} onSubmit={handleSubmit}>
            {({errors, touched, setFieldValue}) => (
            <Form className="flex flex-col justify-center items-center space-y-3">
                <p className="font-bold text-2xl" >Registrazione</p>
                <div className="flex flex-col items-center">
                        <Field name="username" placeholder="Username..." className={"bg-gray-200 hover:bg-gray-300 rounded-full ml-2 w-52 px-2 h-10 " + ((errors.username && touched.username) ? "border border-red-500" : (touched.username && "border border-green-500"))} />
                        <ErrorMessage name="username">{msg => <div className="text-xs text-center text-red-500 w-56">{msg}</div>}</ErrorMessage>
                </div>
                <div className="flex flex-col items-center">
                        <Field name="nome" placeholder="Name..." className={"bg-gray-200 hover:bg-gray-300 rounded-full ml-2 w-52 px-2 h-10 " + ((errors.nome && touched.nome) ? "border border-red-500" : (touched.nome && "border border-green-500"))} />
                        <ErrorMessage name="nome">{msg => <div className="text-xs text-center text-red-500 w-56">{msg}</div>}</ErrorMessage>
                </div>
                <div className="flex flex-col items-center">
                        <Field name="cognome" placeholder="Surname..." className={"bg-gray-200 hover:bg-gray-300 rounded-full ml-2 w-52 px-2 h-10 " + ((errors.cognome && touched.cognome) ? "border border-red-500" : (touched.cognome && "border border-green-500"))} />
                        <ErrorMessage name="cognome">{msg => <div className="text-xs text-center text-red-500 w-56">{msg}</div>}</ErrorMessage>
                </div>
                <div className="flex flex-col items-center">
                        <Field name="email" placeholder="Email..." className={"bg-gray-200 hover:bg-gray-300 rounded-full ml-2 w-52 px-2 h-10 " + ((errors.email && touched.email) ? "border border-red-500" : (touched.email && "border border-green-500"))} />
                        <ErrorMessage name="email">{msg => <div className="text-xs text-center text-red-500 w-56">{msg}</div>}</ErrorMessage>
                </div>                
                <div className="flex flex-col items-center">
                        <Field name="password" maxLength="20" type="password" placeholder="Password..." className={"bg-gray-200 hover:bg-gray-300 rounded-full ml-2 w-52 px-2 h-10 " + ((errors.password && touched.password) ? "border border-red-500" : (touched.password && "border border-green-500"))} />
                        <ErrorMessage name="password">{msg => <div className="text-xs text-center text-red-500 w-56">{msg}</div>}</ErrorMessage>
                </div>  
                <div className="flex flex-col items-center">
                        <Field name="confirmPassword" maxLength="20" type="password" placeholder="Conferma Password..." className={"bg-gray-200 hover:bg-gray-300 rounded-full ml-2 w-52 px-2 h-10 " + ((errors.confirmPassword && touched.confirmPassword) ? "border border-red-500" : (touched.confirmPassword && "border border-green-500"))} />
                        <ErrorMessage name="confirmPassword">{msg => <div className="text-xs text-center text-red-500 w-56">{msg}</div>}</ErrorMessage>
                </div>            
                <button type="submit" className="bg-blue-600 text-white font-bold px-3 py-2 rounded-full">Registrati</button>
            </Form>
            
            )}
        </Formik>
    )
}

export default RegisterForm;
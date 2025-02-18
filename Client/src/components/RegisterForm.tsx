import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import axios from "../api/axios";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";


interface Values {
    username: string,
    email: string,
    nome: string,
    cognome: string,
    password: string,
    confirmPassword: string,
    image: File | null
}

const RegisterSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    nome: Yup.string().required("Name is required"),
    cognome: Yup.string().required("Surname is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().min(5, "Password must contain 5 characters minimum").max(20, "Password must contain 20 characters maximum").required("Password is required").matches(/^[a-zA-Z0-9._@!?-]+$/, "Special character invalid"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Passwords must match")
        .required("Confirm password is required"),
    image: Yup.mixed<File>()
        .nullable()
        .test("fileSize", "File is too large (max 2MB)", (value) => {
          return value ? value.size <= 2 * 1024 * 1024 : true;
        })
        .test("fileType", "Unsupported file format", (value) => {
          return value
            ? ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
            : true;
        })
})

function RegisterForm() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleSubmit = async (values: Values) => {
        if (values.email && values.password && values.confirmPassword && values.nome && values.cognome && values.username && values.image) {
            try {
                const formData = new FormData();
                formData.append("username", values.username);
                formData.append("password", values.password);
                formData.append("nome", values.nome);
                formData.append("cognome", values.cognome);
                formData.append("email", values.email);
                formData.append("callback", "http://localhost:5173/verify");
                formData.append("image", values.image); // appending the image file

                // Sending FormData as multipart/form-data
                const { data } = await axios.post("/auth/register/cliente", formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                });

                console.log("Risposta dal server:", data);
                setImagePreview(null);

            } catch (error: any) {
                console.error("Errore completo:", error);
            
                if (error.response) {
                    console.error("Errore durante la registrazione:", error.response.status, error.response.data);
                    alert(`Errore: ${error.response.data.message || 'Errore sconosciuto'}`);
                } else if (error.request) {
                    console.error("Nessuna risposta dal server:", error.request);
                    alert("Errore: Nessuna risposta dal server.");
                } else {
                    console.error("Errore durante la richiesta:", error.message);
                    alert("Errore durante la richiesta: " + error.message);
                }
            }            
            
        }
    };
    

    return (
        <Formik initialValues={{ email: "", password: "", confirmPassword: "", username: "", nome: "", cognome: "", image: null as File | null }} validationSchema={RegisterSchema} onSubmit={handleSubmit}>
            {({errors, touched, setFieldValue, values}) => {
                const onDrop = useCallback((acceptedFiles: File[]) => {
                    const file = acceptedFiles[0];

                    if (file) {
                        setFieldValue("image", file); 
                        setImagePreview(URL.createObjectURL(file));
                    }
                }, [setFieldValue]);

                const { getRootProps, getInputProps, isDragActive } = useDropzone({
                    onDrop,
                    accept: { "image/*": [] },
                    maxSize: 2 * 1024 * 1024,
                    multiple: false
                });


            return (
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
                <div className="flex flex-col items-center">
                        <div
                            {...getRootProps()}
                                className="w-24 h-24 border-2 border-gray-400 rounded-full flex items-center justify-center text-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition p-2"
                            >
                            <input {...getInputProps()} />
                            {imagePreview ? (
                                <img src={imagePreview} alt="Anteprima" className="w-full h-full object-cover rounded-full" />
                            ) : isDragActive ? (
                                <p className="text-gray-600 text-sm">Rilascia l'immagine qui...</p>
                            ) : (
                                <p className="text-gray-600 text-sm">Aggiungi l'immagine del profilo</p>
                            )}
                        </div>
                        {values.image && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFieldValue("image", null);
                                        setImagePreview(null);
                                    }}
                                    className="bg-red-500 text-white px-3 py-1 mt-2 rounded-md text-sm hover:bg-red-600"
                                >
                                    Rimuovi immagine
                                </button>
                            )}

                            {/* Errori immagine */}
                            <ErrorMessage name="image" component="div" className="error-message" />
                </div>          
                <button type="submit" className="bg-blue-600 text-white font-bold px-3 py-2 rounded-full">Registrati</button>
            </Form>
            
            );
        }}
        </Formik>
    )
}

export default RegisterForm;
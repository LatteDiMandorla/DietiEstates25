import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';

interface Values {
    email: string,
    password: string
}

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().min(5, "Password must contain 5 characters minimum").max(20, "Password must contain 20 characters maximum").required("Password is required").matches(/^[a-zA-Z0-9._@!?-]+$/, "Special character invalid"),
})

function LoginForm() {

    const handleSubmit = (values: Values, {resetForm} : FormikHelpers<Values>) => {
        resetForm();
    }

    return (
        <Formik initialValues={{email: "", password: ""}} validationSchema={LoginSchema} onSubmit={handleSubmit}>
            {({errors, touched}) => (
            <Form className="flex flex-col justify-center items-center space-y-3">
                <p className="font-bold text-2xl" >Login</p>
                <div className="flex flex-col items-center">
                        <Field name="email" maxLength="15" placeholder="Email..." className={"bg-gray-200 hover:bg-gray-300 rounded-full ml-2 w-48 px-2 h-10 " + ((errors.email && touched.email) ? "border border-red-500" : (touched.email && "border border-green-500"))} />
                        <ErrorMessage name="email">{msg => <div className="text-xs text-center text-red-500 w-56">{msg}</div>}</ErrorMessage>
                </div>                
                <div className="flex flex-col items-center">
                        <Field name="password" maxLength="15" type="password" placeholder="Password..." className={"bg-gray-200 hover:bg-gray-300 rounded-full ml-2 w-48 px-2 h-10 " + ((errors.password && touched.password) ? "border border-red-500" : (touched.password && "border border-green-500"))} />
                        <ErrorMessage name="password">{msg => <div className="text-xs text-center text-red-500 w-56">{msg}</div>}</ErrorMessage>
                </div>                
                <button type="submit" className="bg-blue-600 text-white font-bold px-3 py-2 rounded-full">Accedi</button>
            </Form>
            )}
        </Formik>
    )
}

export default LoginForm;
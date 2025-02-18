import { ImageType } from "react-images-uploading";
import { PicturesSlideshowUploader } from "../components/PicturesSlideshowUploader";
import { useStepForm } from "../hooks/useStepForm"
import { InformationTopBar } from "./ImmobilePage"
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from 'yup';

interface Values {
    images: ImageType[],
    description: string,
    efficienza: string,
}

const DetailSchema = Yup.object().shape({
    description: Yup.string().required("Inserisci una descrizione"),
    efficienza: Yup.string(),
    image: Yup.mixed<ImageType[]>()
})

export const ThirdStep = () => {
    const {values} = useStepForm();
    return (
        <>
            {values?.[1] && <InformationTopBar {...{...values[1], street: (values[1].street)}} />}
            <DetailBox />
        </>)
}

const DetailBox = () => {

    const handleSubmit = (values: Values, { resetForm }: FormikHelpers<Values>) => {
        console.log(values);
        resetForm();
    }

    const { formikRefs } = useStepForm();
    return (
        <Formik initialValues={{ description: "", efficienza: "", images: [] }} validationSchema={DetailSchema} onSubmit={handleSubmit as any} innerRef={(ref) => formikRefs.current[2] = ref}>
            {({ values, errors, touched, setFieldValue }) => (
                <Form className='p-2 flex gap-2 w-full justify-between items-center space-x-8 overflow-scroll no-scrollbar'>
                    <div className='flex-1 flex flex-col space-y-4'>
                        <div className='flex flex-col gap-6 bg-white shadow-md px-2 py-6 rounded-md'>
                            <div className="flex w-full">
                                <div className="flex flex-col justify-between w-full">
                                    <label className=''>Efficienza Energetica</label>
                                    <Field name="images" >
                                    {() => (
                                        <PicturesSlideshowUploader images={values.images} setFiles={(files) => setFieldValue("images", files)} />
                                    )}
                                    </Field>
                                    <ErrorMessage name="images">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2">{msg}</div>}</ErrorMessage>
                                </div>
                            </div>
                            <div className="flex w-full">
                                <div className="flex flex-col justify-between relative w-full">
                                    <label className=''>Descrizione</label>
                                    <Field name="description" as="textarea" maxLength="500" placeholder="Descrizione" className={"border border-gray-300 hover:bg-gray-200 rounded-md ml-2 w-full resize-none px-2 h-24 transition-all duration-75 " + ((errors.description && touched.description) ? "border border-red-500 animate-shake" : (touched.description && "border border-green-500"))} />
                                    {values.description && <p>{values.description.length}/500</p>}
                                    <ErrorMessage name="description">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2">{msg}</div>}</ErrorMessage>
                                </div>
                            </div>
                            <div className="flex w-full">
                                <div className="flex flex-col justify-between relative w-full">
                                    <label className=''>Efficienza Energetica</label>
                                    <Field name="efficienza" type="range" step={1} min={0} max={6} className={"border border-gray-300 hover:bg-gray-200 rounded-md w-full transition-all duration-75 " + ((errors.description && touched.description) ? "border border-red-500 animate-shake" : (touched.description && "border border-green-500"))} />
                                    <div id="letterDisplay">
                                        {String.fromCharCode(65 + parseInt(values.efficienza))}
                                    </div>
                                    <ErrorMessage name="efficienza">{msg => <div className="text-xs text-red-500 absolute top-full mt-1 ml-2">{msg}</div>}</ErrorMessage>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
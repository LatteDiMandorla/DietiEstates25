import affitto from '../assets/AffittoPicture.png'
import vendita from '../assets/VenditaPicture.png'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useStepForm } from '../hooks/useStepForm';

interface FormValues {
    option: string;
}

const validationSchema = Yup.object().shape({
    option: Yup.string().required('Seleziona un’opzione tra Vendita o Affitto'),
});

const FirstStep = () => {
    const {formikRefs} = useStepForm();
    return (
        <Formik<FormValues>
            initialValues={{ option: '' }}
            validationSchema={validationSchema}
            innerRef={(ref) => formikRefs.current[0] = ref}
            onSubmit={() => {}}
        >
            {({ values, setFieldValue }) => (
                <Form className="w-full overflow-hidden h-full flex flex-col">
                    <div className='h-10'><ErrorMessage name="option">{msg => <div className="text-red-500 w-full flex justify-center items-center">{msg}</div>}</ErrorMessage></div>
                    <Field name="option">
                        {() => <div className="w-full overflow-hidden flex flex-1 justify-evenly p-6">
                            <button
                                type="button"
                                onClick={() => {console.log(values);setFieldValue('option', 'vendita')}}
                                className={`relative flex-1 bg-[#DDF5FF] flex justify-center items-center overflow-hidden rounded-lg shadow-lg hover:shadow-xl hover:scale-95 transition-all duration-300 hover:bg-blue-300
                                ${values.option === 'vendita' ? 'scale-95 bg-blue-300' : ''}`}
                            >
                                <div className="absolute flex items-center justify-center text-blue-900 text-xl font-bold bg-white px-4 py-2 z-20 w-full h-14">
                                    Vendita
                                </div>
                                <img src={vendita} className="h-full w-full object-cover opacity-50 border" alt="Vendita" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setFieldValue('option', 'affitto')}
                                className={`relative flex-1 bg-[#DDF5FF] flex justify-center items-center overflow-hidden rounded-lg shadow-lg hover:shadow-xl hover:scale-95 transition-all duration-300 hover:bg-blue-300
                                ${values.option === 'affitto' ? 'scale-95 bg-blue-300' : ''}`}
                            >
                                <div className="absolute flex items-center justify-center text-blue-900 text-xl font-bold bg-white px-4 py-2 z-20 w-full h-14">
                                    Affitto
                                </div>
                                <img src={affitto} className="h-full w-full object-cover opacity-50 border" alt="Affitto" />
                            </button>
                        </div>}
                    </Field>
                </Form>
            )}
        </Formik>
    );
}

export default FirstStep;
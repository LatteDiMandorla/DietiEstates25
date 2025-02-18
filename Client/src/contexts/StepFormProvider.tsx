// StepContext.tsx
import { createContext, useEffect, useRef, useState } from 'react';
import { FormikProps } from 'formik';
import useRangeCounter from '../hooks/useRangeCounter';

type FormikRef = FormikProps<any> | null;

interface StepContextType {
    step: number;
    goToPrevStep: () => void;
    formikRefs: React.MutableRefObject<Record<number, FormikRef>>;
    goToNextStep: () => Promise<void>;
    values: any;
}

export const StepContext = createContext<StepContextType | undefined>(undefined);

function StepFormProvider({ children, steps }: { children: React.ReactNode, steps: number }) {
    const { counter: step, prev, next } = useRangeCounter(steps);
    const [values, setValues] = useState<any>([]);
    const formikRefs = useRef<Record<number, FormikRef>>({});

    const goToNextStep = async () => {
        const currentFormik = formikRefs.current[step];
        if (currentFormik) {
            const errors = await currentFormik.validateForm(); // Valida il form
            currentFormik.setTouched(
                Object.fromEntries(Object.keys(errors).map(key => [key, true])) // Segna tutti i campi come "toccati"
            );
    
            if (Object.keys(errors).length === 0) {
                setValues((prev: any) => ({...prev, [step]: currentFormik.values}));
                next(); // Vai allo step successivo solo se non ci sono errori
            } else {
                console.error(`Errore di validazione nello step ${step}`, errors);
            }
        }
    };

    useEffect(() => {
        const currentFormik = formikRefs.current[step];
        console.log(values);
        if (currentFormik && (values as any)[step]) {
            currentFormik.setValues((values as any)[step]);
        } 
    }, [step])

    const goToPrevStep = () => {
        const currentFormik = formikRefs.current[step];
        if (currentFormik) {
            setValues((prev: any) => ({...prev, [step]: currentFormik.values}));
        } 
        prev();
    }

    return (
        <StepContext.Provider value={{ step, formikRefs, goToPrevStep, goToNextStep, values }}>
            {children}
        </StepContext.Provider>
    );
}

export default StepFormProvider;
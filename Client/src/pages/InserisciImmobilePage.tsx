import imageCompression from 'browser-image-compression';
import { useEffect, useState } from 'react';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from 'react-icons/fa';
import FirstStep from './FirstStep';
import { SecondStep } from './SecondStep';
import StepFormProvider from '../contexts/StepFormProvider';
import { useStepForm } from '../hooks/useStepForm';
import { ThirdStep } from './TerzoStep';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Immobile } from '../Interfaces/interfaces';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const InserisciImmobilePage = () => {
    return (
        <StepFormProvider steps={3}>
            <div className="flex-1 overflow-hidden flex flex-col items-center border bg-white">
                {    /* Header*/}
                <Header />
                {/* Step indicator */}
                <Body />
            </div>
        </StepFormProvider>
    );
};

const Header = () => {
    const {goToPrevStep, goToNextStep} = useStepForm();
    return (
        <>
            <header className="py-4 shadow-md w-full overflow-scroll no-scrollbar">
                <div className="flex justify-between items-center w-full px-3">
                    <button onClick={goToPrevStep}
                        className="text-blue-950 text-opacity-80 font-mono flex flex-row items-start justify-start hover:scale-90 transition-transform">
                        <FaArrowAltCircleLeft className='mt-1 text-xl text-blue-800'> </FaArrowAltCircleLeft>
                        <span className="text-xl ml-2 underline font-mono"> Indietro</span>
                    </button>
                    <span className="text-blue-950 text-opacity-65 font-bold text-xl text-center">
                        È un locale in vendita o in affitto?
                    </span>
                    <button onClick={goToNextStep}
                        className="text-blue-950 text-opacity-80 font-mono flex flex-row items-start justify-start hover:scale-90 transition-transform disabled:text-gray-400 disabled:scale-100 group">
                        <span className="text-xl mr-2 underline font-mono"> Avanti</span>
                        <FaArrowAltCircleRight className='mt-1 text-xl text-blue-800 group-disabled:text-gray-400'> </FaArrowAltCircleRight>
                    </button>

                </div>
            </header>
        </>
    )
}

const Body = () => {
    const {step, values} = useStepForm();

    useEffect(() => {
        console.log(values);
    }, [values])
    return (
        step == 0 ? <FirstStep /> :
        step == 1 ? <SecondStep /> :
        step == 2 ? <ThirdStep /> :
        <FormSubmitter />
    )
}

const FormSubmitter = () => {
    const {values} = useStepForm();
    const axios = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {  
        const submit = async () => {
            if(values && !isLoading) {
                setIsLoading(true);
                let immobile: Immobile;
                immobile = {...values[1], ...values[0], ...values[2]};
                console.log(immobile);
                const formData = new FormData();
                for (const [key, value] of Object.entries(immobile)) {
                    formData.append(key, value);
                }
                for(const image of values[2].images){
                    console.log(image.file);
                    const options = {
                        maxSizeMB: 4,
                    }

                    let compressedFile: File;
                    if(image?.file?.size >= 4 * 1024 * 1024){
                        compressedFile = await imageCompression(image.file, options);
                    } else {
                        compressedFile = image?.file;
                    }
                    formData.append('files', compressedFile);
                }
                console.log(formData.values());
                // Sending FormData as multipart/form-data
                toast.promise(axios.post("/immobile", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }), {success: "Immobile aggiunto correttamente", pending: "Aggiunta in corso, attendere", error: "Errore nell'aggiunta, riprovare"});
                navigate("/home");
                setIsLoading(false);
            }
        }

        submit();
    }, []);

    return null;
}
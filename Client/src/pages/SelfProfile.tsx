import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ImageUploading, { ImageType } from 'react-images-uploading';
import { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import ChangeClienteInfoForm from "../components/ChangeClienteInfoForm";
import ChangeAgenteInfoForm from "../components/ChangeAgenteInfoForm";
import PrenotazioniPage from "./PrenotazioniPage";


export const SelfProfilePage = () => {
    const {auth, setAuth} = useAuth();
    const axios = useAxiosPrivate();
    const navigate = useNavigate();
    const [images, setImages] = useState<ImageType[]>([]);

    const logout = async () => {
        try {
            await axios.get("/auth/logout");
        } catch (error) {
            console.log(error)
        } finally {
            setAuth(undefined);
            navigate("/login");
        }
    }

    useEffect(() => {
        const updateImage = async () => {
            if(images && images.length && images[0].file){
                try{
                    const formData = new FormData();
                    formData.append('image', images[0].file);
                    console.log(formData);
                    if(auth?.ruolo == "AGENTE"){
                        await axios.post("/agente/image", formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        });
                    } else {
                        await axios.post("/utente/image", formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        updateImage();
    }, [images])

    return (
        auth && auth.accessToken &&
        <div className="w-full flex-1 bg-[#FAFAFA] p-2 flex flex-col space-y-3 items-center overflow-y-scroll no-scrollbar">
            <p className="font-bold text-2xl w-fit">Ciao {auth.nome}!</p>
            <div className="bg-white shadow-md rounded-xl w-fit p-4 flex flex-col items-center">
                <p className="font-semibold text-xl">Informazioni Profilo</p>
                <div className="flex space-x-2">
                    <div className="w-40 flex pt-4">
                        <div>
                            <ImageUploading value={images} onChange={(i) => setImages(i)}>
                                {({onImageUpload}) => 
                                <div onClick={onImageUpload} className="w-28 h-28 bg-gray-300 relative rounded-sm">
                                    <div className='absolute inset-0 bg-white/15 z-50 backdrop-blur-sm flex justify-center items-center hover:opacity-100 opacity-0 transition-all'><BiImageAdd size={32} /></div>
                                    {auth.image && <img className="object-contver w-full h-full" src={(images[0]?.dataURL) ? images[0].dataURL : auth.image} />}
                                </div>}
                            </ImageUploading>
                        </div>
                    </div>
                    <div>
                        {auth.ruolo == "CLIENTE" ? <ChangeClienteInfoForm nome={auth.nome || ""} cognome={auth.cognome || ""} /> : <ChangeAgenteInfoForm nome={auth.nome || ""} cognome={auth.cognome || ""} biografia={auth.biografia || ""}/>}
                    </div>
                </div>
                <button onClick={logout} className="bg-red-500 mt-2 text-white rounded-full px-2 py-1">Logout</button>
            </div>
            <div className="w-full">
                <PrenotazioniPage />
            </div>
        </div>
    )
}
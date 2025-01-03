import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Immobile } from "../Interfaces/interfaces";
import { Immobili } from "../immobili";
import { HouseCard } from "../components/house_card";
import MapComponent from "../components/MapComponent";

const SearchPage = () => {
    const {query} = useParams();
    const [immobili, setImmobili] = useState<Immobile[]>();

    useEffect(() => {
        setImmobili(Immobili)
    }, [query])

    return (
        <div className="h-full w-full flex bg-[#FAFAFA] overflow-hidden py-2">
            <div className="h-full overflow-y-scroll flex-1 border-r border-gray-300 no-scrollbar px-6">
                <div className="flex flex-col space-y-3 p-3 items-center">
                    {immobili?.map((imm, index) => <HouseCard key={index} {...imm} />)}
                </div>
            </div>
            <div className="flex-1 hidden flex-col items-center justify-end space-y-2  lg:flex">
                <div className="bg-white shadow-md rounded-lg w-11/12 flex-1 flex flex-col p-4 ">

                </div>
                <MapComponent className="shadow-sm" />
            </div>
        </div>
    )
}

export default SearchPage;
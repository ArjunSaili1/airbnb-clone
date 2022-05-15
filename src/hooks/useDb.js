import { useContext } from "react";
import DatabaseContext from "../contexts/database/DatabaseContext";

export default function useDb(){
    const context = useContext(DatabaseContext)

    if(!context){
        throw new Error("useDb should be inside DatabaseProvider")
    }

    return context
}

import { useReducer } from "react";

function formatErrorMsg(error){
    const errorWords = error.replace(/(.*?[/])/, "").replace(/[-]+/g, ' ').split(" ");
    return errorWords.map((word)=>{
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
}

function statusReducer(status, action){
    switch (action.type){
      case "form_submit" : {
        return {success: false, loading: true, error: null}
      }
      case "auth_success" : {
        return {success: true, loading: false, error: null}
      }
      case "error" : {
        console.log(action.code)
        if(action.code){
            return {success: false, loading: false, error: formatErrorMsg(action.code)}
        }
        else {
            return {success: false, loading: false, error: action.errorText}
        }
      }
      case "error_reset": {
        return {...status, error: null}
      }
      default : {
        throw Error('Unknown Action: ' + action.type)
      }
    }
}

export default function useAccount(){
    const initialStatus = {error: null, success: false, loading: false}
    const [status, dispatch] = useReducer(statusReducer, initialStatus)
    const {loading, success, error} = status

    function statusUpdate({type, code=null, errorText=null}){
        dispatch({type: type, code: code, errorText: errorText})
    }

    return {loading, success, error, statusUpdate}
}
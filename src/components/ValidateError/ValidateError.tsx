import { errorMessage } from "./ValidateError.style";

type Props = {
    message:string;
}

export default function ValidateError({message} :Props){
    
    return (
        <div style={errorMessage}>
            ⚠ {message}
        </div>
    )
}
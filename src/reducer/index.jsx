import { useReducer, useEffect } from "react";
import { sleep } from "@/utils";
import { initialState } from "./state";

const SECURITY_CODE = 'paradigma';

const reducerObject = (state, payload) => ({
    "ERROR": {
        ...state,
        error: true,
        loading: false,
        confirmed: false,
        deleted: false,
    },
    "CHECK": {
        ...state,
        loading: true
    },
    "CONFIRM": {
        ...state,
        error: false,
        loading: true,
        confirmed: true,
    },
    "DELETE": {
        ...state,
        deleted: true,
    },
    "RESET": {
        ...state,
        loading: false,
        confirmed: false,
        deleted: false,
        value: "",
    },
    "WRITE" : {
        ...state,
        value: payload
    }
});

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
}

export const UseReducer = ({ name }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const verify = () => {
        const valid = state.value === SECURITY_CODE;
        console.log("valid: ", valid);
        if(valid){
            dispatch({type: "CONFIRM"});
        }else {
            dispatch({type: "ERROR"})
        }
        // setState({...state, error: error, loading: false, confirmed: !error})
    }

    useEffect(() => {
        const fetching = async () => {
            console.log("Iniciando validación - reducer");
            await sleep(1000);
            verify();
            console.log("Terminando validación - reducer");
        }
        if(!!state.loading){
            fetching();
        }
    }, [state.loading]);

    if(!state.deleted && !state.confirmed){
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {(state.error && !state.loading) && <p>Error: el código es incorrecto.</p>}
                {state.loading && <p>Cargando...</p>}
                <input 
                    placeholder="Código de Seguridad" 
                    defaultValue={state.value}
                    onChange={(e) => dispatch({ type: "WRITE", payload: e.target.value })}    
                />
                <button onClick={() => dispatch({ type: "CHECK" })}>Comprobar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted){
        return(
            <>
            <p>¿Estás seguro?</p>
            <button
                onClick={() => dispatch({ type: "DELETE" })}
            >
                Sí, eliminar
            </button>
            <button
                onClick={() => dispatch({ type: "RESET" })}
            >
                No, me arrepentí
            </button>
            </>
        )
    }else{
        return(
            <>
            <p>Elimado con éxito</p>
            <button
                onClick={() => dispatch({ type: "RESET" })}
            >
                Resetear, volver atrás
            </button>
            </>
        )
    }    
}
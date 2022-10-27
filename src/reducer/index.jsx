import { useReducer, useEffect } from "react";
import { sleep } from "@/utils";
import { initialState } from "./state";

const SECURITY_CODE = 'paradigma';

const actionTypes = {
    ERROR: "ERROR",
    CHECK: "CHECK",
    CONFIRM: "CONFIRM",
    DELETE: "DELETE",
    RESET: "RESET",
    WRITE: "WRITE",
}

const reducerObject = (state, payload) => ({
    [actionTypes.ERROR]: {
        ...state,
        error: true,
        loading: false,
        confirmed: false,
        deleted: false,
    },
    [actionTypes.CHECK]: {
        ...state,
        loading: true
    },
    [actionTypes.CONFIRM]: {
        ...state,
        error: false,
        loading: true,
        confirmed: true,
    },
    [actionTypes.DELETE]: {
        ...state,
        deleted: true,
    },
    [actionTypes.RESET]: {
        ...state,
        loading: false,
        confirmed: false,
        deleted: false,
        value: "",
    },
    [actionTypes.WRITE] : {
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

    const onConfirm = () => dispatch({ type: actionTypes.CONFIRM});
    const onError = () => dispatch({ type: actionTypes.ERROR });
    const onWrite = (event) => dispatch({ type: actionTypes.WRITE, payload: event.target.value});
    const onCheck = () => dispatch({ type: actionTypes.CHECK });
    const onDelete = () => dispatch({ type: actionTypes.DELETE });
    const onReset = () => dispatch({ type: actionTypes.RESET });
    

    const verify = () => {
        const valid = state.value === SECURITY_CODE;
        console.log("valid: ", valid);
        if(valid){
            onConfirm();
        }else {
            onError();
        }
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
                    onChange={onWrite}    
                />
                <button onClick={onCheck}>Comprobar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted){
        return(
            <>
            <p>¿Estás seguro?</p>
            <button
                onClick={onDelete}
            >
                Sí, eliminar
            </button>
            <button
                onClick={onReset}
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
                onClick={onReset}
            >
                Resetear, volver atrás
            </button>
            </>
        )
    }    
}
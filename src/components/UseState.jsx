import { useState, useEffect } from "react";
import { sleep } from "@/utils";


const SECURITY_CODE = 'paradigma';


export const UseState = ({ name }) => {
    const [state, setState] = useState({
        value: "",
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });

    const verify = () => {
        const error = state.value !== SECURITY_CODE;
        setState({...state, error: error, loading: false, confirmed: !error})
    }

    const onWrite = (e) => {
        setState({...state, value: e.target.value})
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true,
            error: false,
        })
    }

    const onDelete = () => {
        setState({...state, deleted: true, });
    }

    const onReset = () => {
        setState({...state, value: "", deleted: false,  confirmed: false });
    }


    useEffect(() => {
        const fetching = async () => {
            console.log("Iniciando validación");
            await sleep(1000);
            verify();
            console.log("Terminando validación");
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
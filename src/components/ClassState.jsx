import React from "react";
import { sleep } from "@/utils";


const SECURITY_CODE = 'paradigma';

export class ClassState extends React.Component {
    constructor(){
        super();
        this.state = {
            value: "",
            error: false,
            loading: false,
            confirmed: false,
        };
    }
    fetching = async () => {
        console.log("Iniciando validación - class");
        await sleep(1000);
        const error = this.state.value !== SECURITY_CODE;
        this.setState({loading: false, error: error, confirmed: !error});
        console.log("Terminando validación - class");
    }


    componentDidUpdate() {
        if(!! this.state.loading ){
            this.fetching();
        }
    }

    render(){
        const { name } = this.props;
        const { error, loading, value } = this.state;
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {(error && !loading) && <p>Error: el código es incorrecto.</p>}
                {loading && <p>Cargando...</p>}
                <input 
                    onChange={(e) => {this.setState(prev => ({value: e.target.value}))}}
                    placeholder="Código de Seguridad" 
                />
                <button 
                    onClick={() => this.setState(prev => ({loading: !prev.loading}))}
                >Comprobar</button>
            </div>
        )
    }
}
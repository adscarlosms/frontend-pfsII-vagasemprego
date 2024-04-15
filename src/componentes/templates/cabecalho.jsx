// import { ContextoUsuario } from "../contexto/Contexto";
// import { useContext } from "react";
import { Container } from "react-bootstrap";

export default function Cabecalho(props){

    return (
        <div>
             <Container className="w-100 bg-dark border d-flex justify-content-center align-content-center">
             <h1 className="text-light">{props?.texto}</h1>             
             </Container>
             <div className="justify-content-center align-items-center d-flex "></div>
            
        </div>
    );
}
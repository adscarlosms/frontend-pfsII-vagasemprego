import Cabecalho from "./cabecalho";
import Menu from "./menu";

export default function Pagina(props) {
    return (
        <div>
            <Cabecalho texto="Encontre sua Vaga Tech!" />
            <Menu />
            <div className="container">
                {props.children}
            </div>
           
        </div>
    )
}
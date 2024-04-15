import TelaMenu from './componentes/telas/telaMenu';
import Tela404 from "./componentes/telas/tela404";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import TelaLogin from "./componentes/telas/telaLogin";
//import { useState } from "react";
//import { ContextoUsuario } from "./componentes/contexto/Contexto";
import FormCadInscricao from "./componentes/formularios/FormCadInscricao";



function App() {
  // const [usuario, setUsuario] = useState({
  //   nome: "",
  //   logado: false
  // });

  // if (!usuario.logado) {

  //   return <ContextoUsuario.Provider value={[usuario, setUsuario]}>
  //             <TelaLogin />;
  //           </ContextoUsuario.Provider>;
  // }
  // else {
    return (
      <div className="App">
    
          <BrowserRouter>
            <Routes>

              <Route path="/" element={<TelaMenu />} />
              <Route path="/inscricao" element={<FormCadInscricao />} />
              <Route path="*" element={<Tela404 />} />
            </Routes>
          </BrowserRouter>
        
      </div>
    );
  }
//}

export default App;

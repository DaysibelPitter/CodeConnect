import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

import "./ContasExternas.css"
function ContasExternas(){
    return(
        <div className="contasExternas">  
          <div className="outrasContas">
           <hr/>
      <span className="hrTitulo">o entra con otras cuentas</span>
      </div>
        <div className="contas">
        <div className="conta">
                <a href="">{<FaGithub/>}</a>
                <span>Github</span>
                </div>
              <div className="conta"><a href="">{<FaGoogle />}</a>
              <span>Google</span></div>
        </div>
              </div>
    )
}
export default ContasExternas;
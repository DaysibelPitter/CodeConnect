import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import "./ContasExternas.css"
function ContasExternas(){
    return(
        <>
          <div className="contas">
                <div className="conta">
                <a href="">{<FaGithub/>}</a>
                <span>Github</span>
                </div>
              <div className="conta"><a href="">{<FaGoogle />}</a>
              <span>Google</span></div>
              
              </div></>
    )
}
export default ContasExternas;
import "./socialEngagement.css";
import img from "../../../../assets/Perfil_large.png"; 
import { FaComment, FaShare, FaBookmark } from "react-icons/fa";

// Definimos una interfaz para las props
interface SocialEngagementProps {
    usuario: string;
    totalComentarios: string;
    totalCompartidos: string;
    totalSalvos: string;
}

const SocialEngagement: React.FC<SocialEngagementProps> = ({ usuario, totalComentarios, totalCompartidos, totalSalvos }) => {
    return (
        <div className="social-engagement-container">
            <div className="actions-container">
                <div className="action">
                    <FaComment className="icon" />
                    <p>{totalComentarios}</p>
                </div>
                <div className="action">
                    <FaShare className="icon" />
                    <p>{totalCompartidos}</p>
                </div>
                <div className="action">
                    <FaBookmark className="icon" />
                    <p>{totalSalvos}</p>
                </div>
            </div>
            <div className="user-info">
                <div className="user-avatar-container"><img src={img} alt={usuario} className="user-avatar" /></div>
                
                <h1 className="user-name">{usuario}</h1>
            </div>
        </div>
    );
}

export default SocialEngagement;
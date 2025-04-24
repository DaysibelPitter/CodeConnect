import "./Cards.css";
import SocialEngagement from "../SocialEngagement/SocialEngagement";
import img from "../../../../assets/imagenCard.png"; 
function Cards() {
    const cardsData = [
        { usuario: "Carlos", title: "Card 1", description: "Descripción de la primera card.Descripción de la primera card.Descripción de la primera card.Descripción de la primera card.", totalComentarios: "4", totalCompartidos: "26", totalSalvos: "3" },
        { usuario: "Daniel", title: "Card 2", description: "Otra descripción interesante.Descripción de la primera card.Descripción de la primera card.Descripción de la primera card.Descripción de la primera card.", totalComentarios: "40", totalCompartidos: "12", totalSalvos: "43" },
        { usuario: "Carlos", title: "Card 1", description: "Descripción de la primera card.Descripción de la primera card.Descripción de la primera card.Descripción de la primera card.", totalComentarios: "4", totalCompartidos: "26", totalSalvos: "3" },
        { usuario: "Daniel", title: "Card 2", description: "Otra descripción interesante.Descripción de la primera card.Descripción de la primera card.Descripción de la primera card.Descripción de la primera card.", totalComentarios: "40", totalCompartidos: "12", totalSalvos: "43" },
        { usuario: "Carlos", title: "Card 1", description: "Descripción de la primera card.Descripción de la primera card.Descripción de la primera card.Descripción de la primera card.", totalComentarios: "4", totalCompartidos: "26", totalSalvos: "3" },
        { usuario: "Daniel", title: "Card 2", description: "Otra descripción interesante.Descripción de la primera card.Descripción de la primera card.Descripción de la primera card.Descripción de la primera card.", totalComentarios: "40", totalCompartidos: "12", totalSalvos: "43" },
    ];

    return (
        <div className="card-container">
            {cardsData.map((card, index) => (
                <div key={index} className="card">
                    <div className="card-img">
                        <img src={img} alt={card.usuario} /> 
                    </div>
                    <div className="card-content">
                        <div className="card-text">
                            <h1>{card.title}</h1>
                            <p className="card-description">{card.description}</p>   
                        </div>
                        <SocialEngagement 
                            usuario={card.usuario}
                            totalComentarios={card.totalComentarios}
                            totalCompartidos={card.totalCompartidos}
                            totalSalvos={card.totalSalvos}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Cards;
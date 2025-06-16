import NavFeed from "../../components/nav/Nav";
import imgAD from "../../assets/imgSobre.png";
import img2 from "../../assets/imgsobre2.png";
import marca from "../../assets/imgLogo.png";
import "./AcercaDe.css";
function AcercaDe() {
  return (
    <div className="AcercaDe-container">
      <NavFeed/>
      <div className="AcercaDe-content">
        <img src={imgAD} alt="Sobre CodeConnect" />
        <h1>Bienvenido a CodeConnect!</h1>
        <h2>Donde la comunidad y el código se unen!</h2>
        <p>
          En el corazón de la revolución digital está la colaboración. CodeConnect nació con la visión de crear un espacio donde desarrolladores, programadores y entusiastas de la tecnología puedan conectarse, aprender y colaborar de manera inigualable. Somos una comunidad global apasionada por el código y estamos comprometidos a ofrecer un entorno inclusivo e inspirador para todos los niveles de habilidad.
        </p>
        <div className="AcercaDe-mission">
          <div className="AcercaDe-mission-text">
            <h2>Nuestra Misión</h2>
            <p>
             En CodeConnect, creemos que la colaboración es la esencia de la innovación. Nuestra misión es proporcionar una plataforma donde las mentes creativas puedan unirse, compartir conocimiento y desarrollar proyectos extraordinarios. Ya seas un principiante con ganas de aprender o un veterano experimentado, aquí encontrarás un hogar para tus aspiraciones tecnológicas.
            </p>
          </div>

          <div className="AcercaDe-mission-img">
            <img src={img2} alt="Missão CodeConnect" />
          </div>
        </div>

        <div className="AcercaDe-invitacion">
          <h2>¡Únete a Nosotros!</h2>
          <p>
            Estamos emocionados de tenerte con nosotros en este emocionante viaje. Únete a nuestra vibrante comunidad y descubre el poder de la colaboración en el mundo del código.
          </p>
        </div>
        <div></div>
        <div className="AcercaDe-footer">
          <img src={marca} alt="imagen de la marca" />
          <h2 id="footer-title">
            Juntos, transformaremos ideas en innovaciones y moldearemos el futuro digital.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default AcercaDe;

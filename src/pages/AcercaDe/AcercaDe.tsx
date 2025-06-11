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
        <h1>Bem-Vindo ao CodeConnect!</h1>
        <h2>Onde a comunidade e o código se unem!</h2>
        <p>
          No coração da revolução digital está a colaboração. CodeConnect nasceu
          da visão de criar um espaço onde desenvolvedores, programadores e
          entusiastas da tecnologia podem se conectar, aprender e colaborar de
          maneira inigualável. Somos uma comunidade global apaixonada por código
          e estamos comprometidos em oferecer um ambiente inclusivo e inspirador
          para todos os níveis de habilidade.
        </p>
        <div className="AcercaDe-mission">
          <div className="AcercaDe-mission-text">
            <h2>Nossa Missão</h2>
            <p>
              Na CodeConnect, acreditamos que a colaboração é a essência da
              inovação. Nossa missão é fornecer uma plataforma onde os mentes
              criativas podem se unir, compartilhar conhecimento, e desenvolver
              projetos extraordinários. Quer você seja um novato ansioso para
              aprender ou um veterano experiente, você encontrará aqui um lar
              para suas aspirações tecnológicas.
            </p>
          </div>

          <div className="AcercaDe-mission-img">
            <img src={img2} alt="Missão CodeConnect" />
          </div>
        </div>

        <div className="AcercaDe-invitacion">
          <h2>Junte-se a Nós!</h2>
          <p>
            Estamos animados para ter você conosco nesta jornada empolgante.
            Junte-se à nossa comunidade vibrante e descubra o poder da
            colaboração no mundo do código.
          </p>
        </div>
        <div></div>
        <div className="AcercaDe-footer">
          <img src={marca} alt="imagen de la marca" />
          <h2 id="footer-title">
            Juntos, vamos transformar ideias em inovações e moldar o futuro
            digital.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default AcercaDe;

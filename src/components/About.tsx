const About = () => {
  return (
    <section id="sobre" className="py-20 md:py-28 about-section relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-900/8 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col gap-8 md:gap-[60px]">
        <div className="about-title-container">
          <h2
            style={{
              fontFamily: "'Chakra Petch', sans-serif",
              fontWeight: 700,
              fontSize: '36px',
              lineHeight: '100%',
              letterSpacing: '0.04em',
              width: 'auto',
              minWidth: '295px',
              paddingLeft: '20px',
              paddingRight: '20px',
              height: '47px',
              color: '#FFFFFF',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0px 4px 10px 0px #FFFFFF33',
              opacity: 1,
              margin: '0 auto',
            }}
          >
            Sobre o Projeto
          </h2>
        </div>

        {/* Card */}
        <div className="about-card mx-auto">
          <div className="about-text-container">
            <p>
              O Portfólio Colaborativo é um projeto desenvolvido pelos membros
              do{' '}
              <span className="about-text-highlight">
                squad Guardiões da Galáxia, da comunidade Frontend Fusion.
              </span>
            </p>

            <p>
              O projeto simula um ambiente real de desenvolvimento em equipe,
              onde os participantes colaboram para construir uma aplicação do
              início ao fim, aplicando boas práticas e vivenciando desafios
              próximos ao mercado.
            </p>

            <p>
              A proposta é transformar colaboração em experiência prática,
              gerando evolução técnica e um portfólio mais sólido para cada
              integrante.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

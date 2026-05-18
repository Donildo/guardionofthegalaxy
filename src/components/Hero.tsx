import heroImg from '../assets/guardioes.png';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
      </div>

      {/* Centering wrapper for max-width 1440px to align perfectly with header on all screens */}
      <div className="relative w-full max-w-[1440px] mx-auto min-h-screen lg:min-h-full lg:h-full z-10">
        <div className="hero-content-container">
          {/* Tag */}
          <div
            className="flex items-center text-white uppercase backdrop-blur-sm animate-fade-in-down"
            style={{
              fontFamily: 'Inter, sans-serif',
              width: '305px',
              height: '43px',
              paddingTop: '12px',
              paddingRight: '24px',
              paddingBottom: '12px',
              paddingLeft: '24px',
              gap: '12px',
              borderRadius: '999px',
              border: '1px solid #FFFFFF1A',
              background: '#1707484D',
              opacity: 1,
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#d946ef] shadow-[0_0_10px_#d946ef,0_0_20px_#d946ef50] flex-shrink-0"></span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '100%',
                color: '#FFFFFF',
                textAlign: 'center',
                letterSpacing: '0em',
                display: 'inline-block',
                whiteSpace: 'nowrap',
                opacity: 1,
              }}
            >
              PORTFÓLIO COLABORATIVO
            </span>
          </div>

          {/* Title */}
          <h1
            className="drop-shadow-2xl animate-fade-in-down"
            style={{
              fontFamily: "'Economica', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(40px, 8vw, 70px)',
              lineHeight: '100%',
              letterSpacing: '0.05em',
              maxWidth: '733px',
              color: '#FFFFFF',
              opacity: 1,
            }}
          >
            Seu talento merece espaço <br /> nessa galáxia!
          </h1>

          <p
            className="text-gray-300 animate-fade-in-up"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(16px, 2vw, 22px)',
              lineHeight: '30px',
              letterSpacing: '0.1em',
              maxWidth: '579px',
              width: '100%',
              opacity: 1,
            }}
          >
            Conecte-se com oportunidades reais, construa um portfólio e seja
            reconhecido.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in-up">
            <button
              onClick={() => scrollToSection('cadastro')}
              className="hero-button"
            >
              <span
                style={{
                  fontFamily: "'Chakra Petch', sans-serif",
                  fontWeight: 700,
                  fontSize: '20px',
                  lineHeight: '100%',
                  letterSpacing: '0.04em',
                  textAlign: 'center',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  opacity: 1,
                }}
              >
                Inscreva-se
              </span>
            </button>

            <button
              onClick={() => scrollToSection('membros')}
              className="hero-button"
            >
              <span
                style={{
                  fontFamily: "'Chakra Petch', sans-serif",
                  fontWeight: 700,
                  fontSize: '20px',
                  lineHeight: '100%',
                  letterSpacing: '0.04em',
                  textAlign: 'center',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  opacity: 1,
                }}
              >
                Conheça nosso time
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

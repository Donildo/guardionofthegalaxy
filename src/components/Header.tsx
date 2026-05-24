import raioImg from '../assets/raio 5.png';

const Header = () => {
  return (
    <header className="main-header">
      <div className="w-full flex items-center gap-4 relative">
        {/* Purple Ray/Lightning on the side of the logo */}
        <img
          src={raioImg}
          alt="Ray effect"
          className="w-12 h-12 object-contain opacity-85 pointer-events-none mix-blend-screen animate-pulse"
        />

        <div className="flex flex-col leading-tight pt-1 relative z-10">
          <span
            className="text-[9px] font-bold text-[#b24fff] uppercase tracking-[0.3em] mb-0.5"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            SQUAD
          </span>
          <span
            className="text-xl font-bold text-white tracking-tight leading-none"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Guardiões
          </span>
          <span
            className="text-[12px] text-white/80 font-normal leading-none mt-0.5"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            da galáxia
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;

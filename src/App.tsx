import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <About />
      </main>

      <footer
        className="py-10 border-t border-white/5 bg-black text-center text-gray-600 text-[13px]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <p>
          &copy; {new Date().getFullYear()} Guardiões da Galáxia. Todos os
          direitos reservados.
        </p>
      </footer>
    </div>
  );
}

export default App;

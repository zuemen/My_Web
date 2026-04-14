import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import News from '@/components/News';
import Experience from '@/components/Experience';
import Philosophy from '@/components/Philosophy';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background Grid Pattern */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          zIndex: -2
        }}
      />
      
      <Navbar />
      <Hero />
      <News />
      <Experience />
      <Philosophy />
      <Skills />
      <Projects />
      <Contact />
      
      <footer style={{ 
        padding: '60px 20px', 
        textAlign: 'center', 
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        color: '#444',
        fontSize: '0.9rem'
      }}>
        <p>© 2026 ZUEMEN (朱廷翊). RESEARCHER IN QUANTUM & BLOCKCHAIN.</p>
      </footer>
    </main>
  );
}

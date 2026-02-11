
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Menu, X, ChevronRight, Copy, Check, Quote, Play, 
  Target, Compass, Send, ChevronLeft, Shield, Zap, Users, Globe, Briefcase 
} from 'lucide-react';

// --- THREE.JS COMPONENTS ---
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const BoxGeometry = 'boxGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const Color = 'color' as any;
const AmbientLight = 'ambientLight' as any;
const SpotLight = 'spotLight' as any;
const PointLight = 'pointLight' as any;

const GoldenKeyPiece = ({ position, rotationSpeed = 1, scale = 1 }: { position: [number, number, number], rotationSpeed?: number, scale?: number }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.y = t * 0.2 * rotationSpeed;
      ref.current.rotation.x = t * 0.1 * rotationSpeed;
      ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1;
    }
  });
  return (
    <Group ref={ref} position={position} scale={scale}>
      <Mesh>
        <BoxGeometry args={[1, 1, 1]} />
        <MeshStandardMaterial color="#800020" metalness={0.9} roughness={0.1} emissive="#800020" emissiveIntensity={0.1} />
      </Mesh>
      <Torus args={[0.8, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
         <MeshStandardMaterial color="#800020" metalness={1} roughness={0.1} />
      </Torus>
    </Group>
  );
};

const AbstractScene = () => (
  <div className="absolute inset-0 z-0">
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <Color attach="background" args={['#000000']} />
      <AmbientLight intensity={0.5} />
      <SpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#800020" />
      <PointLight position={[-10, -10, -10]} intensity={0.5} color="#800020" />
      <Environment preset="night" />
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <GoldenKeyPiece position={[2, 0, 0]} scale={1.5} />
      </Float>
    </Canvas>
  </div>
);

// --- UI COMPONENTS ---
const Logo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <svg viewBox="0 0 144 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M84.4 20.2L99.2 81.2H89.4L86.2 68.6H71.8L68.6 81.2H58.8L73.6 20.2H84.4ZM79 59.8L77.6 42.6C77.4 40.2 77.2 37.8 77 35.4H76.8C76.6 37.8 76.4 40.2 76.2 42.6L74.8 59.8H79Z" fill="currentColor"/>
    <circle cx="34" cy="54" r="13" stroke="currentColor" strokeWidth="4"/>
    <rect x="47" y="52" width="56" height="4" fill="currentColor"/>
  </svg>
);

const SectionTitle = ({ subtitle, title, dark = true, centered = false }: { subtitle: string, title: React.ReactNode, dark?: boolean, centered?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
    <motion.div initial={{ opacity: 0, x: centered ? 0 : -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-4">
      {!centered && <div className="w-8 h-[1px] bg-executive-bordeaux"></div>}
      <span className="bg-executive-bordeaux text-white px-3 py-1 text-[10px] font-bold tracking-[0.4em] uppercase">{subtitle}</span>
      {centered && <div className="w-8 h-[1px] bg-executive-bordeaux"></div>}
    </motion.div>
    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`text-3xl md:text-5xl font-bold tracking-tight leading-tight ${dark ? 'text-white' : 'text-black'} ${centered ? 'max-w-2xl' : ''}`}>
      {title}
    </motion.h2>
  </div>
);

// --- SECTIONS ---
const FrameworkSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const codeData = [
    { id: 'C', letter: 'C', name: 'Clarity', subtitle: 'Clareza Estrutural', icon: Target, desc: 'Pensar antes de falar. Estruturar antes de responder.', points: ['Organizar ideias em blocos lógicos', 'Eliminar excesso e ruído', 'Construir raciocínio executivo'], result: 'Mensagens com começo, meio e fim.' },
    { id: 'O', letter: 'O', name: 'Orientation', subtitle: 'Orientação Estratégica', icon: Compass, desc: 'Saber o que dizer, para quem dizer e com qual intenção.', points: ['Ler a sala e hierarquia', 'Ajustar nível de formalidade', 'Escolher abordagem tática'], result: 'A mensagem começa a servir a um objetivo.' },
    { id: 'D', letter: 'D', name: 'Delivery', subtitle: 'Entrega Executiva', icon: Send, desc: 'Como a mensagem é entregue pesa tanto quanto o conteúdo.', points: ['Tom, Ritmo e Pausas', 'Soar calmo sob pressão', 'Encerrar falas com firmeza'], result: 'Comunicação mais segura sob estresse.' },
    { id: 'E', letter: 'E', name: 'Execution', subtitle: 'Execução Real', icon: Play, desc: 'Comunicação só se consolida quando é aplicada.', points: ['Simulações Intensivas', 'Ajustes finos em tempo real', 'Aplicação em e-mails reais'], result: 'O novo padrão vira o seu default.' }
  ];

  return (
    <section id="framework" className="py-40 bg-white text-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <SectionTitle dark={false} subtitle="The Architecture" title="Metodologia C.O.D.E.™" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 h-[400px] relative flex items-center justify-center">
             <div className="absolute w-64 h-64 border border-black/10 rounded-full animate-spin-slow"></div>
             <div className="bg-executive-bordeaux text-white p-8 rounded-full z-10 font-bold text-2xl shadow-2xl">C.O.D.E</div>
             {codeData.map((item, i) => (
                <button key={i} onClick={() => setActiveTab(i)} className={`absolute w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 font-bold ${activeTab === i ? 'bg-executive-bordeaux text-white border-executive-bordeaux scale-125' : 'bg-white text-black border-black/20'}`} style={{ transform: `rotate(${i*90}deg) translate(140px) rotate(-${i*90}deg)` }}>
                  {item.letter}
                </button>
             ))}
          </div>
          <div className="lg:col-span-7 bg-black text-white p-12 rounded-sm relative overflow-hidden min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="text-3xl font-bold uppercase tracking-widest mb-2">{codeData[activeTab].name}</h3>
                <p className="text-executive-bordeaux font-bold text-[10px] tracking-[0.4em] mb-8">{codeData[activeTab].subtitle}</p>
                <p className="text-xl italic mb-10">"{codeData[activeTab].desc}"</p>
                <ul className="space-y-3 mb-8">
                  {codeData[activeTab].points.map((p, i) => (
                    <li key={i} className="flex gap-2 text-sm"><div className="w-1.5 h-1.5 bg-executive-bordeaux mt-1.5 shrink-0"></div> {p}</li>
                  ))}
                </ul>
                <div className="p-4 bg-white/5 border-l-2 border-executive-bordeaux text-sm italic">{codeData[activeTab].result}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    { name: "Ricardo S.", role: "CEO — Global Tech", text: "A mentoria da Alexandra não é sobre inglês, é sobre poder. Aprendi a ocupar espaços em reuniões globais.", mediaUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800' },
    { name: "Marina B.", role: "VP — FinTech NY", text: "O framework C.O.D.E mudou minha forma de reportar ao Board. A precisão traz uma autoridade única.", mediaUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800' }
  ];
  return (
    <section className="py-40 bg-neutral-50 text-black">
      <div className="container mx-auto px-6 md:px-12">
        <SectionTitle dark={false} subtitle="Provas" title="Endossos Estratégicos" centered />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 border border-black/5 rounded-sm hover:shadow-2xl transition-all group overflow-hidden">
              <div className="aspect-video mb-8 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src={t.mediaUrl} className="w-full h-full object-cover" alt={t.name} />
              </div>
              <Quote className="text-executive-bordeaux/20 mb-4" size={32} />
              <p className="text-lg font-bold mb-8">"{t.text}"</p>
              <div className="pt-6 border-t border-black/5">
                <h4 className="text-sm font-bold uppercase tracking-widest">{t.name}</h4>
                <p className="text-executive-bordeaux text-[10px] font-bold uppercase">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-executive-bordeaux selection:text-white">
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/5 py-4' : 'py-10'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <Logo className="h-10 text-white" />
            <div className="flex flex-col">
              <span className="text-xl font-bold uppercase tracking-tighter">A Peça-Chave™</span>
              <span className="text-[8px] font-bold tracking-widest uppercase opacity-60">Alexandra Hurley</span>
            </div>
          </div>
          <div className="hidden md:flex gap-10 text-[10px] font-bold tracking-[0.3em] uppercase">
             <a href="#metodo" onClick={scrollTo('metodo')}>O Problema</a>
             <a href="#framework" onClick={scrollTo('framework')}>Framework</a>
             <a href="#contato" onClick={scrollTo('contato')} className="px-6 py-2 bg-white text-black rounded-sm hover:bg-executive-bordeaux hover:text-white transition-all">Consultar</a>
          </div>
        </div>
      </nav>

      <header className="relative h-screen flex items-center overflow-hidden">
        <AbstractScene />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black z-10" />
        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-4xl">
            <div className="w-12 h-[1px] bg-executive-bordeaux mb-8"></div>
            <h1 className="text-6xl md:text-8xl font-bold leading-none mb-10 tracking-tighter">Onde a fluência se torna <span className="underline decoration-executive-bordeaux decoration-4 underline-offset-8">autoridade.</span></h1>
            <p className="text-xl md:text-2xl font-light mb-12 max-w-2xl opacity-80 leading-relaxed">Advisory de comunicação para líderes que já dominam o idioma, mas buscam precisão estratégica para influenciar decisões no topo.</p>
            <button onClick={scrollTo('contato')} className="px-12 py-6 border border-white/30 hover:bg-white hover:text-black transition-all font-bold uppercase text-[10px] tracking-[0.4em]">Solicitar Mentoria</button>
          </motion.div>
        </div>
      </header>

      <main>
        <section id="metodo" className="py-40 bg-black border-y border-white/5">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
              <SectionTitle subtitle="Diferencial" title="Inglês correto não garante seu lugar na mesa." />
              <div className="space-y-6 text-xl font-light opacity-80">
                <p>No C-Level, falar inglês é apenas a estaca zero. A barreira real não é o vocabulário, mas a <span className="text-executive-bordeaux font-bold">arquitetura da mensagem</span>.</p>
                <p>A Peça-Chave™ transforma sua competência técnica em presença de comando através de uma comunicação desenhada para o alto escalão.</p>
              </div>
            </div>
            <div className="bg-executive-gray p-16 border border-white/10 text-center relative group">
              <div className="absolute -inset-2 border border-executive-bordeaux/30 group-hover:border-executive-bordeaux transition-all duration-700"></div>
              <div className="text-4xl font-light mb-4">Fluência Técnica</div>
              <div className="w-10 h-[1px] bg-executive-bordeaux mx-auto my-6"></div>
              <div className="text-5xl font-bold italic">Influência Estratégica</div>
            </div>
          </div>
        </section>

        <FrameworkSection />
        
        <TestimonialsSection />

        <section id="contato" className="py-60 bg-black text-center relative">
          <div className="container mx-auto px-6">
            <h2 className="text-6xl md:text-9xl font-bold mb-16 tracking-tighter">Domine o <span className="underline decoration-executive-bordeaux underline-offset-[20px]">palco global.</span></h2>
            <button className="px-20 py-8 bg-white text-black font-bold uppercase text-xs tracking-[0.5em] hover:bg-executive-bordeaux hover:text-white transition-all shadow-2xl">Agendar Diagnóstico</button>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center">
         <Logo className="h-8 mx-auto mb-6 opacity-40" />
         <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">© {new Date().getFullYear()} A Peça-Chave™ — Alexandra Hurley</p>
      </footer>
    </div>
  );
};

// --- RENDER ---
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);


import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Menu, X, ChevronRight, Copy, Check, Quote, Play, 
  Target, Compass, Send, Shield, Zap, Users, Globe, Briefcase 
} from 'lucide-react';

// --- ELEMENTOS INTRÍNSECOS THREE.JS ---
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const BoxGeometry = 'boxGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const Color = 'color' as any;
const AmbientLight = 'ambientLight' as any;
const SpotLight = 'spotLight' as any;
const PointLight = 'pointLight' as any;

// --- COMPONENTES 3D ---
const GoldenKeyPiece = ({ position, rotationSpeed = 1, scale = 1 }: any) => {
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
        <MeshStandardMaterial color="#800020" metalness={0.9} roughness={0.1} emissive="#800020" emissiveIntensity={0.2} />
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

// --- COMPONENTES UI AUXILIARES ---
const Logo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <svg viewBox="0 0 144 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M84.4 20.2L99.2 81.2H89.4L86.2 68.6H71.8L68.6 81.2H58.8L73.6 20.2H84.4ZM79 59.8L77.6 42.6C77.4 40.2 77.2 37.8 77 35.4H76.8C76.6 37.8 76.4 40.2 76.2 42.6L74.8 59.8H79Z" fill="currentColor"/>
    <circle cx="34" cy="54" r="13" stroke="currentColor" strokeWidth="4"/>
    <rect x="47" y="52" width="56" height="4" fill="currentColor"/>
  </svg>
);

const SectionTitle = ({ subtitle, title, dark = true, centered = false }: any) => (
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

// --- SEÇÕES DO MÉTODO ---
const FrameworkSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const codeData = useMemo(() => [
    { 
      id: 'C', letter: 'C', name: 'Clarity', subtitle: 'Clareza Estrutural', icon: Target, 
      desc: 'Pensar antes de falar. Estruturar antes de responder.', 
      points: ['Organizar ideias em blocos lógicos', 'Priorizar informação crítica', 'Eliminar excesso e ruído', 'Construir raciocínio executivo linear'], 
      result: 'Mensagens com começo, meio e fim.', impact: 'Menos improviso. Mais direção.' 
    },
    { 
      id: 'O', letter: 'O', name: 'Orientation', subtitle: 'Orientação Estratégica', icon: Compass, 
      desc: 'Saber o que dizer, para quem dizer e com qual intenção.', 
      points: ['Ler a sala e hierarquia', 'Entender papéis e expectativas', 'Ajustar nível de formalidade', 'Escolher abordagem tática de fala'], 
      result: 'A pessoa passa a falar estrategicamente.', impact: 'A mensagem serve a um objetivo.' 
    },
    { 
      id: 'D', letter: 'D', name: 'Delivery', subtitle: 'Entrega Executiva', icon: Send, 
      desc: 'Como a mensagem é entregue pesa tanto quanto o conteúdo.', 
      points: ['Tom, Ritmo e Pausas', 'Ênfase e Objetividade', 'Soar calmo sob pressão', 'Encerrar falas com firmeza'], 
      result: 'Comunicação mais segura sob estresse.', impact: 'Presença de Comando.' 
    },
    { 
      id: 'E', letter: 'E', name: 'Execution', subtitle: 'Execução em Ambiente Real', icon: Play, 
      desc: 'Comunicação só se consolida quando é aplicada.', 
      points: ['Treino guiado personalizado', 'Simulações de Boardroom', 'Ajustes em tempo real', 'Aplicação direta em reuniões reais'], 
      result: 'O novo padrão vira o seu default.', impact: 'Transformação observável.' 
    }
  ], []);

  const ActiveIcon = codeData[activeTab].icon;

  return (
    <section id="framework" className="py-40 bg-white text-black overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-executive-bordeaux/5 to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-6 md:px-12">
        <SectionTitle dark={false} subtitle="The Architecture" title="Metodologia C.O.D.E.™" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5 h-[500px] relative flex items-center justify-center">
             <div className="absolute w-[320px] h-[320px] border border-black/10 rounded-full animate-spin-slow"></div>
             <div className="bg-executive-bordeaux text-white p-8 rounded-full z-10 font-bold text-3xl shadow-2xl relative">
                C.O.D.E
                <span className="text-[10px] absolute -top-1 -right-3 opacity-50 uppercase">tm</span>
             </div>
             {codeData.map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveTab(i)} 
                  className={`absolute w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-700 font-bold ${activeTab === i ? 'bg-executive-bordeaux text-white border-executive-bordeaux scale-125 shadow-2xl' : 'bg-white text-black border-black/20 hover:border-executive-bordeaux'}`} 
                  style={{ transform: `rotate(${i*90 - 90}deg) translate(160px) rotate(-${i*90 - 90}deg)` }}
                >
                  {item.letter}
                </button>
             ))}
          </div>
          <div className="lg:col-span-7 bg-black text-white p-12 md:p-16 rounded-sm relative overflow-hidden min-h-[550px] shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-6 mb-8">
                   <div className="p-4 bg-executive-bordeaux rounded-sm"><ActiveIcon size={32} /></div>
                   <div>
                      <h3 className="text-4xl font-bold uppercase tracking-widest">{codeData[activeTab].name}</h3>
                      <p className="text-executive-bordeaux font-bold text-[10px] tracking-[0.4em] uppercase">{codeData[activeTab].subtitle}</p>
                   </div>
                </div>
                <p className="text-2xl font-light italic mb-10 leading-relaxed border-l-4 border-executive-bordeaux pl-6">"{codeData[activeTab].desc}"</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div>
                      <h4 className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 mb-4">Desenvolvimento</h4>
                      <ul className="space-y-4">
                        {codeData[activeTab].points.map((p, i) => (
                          <li key={i} className="flex gap-3 text-sm font-bold"><div className="w-1.5 h-1.5 bg-executive-bordeaux mt-1.5 shrink-0"></div> {p}</li>
                        ))}
                      </ul>
                   </div>
                   <div className="space-y-6">
                      <div className="p-6 bg-white/5 rounded-sm">
                         <h4 className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 mb-2 text-executive-bordeaux">Impacto Real</h4>
                         <p className="text-xl font-bold italic">{codeData[activeTab].impact}</p>
                      </div>
                      <p className="text-sm opacity-60 italic">{codeData[activeTab].result}</p>
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const PillarTimeline = () => {
  const pilares = [
    { title: 'Clareza Estrutural', desc: 'Metodologia para arquitetar o raciocínio lógico antes da articulação verbal, garantindo assertividade sob pressão.', icon: Target, result: 'Projeção de preparo e domínio estratégico imediato.' },
    { title: 'Competência Pragmática', desc: 'O domínio do "tato" corporativo: entender o que dizer, o que silenciar e como modular o discurso conforme o stakeholder.', icon: Shield, result: 'Validação e respeito instantâneo em mesas de decisão.' },
    { title: 'Linguagem de Comandante', desc: 'Substituição da fala descritiva e reativa por uma linguagem de decisão, focada em impacto e resolutividade.', icon: Zap, result: 'Eliminação da percepção de senioridade júnior ou técnica.' },
    { title: 'Posicionamento e Cadência', desc: 'Ajuste de tom de voz, ritmo e presença verbal para projetar autoridade incontestável.', icon: Briefcase, result: 'Reconhecimento de liderança pela simples presença verbal.' },
    { title: 'Navegação Intercultural', desc: 'Decodificação dos códigos invisíveis da hierarquia executiva anglo-saxônica e americana.', icon: Globe, result: 'Trânsito fluido e influente em qualquer ambiente global.' },
    { title: 'Aplicação Contextual', desc: 'Transferência imediata dos frameworks para sua agenda real: de e-mails críticos a apresentações para o Board.', icon: Users, result: 'Resultados visíveis no fechamento do seu próximo trimestre.' }
  ];

  return (
    <section id="pilares" className="py-40 bg-white text-black">
      <div className="container mx-auto px-6 md:px-12 mb-32 text-center">
        <SectionTitle dark={false} subtitle="Os 6 Protocolos" title="A Estrutura da Autoridade" centered />
      </div>
      <div className="container mx-auto px-6 md:px-12 relative max-w-5xl">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-executive-bordeaux/20 transform md:-translate-x-1/2"></div>
        <div className="space-y-32">
          {pilares.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`relative flex flex-col md:flex-row items-start ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-executive-bordeaux rounded-full transform -translate-x-1/2 z-10 shadow-xl border-4 border-white"></div>
              <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 text-left'}`}>
                <div className="mb-4">
                   <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">Protocolo 0{i+1}</span>
                   <h3 className="text-3xl font-bold uppercase mt-2 mb-6">{p.title}</h3>
                </div>
                <p className="text-lg font-light leading-relaxed mb-6">{p.desc}</p>
                <div className={`flex items-center gap-4 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                   <span className="text-[9px] font-bold tracking-[0.3em] uppercase bg-black text-white px-2 py-1">Objetivo</span>
                   <span className="text-sm italic font-bold">{p.result}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Formats = () => {
  const formats = [
    { title: 'Individual Advisory', desc: 'Acompanhamento exclusivo e altamente customizado para executivos de alta performance buscando refinamento imediato.' },
    { title: 'C-Level Mentorship', subtitle: 'Lista de Espera', desc: 'Programa intensivo de 12 semanas focado em transição rumo a conselhos e posições globais de comando.' },
    { title: 'Strategic Consulting', desc: 'Intervenções pontuais e críticas para preparação de negociações de alto risco ou fusões e aquisições.' },
    { title: 'Corporate Solutions', desc: 'Treinamento tático de elite para capacitar times de diretoria em arquitetura de poder e autoridade global.' }
  ];

  return (
    <section className="py-40 bg-white border-t border-black/5 text-black">
      <div className="container mx-auto px-6 md:px-12 mb-24">
        <SectionTitle dark={false} subtitle="Disponibilidade" title="Formatos de Atendimento" centered />
      </div>
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {formats.map((f, i) => (
          <div key={i} className="relative flex flex-col items-center text-center group p-10 bg-white border border-black/5 hover:border-executive-bordeaux/30 transition-all duration-700 shadow-sm hover:shadow-2xl">
            <div className="h-12 mb-4 flex items-center justify-center">
              {f.subtitle ? <span className="text-[8px] font-bold tracking-[0.3em] uppercase bg-executive-bordeaux text-white px-3 py-1 rounded-full">{f.subtitle}</span> : <div className="w-1 h-1 bg-executive-bordeaux/20 rounded-full"></div>}
            </div>
            <h4 className="text-sm font-extrabold mb-6 uppercase tracking-[0.3em] h-12 flex items-center">{f.title}</h4>
            <p className="text-xs font-bold leading-relaxed opacity-60 mb-12 max-w-[200px]">{f.desc}</p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 bg-executive-bordeaux group-hover:w-full transition-all duration-700"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    { name: "Ricardo S.", role: "CEO — Global Tech Logistics", text: "A mentoria da Alexandra não é sobre inglês, é sobre poder. Aprendi a ocupar espaços em reuniões globais onde antes eu apenas 'traduzia' minhas ideias.", mediaUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800', type: 'image' },
    { name: "Marina B.", role: "VP Operações — FinTech NY", text: "O framework C.O.D.E mudou minha forma de reportar ao Board. A precisão e a cadência trazem uma autoridade que eu não conseguia atingir sozinha.", mediaUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800', type: 'video' },
    { name: "Gustavo L.", role: "Board Member — Multinacional", text: "A intervenção estratégica na minha comunicação transformou negociações complexas em processos fluidos. A Peça-Chave™ é o diferencial entre falar e comandar.", mediaUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800', type: 'image' }
  ];
  return (
    <section id="depoimentos" className="py-40 bg-neutral-50 border-t border-black/5">
      <div className="container mx-auto px-6 md:px-12 mb-20">
        <SectionTitle dark={false} subtitle="Resultados Reais" title="Endossos Estratégicos" centered />
      </div>
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {testimonials.map((t, i) => (
          <div key={i} className="flex flex-col border border-black/5 bg-white group hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <div className="relative aspect-video bg-black overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
              <img src={t.mediaUrl} alt={t.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
              {t.type === 'video' && <div className="absolute inset-0 flex items-center justify-center"><div className="w-12 h-12 bg-executive-bordeaux text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform"><Play size={20} fill="currentColor" /></div></div>}
            </div>
            <div className="p-10 flex flex-col flex-1">
              <Quote className="text-executive-bordeaux/20 mb-6" size={32} />
              <p className="text-black text-lg font-bold leading-relaxed mb-10 italic flex-1">"{t.text}"</p>
              <div className="pt-6 border-t border-black/5">
                <h4 className="text-black font-extrabold text-sm uppercase tracking-widest mb-1">{t.name}</h4>
                <p className="text-executive-bordeaux text-[10px] font-bold tracking-[0.2em] uppercase">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- APLICAÇÃO PRINCIPAL ---
const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const handleCopy = () => {
    const bio = `Alexandra Hurley — A Peça-Chave™. Intérprete Judicial Federal nos EUA com mais de 30 anos de experiência. Mestra pela Boston University, Alexandra foca em Advisory de Comunicação para executivos C-Level, transformando fluência em autoridade estratégica global.`;
    navigator.clipboard.writeText(bio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-executive-bordeaux selection:text-white font-sans overflow-x-hidden">
      
      {/* NAVEGAÇÃO */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-10'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <Logo className="h-10 text-white transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold uppercase tracking-tighter">A Peça-Chave™</span>
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase opacity-60">Alexandra Hurley</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[10px] font-bold tracking-[0.2em] uppercase">
            <a href="#metodo" onClick={scrollTo('metodo')} className="hover:text-executive-bordeaux transition-colors">O Método</a>
            <a href="#framework" onClick={scrollTo('framework')} className="hover:text-executive-bordeaux transition-colors">Framework</a>
            <a href="#pilares" onClick={scrollTo('pilares')} className="hover:text-executive-bordeaux transition-colors">Pilares</a>
            <a href="#sobre" onClick={scrollTo('sobre')} className="hover:text-executive-bordeaux transition-colors">A Especialista</a>
            <a href="#contato" onClick={scrollTo('contato')} className="px-6 py-3 bg-white text-black hover:bg-executive-bordeaux hover:text-white transition-all font-bold">Solicitar Advisory</a>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative h-screen flex items-center overflow-hidden pt-20">
        <AbstractScene />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black z-10" />
        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-5xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-executive-bordeaux"></div>
              <span className="bg-executive-bordeaux text-white px-3 py-1 text-[10px] font-bold tracking-[0.5em] uppercase">Advisory de Comunicação Premium</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] mb-12 tracking-tighter">
              Onde a fluência se torna <br />
              <span className="underline decoration-executive-bordeaux decoration-4 underline-offset-8">autoridade.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light mb-16 max-w-2xl opacity-80 leading-relaxed text-balance">
              Para líderes globais que buscam o <span className="font-bold text-white">enquadramento estratégico</span> necessário para influenciar decisões no topo.
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
               <button onClick={scrollTo('contato')} className="px-12 py-6 bg-white text-black font-bold uppercase text-[11px] tracking-[0.3em] hover:bg-executive-bordeaux hover:text-white transition-all shadow-2xl">Agendar Sessão Diagnóstica</button>
               <a href="#framework" onClick={scrollTo('framework')} className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase hover:text-executive-bordeaux transition-all mt-6 sm:mt-0">Metodologia C.O.D.E <ChevronRight size={14} /></a>
            </div>
          </motion.div>
        </div>
      </header>

      <main>
        {/* PROBLEMA */}
        <section id="metodo" className="py-40 bg-black border-y border-white/5">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <SectionTitle subtitle="O Problema Invisível" title="Inglês tecnicamente correto não garante o seu lugar na mesa." />
              <div className="space-y-8 text-xl font-light opacity-80 leading-relaxed">
                <p>No C-Level, falar inglês é apenas a estaca zero. A barreira real para executivos não é o vocabulário, mas a <span className="text-executive-bordeaux font-bold border-b border-executive-bordeaux/40">arquitetura da mensagem</span>.</p>
                <p>Sem o enquadramento (framing) correto, líderes competentes soam reativos ou excessivamente técnicos.</p>
                <p>A Peça-Chave™ atua exatamente nesta lacuna: transformando sua fluência em presença de comando.</p>
              </div>
            </div>
            <div className="bg-executive-gray p-12 md:p-20 border border-white/5 text-center relative group">
              <div className="absolute -inset-4 border border-executive-bordeaux/20 group-hover:border-executive-bordeaux transition-all duration-1000"></div>
              <div className="text-4xl font-light mb-4 opacity-40">Fluência Linguística</div>
              <div className="w-12 h-[1px] bg-executive-bordeaux mx-auto my-10"></div>
              <div className="text-5xl md:text-6xl font-black italic tracking-tighter">Influência Estratégica</div>
            </div>
          </div>
        </section>

        <FrameworkSection />
        <PillarTimeline />
        
        {/* SOBRE */}
        <section id="sobre" className="py-40 bg-white text-black relative">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-5 grayscale hover:grayscale-0 transition-all duration-1000 border border-black/5 bg-neutral-100 aspect-[4/5] flex items-center justify-center text-8xl font-black opacity-5">AH</div>
            <div className="lg:col-span-7">
              <SectionTitle dark={false} subtitle="A Especialista" title="Alexandra Hurley" />
              <div className="space-y-8 text-xl font-light leading-relaxed mb-12">
                <p>Intérprete Judicial Federal certificada nos EUA, Alexandra atua no ápice da precisão exigida pelo <span className="font-bold underline decoration-executive-bordeaux underline-offset-4">Departamento de Justiça Americano</span>.</p>
                <p>Com mestrado pela Boston University e 30 anos de vivência no topo do corporativo global, ela decodifica o idioma sob a ótica da estratégia e do poder.</p>
              </div>
              <button onClick={handleCopy} className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase border-b-2 border-black pb-2 hover:text-executive-bordeaux hover:border-executive-bordeaux transition-all">
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copiado' : 'Copiar Perfil Estratégico'}
              </button>
            </div>
          </div>
        </section>

        <Formats />
        <TestimonialsSection />

        {/* CTA */}
        <section id="contato" className="py-60 bg-black text-center relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-executive-bordeaux/10 rounded-full blur-[120px] pointer-events-none"></div>
           <div className="container mx-auto px-6 max-w-5xl relative z-10">
              <h2 className="text-6xl md:text-9xl font-bold mb-16 tracking-tighter">Domine o <span className="italic underline decoration-executive-bordeaux decoration-4 underline-offset-[20px]">palco global.</span></h2>
              <button className="px-20 py-8 bg-white text-black font-bold uppercase text-xs tracking-[0.5em] hover:bg-executive-bordeaux hover:text-white transition-all shadow-2xl">Solicitar Sessão Diagnóstica</button>
           </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 bg-black text-center">
        <Logo className="h-10 mx-auto mb-8 text-white/40" />
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">© {new Date().getFullYear()} A Peça-Chave™ — Alexandra Hurley. Todos os direitos reservados.</p>
      </footer>

      {/* MENU MOBILE OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center gap-10">
            <button className="absolute top-10 right-10" onClick={() => setMenuOpen(false)}><X size={32} /></button>
            <a href="#metodo" onClick={scrollTo('metodo')} className="text-3xl font-bold uppercase tracking-widest">O Método</a>
            <a href="#framework" onClick={scrollTo('framework')} className="text-3xl font-bold uppercase tracking-widest">Framework</a>
            <a href="#pilares" onClick={scrollTo('pilares')} className="text-3xl font-bold uppercase tracking-widest">Protocolos</a>
            <a href="#sobre" onClick={scrollTo('sobre')} className="text-3xl font-bold uppercase tracking-widest">Sobre</a>
            <button onClick={scrollTo('contato')} className="bg-white text-black px-12 py-4 font-bold uppercase tracking-widest">Contato</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- RENDERIZAÇÃO ---
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);

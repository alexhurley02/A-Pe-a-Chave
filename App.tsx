
import React, { useState, useEffect } from 'react';
import { AbstractScene } from './components/AbstractScene';
import { PillarTimeline, HowItWorks, Formats } from './components/ExecutiveMethod';
import { FrameworkSection } from './components/FrameworkSection';
import { Menu, X, ChevronRight, Copy, Check, Quote, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Logo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <svg viewBox="0 0 144 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M84.4 20.2L99.2 81.2H89.4L86.2 68.6H71.8L68.6 81.2H58.8L73.6 20.2H84.4ZM79 59.8L77.6 42.6C77.4 40.2 77.2 37.8 77 35.4H76.8C76.6 37.8 76.4 40.2 76.2 42.6L74.8 59.8H79Z" fill="white"/>
    <circle cx="34" cy="54" r="13" stroke="white" strokeWidth="4"/>
    <rect x="47" y="52" width="56" height="4" fill="white"/>
    <rect x="91" y="56" width="3" height="8" fill="white"/>
    <rect x="97" y="56" width="3" height="8" fill="white"/>
  </svg>
);

const SectionTitle = ({ subtitle, title, dark = true, centered = false }: { subtitle: string, title: React.ReactNode, dark?: boolean, centered?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
    <motion.div 
      initial={{ opacity: 0, x: centered ? 0 : -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-4"
    >
      {!centered && <div className="w-8 h-[1px] bg-executive-bordeaux"></div>}
      <span className="bg-executive-bordeaux text-white px-3 py-1 text-[10px] font-bold tracking-[0.4em] uppercase">
        {subtitle}
      </span>
      {centered && <div className="w-8 h-[1px] bg-executive-bordeaux"></div>}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-3xl md:text-5xl font-bold tracking-tight leading-tight ${dark ? 'text-white' : 'text-black'} ${centered ? 'max-w-2xl' : ''}`}
    >
      {title}
    </motion.h2>
  </div>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ricardo S.",
      role: "CEO — Global Tech Logistics",
      text: "A mentoria da Alexandra não é sobre inglês, é sobre poder. Aprendi a ocupar espaços em reuniões globais onde antes eu apenas 'traduzia' minhas ideias.",
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: "Marina B.",
      role: "VP de Operações — FinTech New York",
      text: "O framework C.O.D.E mudou minha forma de reportar ao Board. A precisão e a cadência que a Alexandra ensina trazem uma autoridade que eu não conseguia atingir sozinha.",
      mediaType: 'video',
      mediaUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: "Gustavo L.",
      role: "Board Member — Multinacional de Energia",
      text: "A intervenção estratégica na minha comunicação transformou negociações complexas em processos fluidos. A Peça-Chave™ é o diferencial entre falar e comandar.",
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
    }
  ];

  return (
    <section className="py-40 bg-white border-t border-black/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20">
          <SectionTitle dark={false} subtitle="Resultados Reais" title="Endossos Estratégicos" centered={true} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col border border-black/5 bg-neutral-50 rounded-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-black grayscale group-hover:grayscale-0 transition-all duration-700">
                <img 
                  src={t.mediaUrl} 
                  alt={t.name} 
                  className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity"
                />
                {t.mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-executive-bordeaux text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-10 flex flex-col flex-1">
                <Quote className="text-executive-bordeaux/20 mb-6" size={32} />
                <p className="text-black text-lg font-bold leading-relaxed mb-10 italic flex-1">
                  "{t.text}"
                </p>
                <div className="pt-6 border-t border-black/5">
                  <h4 className="text-black font-extrabold text-sm uppercase tracking-widest mb-1">{t.name}</h4>
                  <p className="text-executive-bordeaux text-[10px] font-bold tracking-[0.2em] uppercase">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyBio = () => {
    const bioText = `Alexandra Hurley — A Peça-Chave™. Intérprete Judicial Federal nos EUA com mais de 30 anos de experiência. Mestra pela Boston University, Alexandra foca em Advisory de Comunicação para executivos C-Level, transformando fluência em autoridade estratégica global.`;
    navigator.clipboard.writeText(bioText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-executive-bordeaux selection:text-white font-sans">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-10'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo className="h-10 md:h-12 w-auto transition-transform duration-500 group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold tracking-tighter text-white uppercase flex items-center leading-none">
                A Peça-Chave<span className="text-[10px] ml-1 opacity-40">™</span>
              </span>
              <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-white leading-none mt-1">Alexandra Hurley</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[10px] font-bold tracking-[0.2em] uppercase">
            <a href="#metodo" onClick={scrollToSection('metodo')} className="text-white hover:text-gray-300 transition-colors">O Método</a>
            <a href="#framework" onClick={scrollToSection('framework')} className="text-white hover:text-gray-300 transition-colors">Framework</a>
            <a href="#pilares" onClick={scrollToSection('pilares')} className="text-white hover:text-gray-300 transition-colors">Os Pilares</a>
            <a href="#sobre" onClick={scrollToSection('sobre')} className="text-white hover:text-gray-300 transition-colors">Alexandra</a>
            <a href="#membros" className="text-white hover:text-gray-300 transition-colors font-bold">Área de Membros</a>
            <a 
              href="#contato" 
              onClick={scrollToSection('contato')}
              className="px-6 py-3 bg-white text-black hover:bg-executive-bordeaux hover:text-white transition-all duration-500 rounded-sm font-bold shadow-lg"
            >
              Conversa Estratégica
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 text-lg font-bold tracking-widest uppercase"
          >
            <Logo className="h-20 w-auto mb-8" />
            <a href="#metodo" onClick={scrollToSection('metodo')} className="text-white hover:text-gray-300">O Método</a>
            <a href="#framework" onClick={scrollToSection('framework')} className="text-white hover:text-gray-300">Framework</a>
            <a href="#pilares" onClick={scrollToSection('pilares')} className="text-white hover:text-gray-300">Os Pilares</a>
            <a href="#sobre" onClick={scrollToSection('sobre')} className="text-white hover:text-gray-300">Alexandra</a>
            <a href="#membros" className="text-white font-bold">Área de Membros</a>
            <a href="#contato" onClick={scrollToSection('contato')} className="bg-white text-black px-8 py-4 font-bold">Contato</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center overflow-hidden pt-24 md:pt-32">
        <AbstractScene />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black z-10" />

        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-executive-bordeaux"></div>
              <span className="bg-executive-bordeaux text-white px-3 py-1 text-[10px] font-bold tracking-[0.5em] uppercase">
                Advisory de Comunicação para Alta Gestão
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.95] mb-10 text-white tracking-tighter">
              Onde a fluência se torna <span className="border-b-[4px] border-executive-bordeaux pb-2">autoridade.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white font-thin leading-relaxed mb-16 max-w-2xl">
              Para líderes globais que já dominam o idioma, mas buscam o <span className="bg-executive-bordeaux text-white px-2 py-0.5 rounded-sm font-bold">enquadramento estratégico</span> e a <span className="bg-executive-bordeaux text-white px-2 py-0.5 rounded-sm font-bold">precisão</span> necessárias para influenciar decisões no topo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
              <button 
                onClick={scrollToSection('contato')}
                className="group relative px-12 py-6 overflow-hidden border border-white/40 hover:border-executive-bordeaux transition-colors duration-500 rounded-sm font-bold"
              >
                <span className="relative z-10 text-[11px] font-bold tracking-[0.3em] uppercase">Solicitar Mentoria</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="absolute inset-0 z-20 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[11px] font-bold tracking-[0.3em] uppercase">Solicitar Mentoria</span>
              </button>
              <a href="#metodo" onClick={scrollToSection('metodo')} className="group flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-white hover:text-gray-300 transition-all font-bold">
                Conheça a Metodologia <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      <main>
        {/* Bloco 1: Problema */}
        <section id="metodo" className="py-40 bg-black border-y border-white/5">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-24 items-center">
            <div className="md:col-span-7">
              <SectionTitle subtitle="O Problema Invisível" title="O inglês tecnicamente correto não garante o seu lugar na mesa." />
              <div className="space-y-8 text-xl text-white font-thin leading-relaxed">
                <p>
                  No C-Level, falar inglês é apenas a "estaca zero". A verdadeira barreira para executivos brasileiros não é o vocabulário, mas a <span className="bg-executive-bordeaux text-white px-2 py-0.5 rounded-sm font-bold">arquitetura da mensagem</span>.
                </p>
                <p>
                  A Peça-Chave™ atua exatamente nesta lacuna: transformando sua competência técnica em <span className="bg-executive-bordeaux text-white px-2 py-0.5 rounded-sm font-bold">presença de comando</span> através de uma comunicação desenhada para o alto escalão.
                </p>
              </div>
            </div>
            <div className="md:col-span-5">
               <div className="relative group">
                  <div className="absolute -inset-4 border border-executive-bordeaux/40 group-hover:border-executive-bordeaux/80 transition-colors duration-700"></div>
                  <div className="relative bg-executive-gray p-16 text-center border border-white/10">
                     <span className="bg-executive-bordeaux text-white px-3 py-1 text-[10px] font-bold tracking-[0.5em] uppercase mb-8 inline-block">Diferenciação de Valor</span>
                     <div className="text-5xl font-thin tracking-tighter text-white">Fluência Linguística</div>
                     <div className="my-8 w-12 h-[1px] bg-executive-bordeaux mx-auto"></div>
                     <div className="text-5xl font-bold tracking-tighter text-white italic">Influência Estratégica</div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        <FrameworkSection />

        {/* Bloco 2: Pilares */}
        <section id="pilares" className="py-40 bg-white text-black">
          <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl mx-auto mb-32">
            <SectionTitle dark={false} subtitle="A Estrutura do Método" title="Os 6 Protocolos da Autoridade Executiva" centered={true} />
          </div>
          <div className="container mx-auto px-6 md:px-12">
            <PillarTimeline dark={false} />
          </div>
        </section>

        {/* Bloco 3: Formatos de Atendimento - Ajustado ao modelo clássico */}
        <section className="py-40 bg-white border-t border-black/5 text-black">
           <div className="container mx-auto px-6 md:px-12 mb-24">
              <SectionTitle dark={false} subtitle="Disponibilidade" title="Formatos de Atendimento" centered={true} />
           </div>
           <div className="container mx-auto px-6 md:px-12">
              <Formats dark={false} />
           </div>
        </section>

        {/* Bloco 4: Sobre Alexandra */}
        <section id="sobre" className="py-40 bg-white text-black relative">
           <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-24 items-center">
              <div className="md:col-span-5">
                 <div className="relative">
                    <div className="aspect-[4/5] bg-neutral-100 border border-black/5 grayscale hover:grayscale-0 transition-all duration-1000">
                       <div className="absolute inset-0 flex items-center justify-center text-black/5 font-bold text-8xl tracking-tighter">AH</div>
                    </div>
                 </div>
              </div>
              <div className="md:col-span-7">
                <SectionTitle dark={false} subtitle="A Especialista" title="Alexandra Hurley" />
                <div className="space-y-8 text-xl text-black font-thin leading-relaxed mb-12">
                  <p>
                    Intérprete Judicial Federal e Estadual certificada nos Estados Unidos, Alexandra atua no ápice da precisão linguística exigida pelo <span className="text-black font-extrabold underline decoration-executive-bordeaux decoration-2 underline-offset-4">Departamento de Justiça Americano</span>.
                  </p>
                </div>
                <button onClick={handleCopyBio} className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-black hover:text-executive-bordeaux transition-all border-b-2 border-black pb-2 group font-bold">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copiado' : 'Copiar Perfil Estratégico'}</span>
                </button>
              </div>
           </div>
        </section>

        {/* CTA Final */}
        <section id="contato" className="py-60 bg-black text-center relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h2 className="text-6xl md:text-9xl font-bold mb-12 tracking-tighter text-white">Domine o <span className="font-bold underline decoration-executive-bordeaux underline-offset-[20px] decoration-4 text-white">palco global.</span></h2>
            <button className="group relative px-20 py-8 bg-white text-black hover:bg-executive-bordeaux hover:text-white transition-all duration-700 rounded-sm font-bold shadow-[0_0_50px_rgba(255,255,255,0.1)]">
               <span className="text-[12px] font-bold tracking-[0.4em] uppercase">Agendar Sessão Diagnóstica</span>
            </button>
          </div>
        </section>

        {/* Depoimentos */}
        <TestimonialsSection />
      </main>

      <footer className="bg-black py-20 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="flex items-center gap-3">
              <Logo className="h-10 w-auto" />
              <div className="text-[9px] font-bold tracking-[0.4em] uppercase text-white font-bold">
                 © {new Date().getFullYear()} A Peça-Chave™ — Alexandra Hurley
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

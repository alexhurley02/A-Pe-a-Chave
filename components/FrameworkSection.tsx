
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Target, Compass, Send, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const codeData = [
  {
    id: 'C',
    letter: 'C',
    name: 'Clarity',
    subtitle: 'Clareza Estrutural',
    icon: Target,
    content: {
      desc: 'Pensar antes de falar. Estruturar antes de responder.',
      points: [
        'Organizar ideias em blocos lógicos',
        'Priorizar informação',
        'Eliminar excesso, ruído e dispersão',
        'Construir raciocínio executivo (início → desenvolvimento → conclusão)'
      ],
      result: 'Mensagens com começo, meio e fim.',
      impact: 'Menos improviso. Mais direção.'
    }
  },
  {
    id: 'O',
    letter: 'O',
    name: 'Orientation',
    subtitle: 'Orientação Estratégica',
    icon: Compass,
    content: {
      desc: 'Saber o que dizer, para quem dizer e com qual intenção.',
      points: [
        'Ler a sala e a hierarquia',
        'Entender papéis, expectativas e poder',
        'Ajustar nível de formalidade',
        'Escolher abordagem: informar, propor, alinhar, discordar, negociar'
      ],
      result: 'A pessoa para de falar apenas “corretamente” e passa a falar estrategicamente.',
      impact: 'A mensagem começa a servir a um objetivo.'
    }
  },
  {
    id: 'D',
    letter: 'D',
    name: 'Delivery',
    subtitle: 'Entrega Executiva',
    icon: Send,
    content: {
      desc: 'Como a mensagem é entregue pesa tanto quanto o conteúdo.',
      points: [
        'Tom, Ritmo e Pausas',
        'Ênfase e Objetividade',
        'Soar calmo sob pressão',
        'Encerrar falas com firmeza'
      ],
      result: 'Comunicação mais segura, mesmo com menos palavras.',
      impact: 'Presença.'
    }
  },
  {
    id: 'E',
    letter: 'E',
    name: 'Execution',
    subtitle: 'Execução em Ambiente Real',
    icon: Play,
    content: {
      desc: 'Comunicação só se consolida quando é aplicada.',
      points: [
        'Treino guiado',
        'Simulações Intensivas',
        'Ajustes finos em tempo real',
        'Aplicação direta em reuniões, apresentações e e-mails reais'
      ],
      result: 'O novo padrão passa a ser usado no dia a dia.',
      impact: 'Transformação observável.'
    }
  }
];

export const FrameworkSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const ActiveIcon = codeData[activeTab].icon;

  return (
    <section id="framework" className="py-40 bg-white relative overflow-hidden" ref={containerRef}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-executive-bordeaux/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-8 h-[1px] bg-executive-bordeaux"></div>
            <span className="bg-executive-bordeaux text-white px-3 py-1 text-[10px] font-bold tracking-[0.4em] uppercase">
              The Architecture
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-10 text-black">
            O FRAMEWORK POR TRÁS DA <br />
            <span className="italic font-thin text-black">A PEÇA-CHAVE™</span>
          </h2>
          <p className="text-xl text-black font-thin max-w-2xl leading-relaxed">
            A A Peça-Chave™ opera sobre a <span className="text-executive-bordeaux font-bold">Metodologia C.O.D.E.™</span> — um framework proprietário criado para transformar o inglês existente em clareza estrutural, autoridade e influência.
          </p>
        </div>

        {/* Mindmap Interactive Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Mindmap Visual */}
          <div className="lg:col-span-5 relative h-[500px] flex items-center justify-center">
            {/* Central Node Visual Lines */}
            <motion.div 
              style={{ rotate }}
              className="absolute w-[300px] h-[300px] border border-black/10 rounded-full flex items-center justify-center"
            >
              <div className="w-[280px] h-[280px] border border-black/5 rounded-full"></div>
            </motion.div>

            {/* C.O.D.E Central Node with Hover Effect */}
            <motion.div 
              whileHover={{ backgroundColor: '#800020', borderColor: '#800020' }}
              className="relative z-10 bg-white border-[2px] border-black p-8 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.05)] transition-colors duration-300 group cursor-default"
            >
                <span className="text-4xl font-bold tracking-widest text-black group-hover:text-white transition-colors duration-300">C.O.D.E.</span>
                <span className="text-[8px] absolute -top-2 -right-4 opacity-40 text-black group-hover:text-white">™</span>
            </motion.div>

            {/* Connecting Lines & Pillar Nodes */}
            {codeData.map((item, idx) => {
                const angle = (idx * 90) - 90; // Top, Right, Bottom, Left
                const distance = 180;
                const x = Math.cos((angle * Math.PI) / 180) * distance;
                const y = Math.sin((angle * Math.PI) / 180) * distance;

                return (
                    <React.Fragment key={item.id}>
                        {/* Connecting Line - Dark/Bordeaux for white background */}
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            className="absolute h-[1px] bg-black/20 origin-left z-0"
                            style={{ 
                                width: distance - 30,
                                left: '50%',
                                top: '50%',
                                rotate: angle,
                                transformOrigin: '0% 50%'
                            }}
                        />
                        {/* Pillar Node - White Background, Black Text */}
                        <motion.button
                            onClick={() => setActiveTab(idx)}
                            whileHover={{ scale: 1.15 }}
                            className={`absolute w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-500 z-10 text-black font-bold shadow-xl ${
                              activeTab === idx 
                              ? 'bg-white border-executive-bordeaux border-[3px] scale-110 shadow-[0_0_25px_rgba(0,0,0,0.1)]' 
                              : 'bg-white border-black/20 hover:border-executive-bordeaux'
                            }`}
                            style={{ 
                                x: `calc(${x}px)`,
                                y: `calc(${y}px)`
                            }}
                        >
                            <span className="text-2xl font-bold tracking-tighter">{item.letter}</span>
                        </motion.button>
                    </React.Fragment>
                );
            })}
          </div>

          {/* Right: Sliding Rolodex Content */}
          <div className="lg:col-span-7">
            <div className="relative bg-black text-white p-10 md:p-16 rounded-sm min-h-[500px] shadow-2xl overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 p-8 flex gap-4 text-white/5 font-bold text-8xl pointer-events-none">
                  {codeData[activeTab].letter}
               </div>

               <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative z-10"
                  >
                    <div className="flex items-center gap-6 mb-8">
                       <div className="p-4 bg-executive-bordeaux text-white rounded-sm">
                          <ActiveIcon size={32} />
                       </div>
                       <div>
                          <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-1 uppercase">{codeData[activeTab].name}</h3>
                          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-executive-bordeaux">{codeData[activeTab].subtitle}</p>
                       </div>
                    </div>

                    <p className="text-xl font-bold mb-10 leading-relaxed italic border-l-4 border-executive-bordeaux pl-6">
                      "{codeData[activeTab].content.desc}"
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                       <div>
                          <h4 className="text-[9px] font-bold tracking-[0.3em] uppercase mb-6 text-white/40">O Mentorado Desenvolve</h4>
                          <ul className="space-y-4">
                             {codeData[activeTab].content.points.map((p, i) => (
                               <li key={i} className="flex gap-3 text-sm font-bold">
                                  <div className="mt-1.5 w-1.5 h-1.5 bg-executive-bordeaux shrink-0"></div>
                                  <span>{p}</span>
                                </li>
                             ))}
                          </ul>
                       </div>
                       <div className="space-y-8">
                          <div>
                            <h4 className="text-[9px] font-bold tracking-[0.3em] uppercase mb-4 text-white/40">Resultado Prático</h4>
                            <p className="text-sm font-bold">{codeData[activeTab].content.result}</p>
                          </div>
                          <div className="p-6 bg-white text-black rounded-sm">
                            <h4 className="text-[9px] font-bold tracking-[0.3em] uppercase mb-4 text-black/40">Tradução em Impacto</h4>
                            <p className="text-lg font-bold italic tracking-tight">{codeData[activeTab].content.impact}</p>
                          </div>
                       </div>
                    </div>
                  </motion.div>
               </AnimatePresence>

               {/* Navigation Controls */}
               <div className="absolute bottom-10 right-10 flex gap-4">
                  <button 
                    onClick={() => setActiveTab(prev => (prev > 0 ? prev - 1 : codeData.length - 1))}
                    className="p-3 hover:bg-executive-bordeaux transition-colors border border-white/20"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => setActiveTab(prev => (prev < codeData.length - 1 ? prev + 1 : 0))}
                    className="p-3 hover:bg-executive-bordeaux transition-colors border border-white/20"
                  >
                    <ChevronRight size={20} />
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* Footer info about Methodology - White Square Background */}
        <div className="mt-40 bg-white p-10 md:p-20 grid grid-cols-1 md:grid-cols-3 gap-16 rounded-sm shadow-xl border border-black/5">
           <div className="md:col-span-1">
              <h5 className="bg-black text-white px-4 py-2 text-[10px] font-bold tracking-[0.4em] uppercase mb-8 inline-block">O que o C.O.D.E.™ não é</h5>
              <p className="text-black text-sm leading-relaxed font-thin">
                Não é metodologia de escola de inglês, framework acadêmico tradicional, adaptação de livros ou coaching genérico.
              </p>
           </div>
           <div className="md:col-span-2">
              <h5 className="bg-black text-white px-4 py-2 text-[10px] font-bold tracking-[0.4em] uppercase mb-8 inline-block">O Diferencial de Execução</h5>
              <p className="text-black text-lg md:text-xl font-thin leading-relaxed">
                Você já tem inglês. <span className="font-bold">O <span className="text-black italic">C.O.D.E.™</span></span> organiza esse inglês em <span className="bg-executive-bordeaux text-white px-2 py-0.5 rounded-sm font-bold">arquitetura de poder comunicacional</span>. É um sistema autoral forjado em ambientes de alta decisão real.
              </p>
           </div>
        </div>
      </div>
    </section>
  );
};

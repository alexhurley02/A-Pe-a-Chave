
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Shield, Target, Zap, Users, Globe, Briefcase } from 'lucide-react';

const pilares = [
  {
    title: 'Clareza Estrutural',
    desc: 'Metodologia para arquitetar o raciocínio lógico antes da articulação verbal, garantindo assertividade sob pressão.',
    icon: Target,
    result: 'Projeção de preparo e domínio estratégico imediato.'
  },
  {
    title: 'Competência Pragmática',
    desc: 'O domínio do "tato" corporativo: entender o que dizer, o que silenciar e como modular o discurso conforme o stakeholder.',
    icon: Shield,
    result: 'Validação e respeito instantâneo em mesas de decisão.'
  },
  {
    title: 'Linguagem de Comandante',
    desc: 'Substituição da fala descritiva e reativa por uma linguagem de decisão, focada em impacto e resolutividade.',
    icon: Zap,
    result: 'Eliminação da percepção de senioridade júnior ou técnica.'
  },
  {
    title: 'Posicionamento e Cadência',
    desc: (
      <>
        Ajuste de tom de voz, ritmo e presença verbal para projetar autoridade incontestável.
      </>
    ),
    icon: Briefcase,
    result: 'Reconhecimento de liderança pela simples presença verbal.'
  },
  {
    title: 'Navegação Intercultural',
    desc: 'Decodificação dos códigos invisíveis da hierarquia executiva anglo-saxônica e americana.',
    icon: Globe,
    result: 'Trânsito fluido e influente em qualquer ambiente global.'
  },
  {
    title: 'Aplicação Contextual',
    desc: 'Transferência imediata dos frameworks para sua agenda real: de e-mails críticos a apresentações para o Board.',
    icon: Users,
    result: 'Resultados visíveis no fechamento do seu próximo trimestre.'
  }
];

export const PillarTimeline: React.FC<{ dark?: boolean }> = ({ dark = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto py-20 px-4">
      {/* Background Line */}
      <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-executive-bordeaux/10 transform md:-translate-x-1/2`}></div>
      
      {/* Active Line (Dynamic Bordeaux) */}
      <motion.div 
        style={{ scaleY, originY: 0 }}
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-executive-bordeaux transform md:-translate-x-1/2 z-0"
      ></motion.div>

      <div className="space-y-40">
        {pilares.map((p, i) => (
          <PillarItem key={i} p={p} i={i} dark={dark} />
        ))}
      </div>
    </div>
  );
};

const PillarItem: React.FC<{ p: any, i: number, dark: boolean }> = ({ p, i, dark }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const yTranslate = useTransform(scrollYProgress, [0, 1], [30, 0]);

  const textColor = 'text-black';

  return (
    <motion.div
      ref={itemRef}
      style={{ opacity, y: yTranslate }}
      className={`relative flex flex-col md:flex-row items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Marker - Bordeaux */}
      <div className={`absolute left-0 md:left-1/2 w-4 h-4 bg-executive-bordeaux rounded-full transform -translate-x-1/2 z-10 shadow-lg`}></div>

      {/* Content */}
      <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-20 text-left md:text-right' : 'md:pl-20 text-left'}`}>
        <div className={`flex flex-col ${i % 2 === 0 ? 'md:items-end' : 'items-start'} mb-6`}>
           <div className="flex items-center gap-3 mb-4">
              <span className={`text-[10px] font-bold tracking-[0.4em] uppercase ${textColor}`}>Protocolo de Elite 0{i + 1}</span>
              <div className="w-4 h-[1px] bg-executive-bordeaux"></div>
           </div>
           <h3 className={`text-2xl md:text-3xl font-bold ${textColor} uppercase tracking-tight mb-6`}>
            {p.title}
          </h3>
        </div>
        
        <div className={`${textColor} text-lg font-bold leading-relaxed mb-8`}>
          {p.desc}
        </div>
        
        <div className={`flex ${i % 2 === 0 ? 'md:justify-end' : 'justify-start'} items-center gap-4`}>
           <div className="text-[9px] font-bold tracking-[0.3em] uppercase text-black">Objetivo</div>
           <div className={`text-[11px] font-bold ${textColor} tracking-wider italic`}>{p.result}</div>
        </div>
      </div>

      <div className="hidden md:block md:w-[45%]"></div>
    </motion.div>
  );
};

export const HowItWorks = () => {
    const steps = [
        { title: 'Auditoria de Percepção', text: 'Identificação cirúrgica de vícios de fala e lacunas de enquadramento estratégico.' },
        { title: 'Desenho de Frameworks', text: 'Criação de roteiros mentais customizados para seu setor e cargo específico.' },
        { title: 'Simulação de Boardroom', text: 'Treinamento tático em cenários reais para garantir uma entrega impecável.' }
    ];

    return (
        <div className="space-y-12">
            {steps.map((s, i) => (
                <div key={i} className="group cursor-default p-8 transition-all duration-500 hover:bg-white rounded-sm border border-transparent hover:border-executive-bordeaux shadow-2xl">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-[10px] font-bold text-white bg-executive-bordeaux px-3 py-1 transition-all duration-500 rounded-sm block">Etapa 0{i+1}</span>
                        <div className="h-[1px] w-8 bg-white/40 group-hover:w-16 group-hover:bg-executive-bordeaux transition-all duration-700"></div>
                    </div>
                    <h4 className="text-xl font-extrabold mb-3 uppercase tracking-[0.2em] text-white group-hover:text-black transition-colors duration-300">{s.title}</h4>
                    <p className="text-white font-medium text-sm tracking-wide group-hover:text-black transition-colors duration-300 leading-relaxed">{s.text}</p>
                </div>
            ))}
        </div>
    );
};

export const Formats: React.FC<{ dark?: boolean }> = ({ dark = true }) => {
    const formats = [
        { 
            title: 'Individual Advisory', 
            desc: 'Acompanhamento exclusivo e altamente customizado para executivos de alta performance buscando refinamento imediato.' 
        },
        { 
            title: 'C-Level Mentorship', 
            subtitle: 'Lista de Espera', 
            desc: 'Programa intensivo de 12 semanas focado em transição rumo a conselhos e posições globais de comando.' 
        },
        { 
            title: 'Strategic Consulting', 
            desc: 'Intervenções pontuais e críticas para preparação de negociações de alto risco ou fusões e aquisições.' 
        },
        { 
            title: 'Corporate Solutions', 
            desc: 'Treinamento tático de elite para capacitar times de diretoria em arquitetura de poder e autoridade global.' 
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {formats.map((f, i) => (
                <div key={i} className={`relative flex flex-col items-center text-center group p-10 bg-white text-black border border-black/5 hover:border-executive-bordeaux/30 transition-all duration-700 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-2xl`}>
                    
                    {/* Badge for Exclusivity */}
                    <div className="h-12 mb-4 flex items-center justify-center">
                        {f.subtitle ? (
                            <span className="text-[8px] font-bold tracking-[0.3em] uppercase bg-executive-bordeaux text-white px-3 py-1 rounded-full">
                                {f.subtitle}
                            </span>
                        ) : (
                            <div className="w-1 h-1 bg-executive-bordeaux/20 rounded-full"></div>
                        )}
                    </div>

                    <h4 className="text-sm font-extrabold mb-6 uppercase tracking-[0.3em] text-black h-12 flex items-center">
                        {f.title}
                    </h4>

                    <div className="text-xs font-bold leading-relaxed text-black/70 mb-12 max-w-[200px]">
                        {f.desc}
                    </div>

                    {/* Animated Accent Line - Expands from Center */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 bg-executive-bordeaux group-hover:w-full transition-all duration-700 ease-in-out"></div>
                </div>
            ))}
        </div>
    );
}

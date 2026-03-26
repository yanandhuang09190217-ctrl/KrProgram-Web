import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // 安全取出圖示，避免 undefined 導致全白
  const getIcon = (name: string) => {
    const IconComponent = (LucideIcons as any)[name];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : <span />;
  };

  const { Github, ExternalLink, Code2, Terminal, ChevronRight, Mail, Sparkles, Code, GraduationCap, Bot, BadgeDollarSign, CheckCircle2, Zap, Star } = LucideIcons as any;

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: any) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const skills = document.getElementById('skills');
      const pricing = document.getElementById('pricing');
      if (pricing && scrollY >= pricing.offsetTop - 200) setActiveSection('pricing');
      else if (skills && scrollY >= skills.offsetTop - 200) setActiveSection('skills');
      else setActiveSection('home');
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const projects = [
    { title: '幻小月(Huan-Yue)', role: '幻悅陪伴所常駐工程師', description: '一個專注於服務、商城、遊戲社群製作的客製化機器人', iconName: 'Terminal', link: 'https://discord.gg/AjmaRwrw4m' }
  ];

  const technicalSkills = [
    { name: 'Python (Discord.py)', percent: 80, fromColor: 'from-yellow-400', toColor: 'to-orange-500' },
    { name: 'JavaScript / React', percent: 10, fromColor: 'from-blue-400', toColor: 'to-cyan-500' }
  ];

  const pricingPlans = [
    { name: '基礎小精靈', badge: 'Basic', price: '800', theme: 'blue', popular: false, iconName: 'Bot', features: ['自訂歡迎 / 離開圖片訊息', '基礎管理指令 (踢出/禁言/清訊息)', '自訂關鍵字自動回覆', '簡單身分組發放系統', '不需資料庫之輕量功能'] },
    { name: '專業管家', badge: 'Pro', price: '10,000', theme: 'purple', popular: true, iconName: 'Zap', features: ['包含所有「基礎版」功能', '客服表單 (Ticket) 創建系統', '經濟 / 等級 / 經驗值系統', '外部 API 串接 (如：遊戲戰績查詢)', '專屬 SQLite/JSON 資料庫'] },
    { name: '旗艦商城', badge: 'Enterprise', price: '20,000', theme: 'emerald', popular: false, iconName: 'Star', features: ['包含所有「專業版」功能', 'Discord 商城 / 虛擬貨幣交易系統', '進階資料庫 (MongoDB/MySQL)', '高階防翻群 / 驗證防護系統', '原始碼提供與優先除錯'] }
  ];

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-blue-500/30 overflow-x-hidden relative cursor-none">
      <style dangerouslySetInnerHTML={{__html: `* { cursor: none !important; } @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } } .animate-shimmer { animation: shimmer 2s infinite linear; } .bg-grid { background-size: 40px 40px; background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px); }`}} />

      <div className={`fixed top-0 left-0 pointer-events-none z-[100] transition-all duration-300 flex items-center justify-center rounded-full mix-blend-screen hidden md:flex ${isHovering ? 'w-16 h-16 bg-blue-500/20 border border-blue-400/50 blur-[2px]' : 'w-8 h-8 border-2 border-zinc-500/50'}`} style={{ transform: `translate(${mousePos.x - (isHovering ? 32 : 16)}px, ${mousePos.y - (isHovering ? 32 : 16)}px)` }} />
      <div className="fixed top-0 left-0 pointer-events-none z-[100] w-2 h-2 bg-blue-400 rounded-full hidden md:block" style={{ transform: `translate(${mousePos.x - 4}px, ${mousePos.y - 4}px)` }} />
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0 transition-transform duration-1000 hidden md:block" style={{ transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)` }} />

      <nav className="fixed top-0 w-full z-50 bg-[#050505]/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:scale-105 transition duration-300" onClick={() => scrollTo('home')} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>KrProgram.</div>
          <div className="flex gap-6 text-sm font-medium">
            {['home', 'skills', 'pricing'].map((id) => <button key={id} onClick={() => scrollTo(id)} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className={`transition-all duration-300 ${activeSection === id ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-zinc-500 hover:text-zinc-300'}`}>{id === 'home' ? '首頁' : id === 'skills' ? '技能' : '價目'}</button>)}
          </div>
        </div>
      </nav>

      <section id="home" className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center text-center bg-grid z-10">
        <div className="relative mb-10 group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition duration-700 animate-pulse"></div>
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-zinc-900 border-2 border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
             {/* 請確保你在 GitHub 根目錄有上傳這張圖片 */}
             <img src="https://i.postimg.cc/ydN8CNz3/avatar.png" alt="Profile" className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 ease-out" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 drop-shadow-2xl">KrProgram</h1>
        
        <div className="flex items-center justify-center gap-2 mb-10 text-blue-400 font-bold text-xl md:text-2xl drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]">
          <Sparkles className="w-6 h-6 animate-pulse" /><span>成為你商城路上的得力機器人助手</span><Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        
        <div className="flex items-center justify-center flex-wrap gap-3 mb-12 max-w-2xl font-medium">
          <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 shadow-inner text-zinc-300 text-sm"><Code className="w-4 h-4 text-blue-400" /> 開發者</span>
          <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 shadow-inner text-zinc-300 text-sm"><Bot className="w-4 h-4 text-purple-400" /> 幻悅陪伴所常駐工程師</span>
          <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 shadow-inner text-zinc-300 text-sm"><GraduationCap className="w-4 h-4 text-emerald-400" /> 學生</span>
          <span className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 shadow-inner text-emerald-300 text-sm">
            <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span></span> 開放接案中
          </span>
        </div>
        
        <div className="flex gap-5">
          <button onClick={() => scrollTo('pricing')} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="group relative flex items-center gap-2 px-10 py-4 bg-white text-black rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <span className="relative z-10">立即諮詢</span><ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="https://github.com/yanandhuang09190217-ctrl" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="flex items-center justify-center w-14 h-14 bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-full hover:bg-zinc-800 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:-translate-y-1"><Github className="w-6 h-6 text-zinc-300" /></a>
        </div>
      </section>

      <section id="skills" className="py-24 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-16 flex items-center gap-4"><div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20"><Code2 className="w-8 h-8 text-blue-400" /></div> 我的技能與專案</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6 text-left">
              <h3 className="text-xl font-bold text-zinc-400 flex items-center gap-2 tracking-widest uppercase mb-6"><Terminal className="w-5 h-5" /> Projects & Roles</h3>
              {projects.map((p, i) => (
                <div key={i} className="p-6 rounded-3xl bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-blue-500/40 transition-all duration-500 group relative overflow-hidden" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="text-xl font-bold text-white mb-1 flex items-center gap-2 relative z-10">{p.title} <a href={p.link} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition translate-x-1" /></a></h4>
                  <p className="text-blue-400 text-sm font-bold mb-3 relative z-10 tracking-wide uppercase">{p.role}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed relative z-10">{p.description}</p>
                </div>
              ))}
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-md border border-white/5 space-y-10 text-left">
              <h3 className="text-xl font-bold text-zinc-400 tracking-widest uppercase mb-2">Technical Skills</h3>
              {technicalSkills.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-bold mb-3"><span>{s.name}</span><span className="font-mono text-zinc-500">{s.percent}%</span></div>
                  <div className="h-3 bg-zinc-950 rounded-full overflow-hidden relative border border-white/5 shadow-inner">
                    <div className={`absolute inset-y-0 left-0 bg-gradient-to-r ${s.fromColor} ${s.toColor} rounded-full transition-all duration-1000 ease-out`} style={{ width: isLoaded ? `${s.percent}%` : '0%' }}>
                      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 px-6 relative z-10 border-t border-white/5 bg-black/40">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4 flex items-center justify-center gap-4"><div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20"><BadgeDollarSign className="w-8 h-8 text-emerald-400" /></div> 客製化服務報價</h2>
          <p className="text-zinc-500 mb-16 text-lg max-w-2xl mx-auto leading-relaxed">以上價格僅供參考，實際費用將視功能複雜度而定，若有需要請私訊洽詢。</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan, i) => (
              <div key={i} className={`flex flex-col p-8 rounded-[2.5rem] border transition-all duration-500 text-left relative overflow-hidden backdrop-blur-md ${plan.popular ? 'bg-zinc-900/80 border-purple-500/60 shadow-[0_0_50px_rgba(168,85,247,0.15)] md:-translate-y-4 md:hover:-translate-y-6 z-10 py-10' : 'bg-zinc-900/30 border-white/10 hover:border-white/30 hover:-translate-y-2'}`} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                {plan.popular && <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-500 to-purple-700 text-white text-[10px] font-black px-4 py-2 rounded-bl-xl tracking-tighter uppercase shadow-lg">Recommended</div>}
                {plan.popular && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>}
                <div className="mb-6 bg-zinc-950/50 w-fit p-3 rounded-2xl border border-white/5">{getIcon(plan.iconName)}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-zinc-500 text-xs mb-8 h-8 leading-relaxed">{plan.description}</p>
                <div className="mb-8 flex items-baseline gap-1"><span className="text-sm font-bold text-zinc-500 font-mono">NT$</span><span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span><span className="text-sm font-bold text-zinc-500 ml-1">起</span></div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((f, fi) => <li key={fi} className="flex items-start gap-3 text-sm"><CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.theme === 'purple' ? 'text-purple-400' : plan.theme === 'emerald' ? 'text-emerald-400' : 'text-blue-400'}`} /><span className="text-zinc-400 leading-tight">{f}</span></li>)}
                </ul>
                <a href="https://discordapp.com/users/1284764153038503990" target="_blank" rel="noopener noreferrer" className={`block w-full text-center py-4 rounded-2xl font-black transition-all duration-300 ${plan.popular ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:bg-purple-500' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}>聯繫討論</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto p-12 md:p-16 rounded-[3.5rem] bg-gradient-to-b from-blue-600/10 via-blue-900/5 to-transparent border border-blue-500/20 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">準備好開始了嗎？</h2>
          <p className="text-zinc-400 mb-12 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">不論是簡單的管理機器人，還是高度客製化的商城系統，<br className="hidden md:block" />我都能為你提供最專業且穩定的開發服務。</p>
          <a href="https://discordapp.com/users/1284764153038503990" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="inline-flex items-center gap-3 px-12 py-5 bg-blue-600 text-white rounded-full font-black text-xl hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] transition-all duration-300 hover:-translate-y-1"><Mail className="w-6 h-6" /> 前往 Discord 諮詢</a>
        </div>
      </section>

      <footer className="py-16 text-center border-t border-white/5 bg-[#020202]">
        <div className="text-3xl font-black text-white mb-4 tracking-tighter">KrProgram.</div>
        <p className="text-zinc-600 text-xs font-mono tracking-[0.4em] uppercase mb-10">Crafting automated experiences.</p>
        <div className="flex justify-center gap-8 text-zinc-500 text-sm font-black"><a href="https://github.com/yanandhuang09190217-ctrl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300">GITHUB</a><span className="text-zinc-800">/</span><a href="https://discordapp.com/users/1284764153038503990" target="_blank" rel="noopener noreferrer" className="hover:text-[#5865F2] transition duration-300">DISCORD</a></div>
        <p className="mt-14 text-zinc-800 text-[10px] font-mono tracking-[0.2em] uppercase">© {new Date().getFullYear()} KrProgram. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

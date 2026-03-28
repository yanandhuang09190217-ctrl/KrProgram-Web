import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // 安全取出圖示
  const getIcon = (name) => {
    const IconComponent = LucideIcons[name];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : <span />;
  };

  const { 
    Github, ExternalLink, Code2, Terminal, ChevronRight, Mail, 
    Sparkles, Code, GraduationCap, Bot, BadgeDollarSign, CheckCircle2, 
    Zap, Star, Server, Users, Activity, MessageSquare, CreditCard, 
    Settings, Rocket, ChevronDown, HelpCircle, Layers,
    Ticket, ShoppingCart, ShieldCheck, Gamepad2, HeartHandshake, Eye, CodeXml,
    Cpu, Globe, TerminalSquare, Database
  } = LucideIcons;

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = ['home', 'features', 'advantages', 'workflow', 'pricing', 'faq'];
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && scrollY >= el.offsetTop - 300) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const projects = [
    { title: '幻小月 (Huan-Yue)', role: '幻悅陪伴所常駐工程師', description: '一個專注於服務、商城、遊戲社群製作的客製化機器人', iconName: 'Terminal', link: 'https://discord.gg/AjmaRwrw4m' }
  ];

  const technicalSkills = [
    { name: 'Python (Discord.py / Nextcord)', percent: 85, fromColor: 'from-cyan-400', toColor: 'to-blue-500' },
    { name: 'JavaScript / React', percent: 15, fromColor: 'from-purple-400', toColor: 'to-pink-500' }
  ];

  const stats = [
    { label: '系統穩定度', value: '99.9%', icon: <Activity className="w-6 h-6 text-emerald-400" /> },
    { label: '客製化程度', value: '100%', icon: <Settings className="w-6 h-6 text-cyan-400" /> },
    { label: '專注服務', value: '1 V 1', icon: <Users className="w-6 h-6 text-purple-400" /> }
  ];

  const botFeatures = [
    { title: '客服表單系統 (Ticket)', desc: '支援多按鈕開啟、自動建立私密頻道與對話紀錄存檔，提升客服效率。', icon: <Ticket className="w-6 h-6 text-cyan-400" /> },
    { title: '虛擬經濟與商城', desc: '客製化貨幣名稱、每日簽到、轉帳與實體/虛擬商品兌換功能。', icon: <ShoppingCart className="w-6 h-6 text-emerald-400" /> },
    { title: '進階防護機制', desc: '防洗頻、防惡意翻群、自動封鎖危險連結，24 小時守護社群安全。', icon: <ShieldCheck className="w-6 h-6 text-purple-400" /> },
    { title: '趣味互動模組', desc: 'RPG 抽卡、猜拳、運勢占卜等客製化小遊戲，活絡伺服器氣氛。', icon: <Gamepad2 className="w-6 h-6 text-yellow-400" /> }
  ];

  const advantages = [
    { title: '專注傾聽需求', desc: '沒有大公司的制式客服，由開發者本人直接與您溝通，確保精準命中痛點。', icon: <HeartHandshake className="w-8 h-8 text-rose-400" /> },
    { title: '價格透明不亂喊', desc: '依據功能複雜度實報實銷，事前提供明確報價單，絕不在中途加價。', icon: <Eye className="w-8 h-8 text-cyan-400" /> },
    { title: '完整原始碼交付', desc: '旗艦專案提供完整機器人 Source Code，資產永遠掌握在自己手裡。', icon: <CodeXml className="w-8 h-8 text-emerald-400" /> }
  ];

  const workflows = [
    { step: '01', title: 'REQUIREMENTS', subtitle: '需求討論', desc: '確認機器人功能、指令細節與環境。', icon: <MessageSquare /> },
    { step: '02', title: 'QUOTATION', subtitle: '報價與訂金', desc: '確認開發金額、交期與前期訂金。', icon: <CreditCard /> },
    { step: '03', title: 'DEVELOPMENT', subtitle: '開發與測試', desc: '專屬測試伺服器，親自試用調整。', icon: <Settings /> },
    { step: '04', title: 'DEPLOYMENT', subtitle: '上線與交付', desc: '正式上線，交付原始碼並提供保固。', icon: <Rocket /> }
  ];

  const pricingPlans = [
    { name: '基礎小精靈', badge: 'v1.0', price: '800', theme: 'blue', popular: false, iconName: 'Bot', features: ['自訂歡迎 / 離開圖片訊息', '基礎管理指令 (踢出/禁言/清訊息)', '自訂關鍵字自動回覆', '簡單身分組發放系統', '不需資料庫之輕量功能'] },
    { name: '專業管家', badge: 'v2.0', price: '10,000', theme: 'cyan', popular: true, iconName: 'Cpu', features: ['包含所有「基礎版」功能', '客服表單 (Ticket) 創建系統', '經濟 / 等級 / 經驗值系統', '外部 API 串接 (如：遊戲戰績)', '專屬 SQLite/JSON 資料庫'] },
    { name: '旗艦商城', badge: 'v3.0', price: '20,000', theme: 'emerald', popular: false, iconName: 'Star', features: ['包含所有「專業版」功能', 'Discord 商城 / 虛擬貨幣交易', '進階資料庫 (MongoDB/MySQL)', '高階防翻群 / 驗證防護系統', '原始碼提供與優先除錯'] }
  ];

  const hostingPlans = [
    { name: '輕量掛機', price: '200', period: '/月', theme: 'blue', iconName: 'Server', features: ['24/7 穩定運行', '適合無資料庫之機器人', '基礎運算資源', '免費次要更新部署'] },
    { name: '進階效能', price: '500', period: '/月', theme: 'purple', popular: true, iconName: 'Activity', features: ['支援 SQLite/JSON 資料庫', '中等流量群組適用', '自動定期備份資料', '優先維護與重啟'] },
    { name: '尊榮專屬', price: '1,200', period: '/月', theme: 'emerald', popular: false, iconName: 'Globe', features: ['專屬獨立虛擬主機 (VPS)', '支援 MongoDB 大型資料庫', '無限制流量與高效能', '即時監控與完整日誌'] }
  ];

  const faqs = [
    { q: '機器人需要我另外租伺服器來掛機嗎？', a: '您可以自行尋找主機掛機，或者使用我提供的「伺服器代管服務」（每月 200 元起）。我會幫您處理所有環境架設、24 小時監控與後續的程式碼更新，讓您完全免除煩惱。' },
    { q: '如果 Discord 更新導致機器人壞掉，會幫忙修嗎？', a: '絕對會！只要是本工作室開發的機器人，在保固期內若因 Discord 官方 API 更新導致的非人為故障，皆提供免費修復支援。' },
    { q: '我可以分期付款嗎？', a: '大型專案（如旗艦商城）支援階段性付款：簽約時支付訂金 50%，測試伺服器確認功能無誤後，再支付尾款 50%，保障雙方權益。' },
    { q: '後續如果想增加新功能怎麼辦？', a: '歡迎隨時討論！我會根據新功能的複雜度進行單獨評估與報價，而且老客戶絕對享有額外折扣優惠。' }
  ];

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // 取得方案專屬的樣式設定，保持大圓角與柔和科技感
  const getPlanStyles = (theme) => {
    const themes = {
      cyan: {
        card: 'border-cyan-500/30 shadow-[0_0_40px_rgba(34,211,238,0.1)] md:-translate-y-4 md:hover:-translate-y-6 z-10',
        topBar: 'from-blue-500 via-cyan-400 to-blue-500 opacity-100',
        iconBg: 'bg-cyan-500/10 border-cyan-500/30',
        iconColor: 'text-cyan-400',
        button: 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] border-transparent',
        check: 'text-cyan-400'
      },
      purple: {
        card: 'border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.1)] md:-translate-y-4 md:hover:-translate-y-6 z-10',
        topBar: 'from-purple-600 via-fuchsia-400 to-purple-600 opacity-100',
        iconBg: 'bg-purple-500/10 border-purple-500/30',
        iconColor: 'text-purple-400',
        button: 'bg-purple-500 text-white hover:bg-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] border-transparent',
        check: 'text-purple-400'
      },
      blue: {
        card: 'border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] hover:-translate-y-2',
        topBar: 'from-cyan-600/50 to-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
        iconBg: 'bg-white/5 border-white/5 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-colors',
        iconColor: 'text-zinc-500 group-hover:text-cyan-400',
        button: 'bg-transparent border border-white/10 text-zinc-400 group-hover:border-cyan-500/50 group-hover:text-cyan-400 hover:bg-cyan-500/10',
        check: 'text-zinc-600 group-hover:text-cyan-400 transition-colors'
      },
      emerald: {
        card: 'border-white/5 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:-translate-y-2',
        topBar: 'from-emerald-600/50 to-emerald-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
        iconBg: 'bg-white/5 border-white/5 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors',
        iconColor: 'text-zinc-500 group-hover:text-emerald-400',
        button: 'bg-transparent border border-white/10 text-zinc-400 group-hover:border-emerald-500/50 group-hover:text-emerald-400 hover:bg-emerald-500/10',
        check: 'text-zinc-600 group-hover:text-emerald-400 transition-colors'
      }
    };
    return themes[theme] || themes.blue;
  };

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-300 selection:bg-cyan-500/30 overflow-x-hidden relative cursor-none" style={{ fontFamily: "'Inter', 'Noto Sans TC', sans-serif" }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=JetBrains+Mono:wght@400;700;800&family=Noto+Sans+TC:wght@400;500;700;900&display=swap');
        * { cursor: none !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        
        /* 科技感點陣網格 */
        .tech-dots {
          background-image: radial-gradient(rgba(34, 211, 238, 0.15) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        /* 動態掃描線 */
        @keyframes scan-beam {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { top: 110%; opacity: 0; }
        }
        .animate-scan-beam {
          animation: scan-beam 8s linear infinite;
        }
        
        /* 動畫 */
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        .animate-shimmer { animation: shimmer 2.5s infinite linear; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        
        /* 柔和發光 */
        .text-glow-cyan { text-shadow: 0 0 20px rgba(34, 211, 238, 0.5); }
      `}} />

      {/* === 背景科技元素層 === */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* 點陣網格 */}
        <div className="absolute inset-0 tech-dots opacity-40 mix-blend-screen mask-image: linear-gradient(to bottom, transparent, black, transparent)"></div>
        {/* 暗化遮罩，讓畫面聚焦在中間 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020202_80%)]"></div>
        {/* 雷射掃描線 */}
        <div className="absolute w-full h-[2px] bg-cyan-400/30 shadow-[0_0_15px_#22d3ee] animate-scan-beam blur-[1px]"></div>
        
        {/* 漂浮光暈 */}
        <div className="absolute top-1/4 -left-[20%] w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-[10s]"></div>
        <div className="absolute bottom-1/4 -right-[20%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[8s]"></div>
      </div>

      {/* 電腦版兩側 HUD 抬頭顯示裝飾 */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-8 z-0 hidden xl:flex opacity-30 pointer-events-none mix-blend-screen">
        <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
        <div className="font-mono text-[10px] text-cyan-400 -rotate-90 tracking-[0.4em] whitespace-nowrap">SYS.CORE_READY // V.24.1</div>
        <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
      </div>
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-8 z-0 hidden xl:flex opacity-30 pointer-events-none mix-blend-screen">
        <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent"></div>
        <div className="flex flex-col gap-2 text-purple-400">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400/50"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400/20"></div>
        </div>
        <div className="font-mono text-[10px] text-purple-400 rotate-90 tracking-[0.3em] whitespace-nowrap mt-16">SECURE_CONNECTION</div>
      </div>

      {/* 超靈敏游標 */}
      <div className={`fixed top-0 left-0 pointer-events-none z-[100] transition-all duration-75 ease-out flex items-center justify-center rounded-full mix-blend-screen hidden md:flex border border-cyan-400/40 ${isHovering ? 'bg-cyan-500/10 scale-[1.8] backdrop-blur-[1px]' : ''}`} style={{ width: '32px', height: '32px', transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)` }}>
         {isHovering && <div className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>}
      </div>
      <div className="fixed top-0 left-0 pointer-events-none z-[100] w-1.5 h-1.5 bg-cyan-400 rounded-full hidden md:block shadow-[0_0_8px_#22d3ee]" style={{ transform: `translate(${mousePos.x - 3}px, ${mousePos.y - 3}px)` }} />

      {/* 頂部導覽列 */}
      <nav className="fixed top-0 w-full z-50 bg-[#020202]/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 transition duration-300 cursor-none drop-shadow-md" onClick={() => scrollTo('home')} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            KrProgram<span className="text-cyan-400 animate-blink">_</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest">
            {['home', 'features', 'advantages', 'workflow', 'pricing'].map((id, index) => (
              <button key={id} onClick={() => scrollTo(id)} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className={`transition-all duration-300 flex flex-col items-center group relative ${activeSection === id ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-zinc-500 hover:text-zinc-300'}`}>
                <span className="font-mono text-[9px] uppercase mb-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  {id === 'home' ? 'HOME' : id === 'features' ? 'FEATURES' : id === 'advantages' ? 'SPECS' : id === 'workflow' ? 'PROCESS' : 'PLANS'}
                </span>
                <span>
                  {id === 'home' ? '首頁' : id === 'features' ? '核心模組' : id === 'advantages' ? '開發優勢' : id === 'workflow' ? '部署流程' : '方案與授權'}
                </span>
                {/* 導航列光暈底線 */}
                <div className={`absolute -bottom-[2px] w-full h-[2px] bg-cyan-400 blur-[2px] transition-all duration-300 ${activeSection === id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 首頁 Hero 區塊 */}
      <section id="home" className="relative pt-36 pb-20 px-6 min-h-screen flex flex-col items-center justify-center text-center z-10">
        
        {/* 系統狀態小標記 */}
        <div className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(34,211,238,0.1)] backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          系統運作正常 // PORT: 8080
        </div>

        <div className="relative mb-8 group animate-float" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition duration-700 animate-pulse"></div>
          
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-[#050505] border border-cyan-500/30 overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.2)] flex items-center justify-center p-1 z-10">
             <img src="https://i.postimg.cc/pLm8hxSD/avatar.png" alt="Profile" className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition duration-500 ease-out" />
          </div>
          
          {/* 外圍科技圓環與雷達 */}
          <svg className="absolute -inset-8 w-[calc(100%+64px)] h-[calc(100%+64px)] animate-[spin_15s_linear_infinite] opacity-50 pointer-events-none z-0" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#22d3ee" strokeWidth="0.3" strokeDasharray="2 4" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="15 15 5 15" />
            <path d="M 50 2 L 50 8 M 50 92 L 50 98 M 2 50 L 8 50 M 92 50 L 98 50" stroke="#8b5cf6" strokeWidth="1" />
          </svg>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 text-glow-cyan z-10">KrProgram</h1>
        
        <div className="flex items-center justify-center gap-2 mb-10 text-cyan-400 font-bold text-xl md:text-2xl drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] tracking-wide z-10">
          <span className="text-zinc-500 font-mono font-light text-lg">{"<"}</span> 成為你商城路上的得力機器人助手 <span className="text-zinc-500 font-mono font-light text-lg">{"/>"}</span>
        </div>

        {/* 終端機打字特效 */}
        <div className="w-full max-w-lg mx-auto bg-[#0a0a0a]/80 border border-white/10 rounded-2xl mb-12 text-left font-mono text-sm md:text-base shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden z-10" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_5px_#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_5px_#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_5px_#27c93f]"></div>
            <div className="ml-2 text-[10px] text-zinc-500 tracking-widest uppercase">bash // krprogram</div>
          </div>
          <div className="p-5 space-y-2.5">
            <div className="text-cyan-400">krprogram@root:~$ <span className="text-zinc-300">npm start bot-engine</span></div>
            <div className="text-zinc-500">▶ 正在初始化核心模組... <span className="text-cyan-500/50">[完成]</span></div>
            <div className="text-zinc-500">▶ 正在載入必要環境... <span className="text-cyan-500/50">[完成]</span></div>
            <div className="text-blue-400 font-bold">✔ 資料庫連線已建立。</div>
            <div className="text-emerald-400 font-bold flex items-center gap-2 mt-2">
              系統已準備就緒，隨時為您服務 <span className="w-2.5 h-5 bg-emerald-400 animate-blink inline-block"></span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-5 z-10">
          <button onClick={() => scrollTo('pricing')} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="group relative flex items-center gap-2 px-8 py-4 bg-cyan-500 text-[#050505] rounded-2xl font-black hover:bg-cyan-400 active:scale-95 transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)] tracking-wide">
            <span className="relative z-10 flex flex-col items-center leading-tight">
              <span className="font-mono text-[10px] uppercase opacity-70">Start Project</span>
              <span>啟動專案</span>
            </span>
            <Terminal className="w-5 h-5 relative z-10 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="https://github.com/yanandhuang09190217-ctrl" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="flex items-center justify-center w-[72px] h-[72px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all"><Github className="w-6 h-6 text-zinc-300" /></a>
        </div>
      </section>

      {/* 數據統計區塊 */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-4 text-center group">
              <div className="text-4xl font-black text-white mb-2 tracking-tighter group-hover:text-glow-cyan transition-all duration-300 font-mono">{stat.value}</div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">
                {stat.icon} {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 機器人核心功能展示 */}
      <section id="features" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center gap-4 tracking-tight">
              <span className="text-cyan-500 font-mono text-2xl">{"//"}</span> 核心模組功能 <span className="animate-blink text-cyan-500 font-mono">_</span>
            </h2>
            <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">SYS.MODULES_LOADED: 4</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {botFeatures.map((feat, i) => (
              <div key={i} className="flex gap-6 p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-cyan-500/40 hover:bg-cyan-500/5 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] transition-all duration-300 group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="shrink-0">
                  <div className="p-4 bg-black/50 border border-white/5 rounded-2xl shadow-inner group-hover:scale-110 group-hover:border-cyan-500/30 transition-all">
                    {feat.icon}
                  </div>
                </div>
                <div className="relative w-full">
                  <div className="absolute top-0 right-0 font-mono text-[9px] text-zinc-700 tracking-widest">[DATA.SET]</div>
                  <h3 className="text-xl font-bold text-zinc-100 mb-3 tracking-wide mt-1">
                    {feat.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 技能與專案 */}
      <section id="skills" className="py-24 px-6 relative z-10 border-t border-white/5 bg-gradient-to-b from-[#020202] to-[#050505]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center gap-4 tracking-tight">
              <span className="text-blue-500 font-mono text-2xl">{"//"}</span> 開發技術與實績 <span className="animate-blink text-blue-500 font-mono">_</span>
            </h2>
            <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">SYS.TECH_STACK_READY</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6 text-left">
              <h3 className="text-sm font-bold text-zinc-500 flex items-center gap-2 tracking-[0.2em] uppercase mb-6 font-mono"><TerminalSquare className="w-4 h-4 text-blue-500" /> root/projects</h3>
              {projects.map((p, i) => (
                <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500 group relative overflow-hidden" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-6 right-6 font-mono text-[9px] text-blue-500/30 tracking-widest border border-blue-500/20 px-2 py-1 rounded">ACTIVE</div>
                  <h4 className="text-2xl font-black text-zinc-100 mb-2 flex items-center gap-2 relative z-10 tracking-wide">{p.title} <a href={p.link} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition translate-x-1" /></a></h4>
                  <p className="text-blue-400 text-xs font-bold mb-5 relative z-10 tracking-[0.1em] uppercase font-mono">{p.role}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed relative z-10">{p.description}</p>
                </div>
              ))}
            </div>
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-10 text-left relative overflow-hidden backdrop-blur-sm">
              <div className="absolute -right-10 -top-10 text-cyan-500/5 rotate-12 pointer-events-none"><Database size={150} /></div>
              <h3 className="text-sm font-bold text-zinc-500 flex items-center gap-2 tracking-[0.2em] uppercase mb-2 font-mono"><Code2 className="w-4 h-4 text-cyan-500" /> root/skills</h3>
              {technicalSkills.map((s, i) => (
                <div key={i} className="relative z-10">
                  <div className="flex justify-between text-xs font-bold mb-3 uppercase tracking-wider text-zinc-300"><span>{s.name}</span><span className="font-mono text-cyan-400">{s.percent}%</span></div>
                  <div className="h-2 bg-black rounded-full overflow-hidden relative border border-white/10 shadow-inner">
                    <div className={`absolute inset-y-0 left-0 bg-gradient-to-r ${s.fromColor} ${s.toColor} rounded-full transition-all duration-1000 ease-out`} style={{ width: isLoaded ? `${s.percent}%` : '0%' }}>
                      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 我的開發優勢 */}
      <section id="advantages" className="py-24 px-6 relative z-10 border-t border-white/5 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center gap-4 tracking-tight">
              <span className="text-purple-500 font-mono text-2xl">{"//"}</span> 選擇我的優勢 <span className="animate-blink text-purple-500 font-mono">_</span>
            </h2>
            <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">WHY_CHOOSE_KR</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((adv, i) => (
              <div key={i} className="flex flex-col items-start text-left p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-purple-500/40 hover:bg-purple-900/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-300 relative overflow-hidden" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
                <div className="mb-6 p-4 bg-black/50 rounded-2xl border border-white/5 shadow-inner">
                  {adv.icon}
                </div>
                <h3 className="text-xl font-black text-zinc-100 mb-4 tracking-wide">{adv.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed relative z-10">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 合作流程 */}
      <section id="workflow" className="py-24 px-6 relative z-10 border-t border-white/5 bg-gradient-to-b from-[#020202] to-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 inline-flex items-center gap-4 tracking-tight">
              <span className="text-emerald-500 font-mono text-2xl">{"//"}</span> 開發部署流程 <span className="animate-blink text-emerald-500 font-mono">_</span>
            </h2>
            <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">SYS.DEPLOY_WORKFLOW</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/40 to-emerald-500/10 z-0 blur-[1px]"></div>
            <div className="hidden md:block absolute top-[41px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-emerald-500/30 via-cyan-500/80 to-emerald-500/30 z-0"></div>
            
            {workflows.map((flow, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="w-20 h-20 bg-[#050505] border-2 border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:border-emerald-500/60 group-hover:bg-emerald-500/10 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-500 text-zinc-500 group-hover:text-emerald-400">
                  {flow.icon}
                </div>
                <div className="text-emerald-500 font-bold font-mono text-xs mb-1 opacity-80 tracking-widest uppercase">{flow.title}</div>
                <h3 className="text-lg font-black text-zinc-100 mb-2 tracking-wide">{flow.subtitle}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed max-w-[180px]">{flow.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 價目表與伺服器代管 */}
      <section id="pricing" className="py-24 px-6 relative z-10 border-t border-white/5 bg-[#050505]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 inline-flex items-center gap-4 tracking-tight">
              <span className="text-cyan-500 font-mono text-2xl">{"//"}</span> 方案與授權 <span className="animate-blink text-cyan-500 font-mono">_</span>
            </h2>
            <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">LICENSING_PLANS</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan, i) => {
              const styles = getPlanStyles(plan.theme);
              return (
                <div key={i} className={`group flex flex-col p-8 bg-white/[0.02] rounded-[2rem] transition-all duration-500 text-left relative overflow-hidden border backdrop-blur-md ${styles.card}`} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  {plan.popular && <div className="absolute top-0 right-0 bg-cyan-500/20 text-cyan-300 text-[10px] font-black px-4 py-2 font-mono tracking-widest uppercase rounded-bl-2xl z-20">Recommended</div>}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${styles.topBar}`}></div>
                  
                  <div className={`mb-6 w-fit p-3.5 rounded-2xl border shadow-inner ${styles.iconBg}`}>
                    <div className={styles.iconColor}>{getIcon(plan.iconName)}</div>
                  </div>
                  <div className="text-xs font-mono text-zinc-500 mb-1 tracking-widest">MODULE {plan.badge}</div>
                  <h3 className="text-2xl font-black text-zinc-100 mb-6 tracking-wide">{plan.name}</h3>
                  
                  <div className="mb-10 flex items-baseline gap-1 border-b border-white/10 pb-8"><span className="text-sm font-bold text-zinc-500 font-mono">NT$</span><span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span></div>
                  
                  <ul className="space-y-4 mb-10 flex-grow font-medium">
                    {plan.features.map((f, fi) => <li key={fi} className="flex items-start gap-3 text-sm"><span className={`${styles.check} font-mono text-xs mt-1`}>{">"}</span><span className="text-zinc-300 leading-tight">{f}</span></li>)}
                  </ul>
                  <a href="https://discordapp.com/users/1284764153038503990" target="_blank" rel="noopener noreferrer" className={`flex flex-col items-center justify-center w-full py-4 transition-all duration-300 rounded-2xl ${styles.button}`}>
                    <span className="font-mono text-[10px] uppercase opacity-70 mb-0.5 tracking-widest">Select Plan</span>
                    <span className="font-bold text-sm tracking-widest">選擇方案</span>
                  </a>
                </div>
              );
            })}
          </div>

          {/* 伺服器代管方案 */}
          <div className="mt-32 text-center">
             <div className="mb-12 flex flex-col items-center">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2 inline-flex items-center gap-4 tracking-tight">
                <span className="text-purple-500 font-mono text-xl">{"//"}</span> 伺服器代管 <span className="animate-blink text-purple-500 font-mono">_</span>
              </h3>
              <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">SERVER_HOSTING</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
              {hostingPlans.map((plan, i) => {
                const styles = getPlanStyles(plan.theme);
                return (
                  <div key={i} className={`group flex flex-col p-6 bg-white/[0.02] rounded-3xl transition-all duration-300 relative border backdrop-blur-md ${styles.card}`} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                    {plan.popular && <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-300 text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-bl-xl z-20">熱門選擇</div>}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${styles.topBar}`}></div>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3.5 rounded-xl border shadow-inner ${styles.iconBg}`}>
                        <div className={styles.iconColor}>{getIcon(plan.iconName)}</div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-zinc-100 font-mono tracking-wide">{plan.name}</h4>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-xs font-bold text-zinc-500 font-mono">NT$</span>
                          <span className="text-3xl font-black text-white tracking-tighter">{plan.price}</span>
                          <span className="text-xs font-bold text-zinc-500 font-mono">{plan.period}</span>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-3 flex-grow font-medium">
                      {plan.features.map((f, fi) => <li key={fi} className="flex items-center gap-3 text-xs"><span className={`${styles.check} font-mono text-[10px]`}>{">"}</span><span className="text-zinc-300">{f}</span></li>)}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 常見問題 FAQ */}
      <section id="faq" className="py-24 px-6 relative z-10 border-t border-white/5 bg-[#020202]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 inline-flex items-center gap-4 tracking-tight">
              <span className="text-blue-500 font-mono text-2xl">{"//"}</span> 常見問題 FAQ <span className="animate-blink text-blue-500 font-mono">_</span>
            </h2>
            <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">SYSTEM.LOG // HELP</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-white/[0.02] border border-white/5 rounded-2xl transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-base text-zinc-200 tracking-wide flex items-center gap-3">
                    <span className="text-blue-500 opacity-60 font-mono">Q{i+1}</span> {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-blue-400' : ''}`} />
                </button>
                <div className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-zinc-400 text-sm leading-relaxed border-t border-white/10 pt-5">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 聯絡 CTA */}
      <section className="py-24 px-6 relative z-10 text-center border-t border-white/5 bg-[#050505]">
        <div className="max-w-4xl mx-auto p-12 md:p-16 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#050505] to-[#050505] border border-cyan-900/30 rounded-[3rem] shadow-[0_0_80px_rgba(34,211,238,0.05)] relative overflow-hidden">
          {/* 內部點綴光效 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          
          <div className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase mb-6 flex justify-center items-center gap-2">
             <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></span> SYSTEM READY
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">準備好啟動專案了嗎？</h2>
          <p className="text-zinc-400 mb-12 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">不論是簡單的管理模組，還是高度客製化的商城系統，<br className="hidden md:block" />我們都能為您建置最穩定的伺服器核心。</p>
          <a href="https://discordapp.com/users/1284764153038503990" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="inline-flex items-center gap-3 px-10 py-4 bg-cyan-500 text-black rounded-2xl hover:bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300">
            <Mail className="w-5 h-5" />
            <span className="flex flex-col items-start leading-tight">
              <span className="font-mono text-[10px] font-black tracking-widest uppercase opacity-70">Initialize Contact</span>
              <span className="font-bold text-base tracking-wide">啟動專案對話</span>
            </span>
          </a>
        </div>
      </section>

      {/* 頁尾 */}
      <footer className="py-12 text-center border-t border-white/5 bg-[#020202]">
        <div className="text-2xl font-black text-zinc-100 mb-4 tracking-wider">KrProgram<span className="text-cyan-500">_</span></div>
        <div className="flex justify-center gap-10 text-zinc-600 text-xs font-black tracking-widest font-mono mb-8">
          <a href="https://github.com/yanandhuang09190217-ctrl" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition duration-300">GITHUB</a>
          <span className="text-zinc-800">|</span>
          <a href="https://discordapp.com/users/1284764153038503990" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition duration-300">DISCORD</a>
        </div>
        <p className="text-zinc-700 text-[10px] font-mono tracking-[0.2em] uppercase">© {new Date().getFullYear()} KrProgram. 版權所有.</p>
      </footer>
    </div>
  );
}

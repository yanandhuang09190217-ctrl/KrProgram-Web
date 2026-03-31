import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, ExternalLink, Code2, Terminal, Mail, 
  Code, Bot, CheckCircle2, Star, Server, Users, Activity, 
  MessageSquare, CreditCard, Settings, Rocket, ChevronDown, 
  Ticket, ShoppingCart, ShieldCheck, Gamepad2, Eye,
  Cpu, Globe, Database, Monitor, MessageCircle, 
  Command, PlayCircle, Coins, Plus, Layout, MonitorSmartphone, Cloud
} from 'lucide-react';

// ==========================================
// 🚀 靜態資料區 (移到元件外部，避免重複渲染消耗效能)
// ==========================================
const iconMap: Record<string, any> = {
  Bot, Cpu, Star, Server, Activity, Globe, Terminal, Layout, MonitorSmartphone, Cloud, Database
};

const getIcon = (name: string) => {
  const IconComp = iconMap[name];
  return IconComp ? <IconComp className="w-6 h-6" /> : <div className="w-6 h-6" />;
};

const SafeIcon = ({ icon: IconComp, className }: any) => {
  return IconComp ? <IconComp className={className} /> : <span className={className}></span>;
};

const generateHexId = () => Math.random().toString(16).substr(2, 4).toUpperCase();

const projects = [
  { title: '幻小月 (Huan-Yue)', role: '幻悅陪伴所常駐工程師', description: '一個專注於服務、商城、遊戲社群製作的客製化機器人', iconName: 'Terminal', link: 'https://discord.gg/AjmaRwrw4m', hex: generateHexId() }
];

const technicalSkills = [
  { name: 'Python (Discord.py / Nextcord)', percent: 85, fromColor: 'from-cyan-400', toColor: 'to-blue-500' },
  { name: 'JavaScript / React', percent: 25, fromColor: 'from-purple-400', toColor: 'to-pink-500' }
];

const stats = [
  { label: '系統穩定度', value: '99.9%', icon: <SafeIcon icon={Activity} className="w-5 h-5 text-emerald-400" /> },
  { label: '客製化程度', value: '100%', icon: <SafeIcon icon={Settings} className="w-5 h-5 text-cyan-400" /> },
  { label: '專注服務', value: '1 V 1', icon: <SafeIcon icon={Users} className="w-5 h-5 text-purple-400" /> }
];

const botFeatures = [
  { title: '客服表單系統 (Ticket)', desc: '支援多按鈕開啟、自動建立私密頻道與對話紀錄存檔，提升客服效率。', icon: <SafeIcon icon={Ticket} className="w-6 h-6 text-cyan-400" />, hex: generateHexId() },
  { title: '虛擬經濟與商城', desc: '客製化貨幣名稱、每日簽到、轉帳與實體/虛擬商品兌換功能。', icon: <SafeIcon icon={ShoppingCart} className="w-6 h-6 text-emerald-400" />, hex: generateHexId() },
  { title: '進階防護機制', desc: '防洗頻、防惡意翻群、自動封鎖危險連結，24 小時守護社群安全。', icon: <SafeIcon icon={ShieldCheck} className="w-6 h-6 text-purple-400" />, hex: generateHexId() },
  { title: '趣味互動模組', desc: 'RPG 抽卡、猜拳、運勢占卜等客製化小遊戲，活絡伺服器氣氛。', icon: <SafeIcon icon={Gamepad2} className="w-6 h-6 text-yellow-400" />, hex: generateHexId() }
];

const integrations = [
  { title: 'OpenAI API', desc: '導入 ChatGPT 智慧對話', icon: <SafeIcon icon={MessageCircle} className="w-6 h-6 text-emerald-400" />, border: 'border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:border-emerald-400/80' },
  { title: 'Game APIs', desc: '串接 Riot/Steam 戰績查詢', icon: <SafeIcon icon={Gamepad2} className="w-6 h-6 text-blue-400" />, border: 'border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-blue-400/80' },
  { title: 'Webhooks', desc: 'Twitch/YouTube 直播推播', icon: <SafeIcon icon={PlayCircle} className="w-6 h-6 text-red-400" />, border: 'border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:border-red-400/80' },
  { title: 'Payment APIs', desc: '綠界/藍新金流自動贊助', icon: <SafeIcon icon={Coins} className="w-6 h-6 text-yellow-400" />, border: 'border-yellow-500/40 hover:shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:border-yellow-400/80' },
];

const advantages = [
  { title: '專注傾聽需求', desc: '沒有大公司的制式客服，由開發者本人直接與您溝通，確保精準命中痛點。', icon: <SafeIcon icon={MessageCircle} className="w-7 h-7 text-cyan-400" />, hex: generateHexId() },
  { title: '價格透明不亂喊', desc: '依據功能複雜度實報實銷，事前提供明確報價單，絕不在中途加價。', icon: <SafeIcon icon={Eye} className="w-7 h-7 text-purple-400" />, hex: generateHexId() },
  { title: '完整原始碼交付', desc: '旗艦專案提供完整 Source Code，您的數位資產永遠掌握在自己手裡。', icon: <SafeIcon icon={Code} className="w-7 h-7 text-emerald-400" />, hex: generateHexId() }
];

const workflows = [
  { step: '01', title: 'REQUIREMENTS', subtitle: '需求討論', desc: '確認專案功能、UI風格與伺服器環境。', icon: <SafeIcon icon={MessageSquare} /> },
  { step: '02', title: 'QUOTATION', subtitle: '報價與訂金', desc: '確認開發金額、交期與前期訂金。', icon: <SafeIcon icon={CreditCard} /> },
  { step: '03', title: 'DEVELOPMENT', subtitle: '開發與測試', desc: '提供專屬測試連結，親自試用調整。', icon: <SafeIcon icon={Settings} /> },
  { step: '04', title: 'DEPLOYMENT', subtitle: '上線與交付', desc: '正式部屬上線，交付程式碼並提供保固。', icon: <SafeIcon icon={Rocket} /> }
];

// --- 機器人專屬方案 ---
const botPricingPlans = [
  { name: '基礎小精靈', badge: 'v1.0', price: '800', theme: 'blue', popular: false, iconName: 'Bot', features: ['自訂歡迎 / 離開圖片訊息', '基礎管理指令 (踢出/禁言/清訊息)', '自訂關鍵字自動回覆', '簡單身分組發放系統', '不需資料庫之輕量功能'] },
  { name: '專業管家', badge: 'v2.0', price: '10,000', theme: 'cyan', popular: true, iconName: 'Cpu', features: ['包含所有「基礎版」功能', '客服表單 (Ticket) 創建系統', '經濟 / 等級 / 經驗值系統', '外部 API 串接 (如：遊戲戰績)', '專屬 SQLite/JSON 資料庫'] },
  { name: '旗艦商城', badge: 'v3.0', price: '20,000', theme: 'emerald', popular: false, iconName: 'Star', features: ['包含所有「專業版」功能', 'Discord 商城 / 虛擬貨幣交易', '進階資料庫 (MongoDB/MySQL)', '高階防翻群 / 驗證防護系統', '原始碼提供與優先除錯'] }
];

const botHostingPlans = [
  { name: '輕量掛機', price: '200', period: '/月', theme: 'blue', iconName: 'Server', features: ['24/7 穩定運行', '適合無資料庫之機器人', '基礎運算資源', '免費次要更新部署'] },
  { name: '進階效能', price: '500', period: '/月', theme: 'purple', popular: true, iconName: 'Activity', features: ['支援 SQLite/JSON 資料庫', '中等流量群組適用', '自動定期備份資料', '優先維護與重啟'] },
  { name: '尊榮專屬', price: '1,200', period: '/月', theme: 'emerald', popular: false, iconName: 'Globe', features: ['專屬獨立虛擬主機 (VPS)', '支援 MongoDB 大型資料庫', '無限制流量與高效能', '即時監控與完整日誌'] }
];

// --- 網頁設計專屬方案 ---
const webPricingPlans = [
  { name: '單頁形象官網', badge: 'Landing', price: '5,000', theme: 'blue', popular: false, iconName: 'Layout', features: ['RWD 響應式手機版設計', '現代化滾動與進入動畫', '聯絡表單與社群連結整合', '適合個人履歷/工作室展示', '享有「免費代管」極大優勢'] },
  { name: '多頁企業網站', badge: 'Corporate', price: '15,000', theme: 'cyan', popular: true, iconName: 'MonitorSmartphone', features: ['包含單頁版所有視覺功能', '多頁面路由 (關於/服務/作品)', '基礎 SEO 搜尋引擎優化設計', '整合 Google Analytics 追蹤', '輕量級系統狀態或資料展示'] },
  { name: '全端系統級應用', badge: 'Full-Stack', price: '35,000', theme: 'emerald', popular: false, iconName: 'Database', features: ['高階客製化前端互動介面', '會員註冊登入與權限系統', '專屬客製化後台管理介面', '獨立資料庫架設 (SQL/NoSQL)', '金流 / 第三方 API 深度串接'] }
];

const webHostingPlans = [
  { name: '靜態邊緣節點', price: '0', period: '/月', theme: 'blue', popular: false, iconName: 'Cloud', features: ['採用 Vercel 全球 CDN 節點', '自動發放免費 SSL 安全憑證', '超快的靜態頁面載入速度', '適合無後端之形象網站'] },
  { name: '全端雲端主機', price: '300', period: '/月', theme: 'purple', popular: true, iconName: 'Server', features: ['專屬 Node.js 執行環境', '包含基礎資料庫儲存空間', '自動化部屬與 24/7 連線監控', '適合中小型動態資料網站'] },
  { name: '企業級獨立 VPS', price: '1,000', period: '/月', theme: 'emerald', popular: false, iconName: 'Globe', features: ['獨享高規格 CPU 運算資源', '支援大型關聯式資料庫存取', '無限制流量與完整後台權限', '最高級別的客製化資安防護'] }
];

const faqs = [
  { q: '機器人/網頁需要我另外租伺服器來掛機嗎？', a: '您可以自行尋找主機，或者使用我提供的「伺服器代管服務」。若是單純的形象網頁，我甚至可以幫您串接 Vercel 提供永久免費的頂級代管服務！' },
  { q: '如果 API 更新導致功能壞掉，會幫忙修嗎？', a: '絕對會！只要是本工作室開發的專案，在保固期內若因官方 API 更新導致的非人為故障，皆提供免費修復支援。' },
  { q: '我可以分期付款嗎？', a: '大型專案（如旗艦商城、全端系統）支援階段性付款：簽約時支付訂金 50%，測試伺服器確認功能無誤後，再支付尾款 50%，保障雙方權益。' },
  { q: '後續如果想增加新功能怎麼辦？', a: '歡迎隨時討論！我會根據新功能的複雜度進行單獨評估與報價，而且老客戶絕對享有額外折扣優惠。' }
];

const getPlanStyles = (theme: string) => {
  const themes: any = {
    cyan: {
      card: 'bg-[#030a12]/80 border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] z-10 transform md:-translate-y-4 md:hover:-translate-y-6',
      topBar: 'from-blue-500 via-cyan-400 to-blue-500 opacity-100',
      iconBg: 'bg-cyan-500/10 border-cyan-500/30',
      iconColor: 'text-cyan-400',
      button: 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] border-transparent',
      check: 'text-cyan-400'
    },
    purple: {
      card: 'bg-[#0a0514]/80 border-purple-500/30 hover:border-purple-400/60 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] z-10 transform md:-translate-y-4 md:hover:-translate-y-6',
      topBar: 'from-purple-600 via-fuchsia-400 to-purple-600 opacity-100',
      iconBg: 'bg-purple-500/10 border-purple-500/30',
      iconColor: 'text-purple-400',
      button: 'bg-purple-500 text-white hover:bg-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] border-transparent',
      check: 'text-purple-400'
    },
    emerald: {
      card: 'bg-[#030e09]/80 border-white/10 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:-translate-y-2',
      topBar: 'from-emerald-600/50 to-emerald-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
      iconBg: 'bg-black/50 border-white/10 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors',
      iconColor: 'text-zinc-400 group-hover:text-emerald-400',
      button: 'bg-black/50 border border-white/10 text-zinc-300 group-hover:border-emerald-500/50 group-hover:text-emerald-400 hover:bg-emerald-500/10',
      check: 'text-zinc-600 group-hover:text-emerald-400 transition-colors'
    },
    blue: {
      card: 'bg-[#030610]/80 border-white/10 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:-translate-y-2',
      topBar: 'from-cyan-600/50 to-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
      iconBg: 'bg-black/50 border-white/10 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-colors',
      iconColor: 'text-zinc-400 group-hover:text-blue-400',
      button: 'bg-black/50 border border-white/10 text-zinc-300 group-hover:border-blue-500/50 group-hover:text-blue-400 hover:bg-blue-500/10',
      check: 'text-zinc-600 group-hover:text-blue-400 transition-colors'
    }
  };
  return themes[theme] || themes.blue;
};

// ==========================================
// 主程式區塊
// ==========================================
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [bootState, setBootState] = useState<'booting' | 'fading' | 'ready'>('booting');
  const [bootLogs, setBootLogs] = useState<string[]>(['> SYS.INIT()']);
  
  // 🚀 新增：控制目前顯示的是機器人方案還是網頁方案
  const [pricingMode, setPricingType] = useState<'bot' | 'web'>('bot');

  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);

  const cpuRef = useRef<HTMLSpanElement>(null);
  const ramRef = useRef<HTMLSpanElement>(null);
  const pingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const logs = [
      '> MOUNTING_FILE_SYSTEM... [OK]',
      '> ALLOCATING_MEMORY... [OK]',
      '> ESTABLISHING_SECURE_CONNECTION... [OK]',
      '> BYPASSING_FIREWALL... [SUCCESS]',
      '> LOADING_HOLO_INTERFACE... 100%'
    ];
    
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logs.length) {
        setBootLogs(prev => [...prev, logs[logIndex]]);
        logIndex++;
      }
    }, 250);

    setTimeout(() => {
      clearInterval(logInterval);
      setBootState('fading');
      setTimeout(() => {
        setBootState('ready');
        setIsLoaded(true);
      }, 500); 
    }, 2000);

    const statsInterval = setInterval(() => {
      if (cpuRef.current) cpuRef.current.innerText = String(Math.floor(Math.random() * 5) + 10);
      if (ramRef.current) ramRef.current.innerText = String(Math.floor(Math.random() * 4) + 30);
      if (pingRef.current) pingRef.current.innerText = String(Math.floor(Math.random() * 8) + 20);
    }, 2000);

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
      }
      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }
      if (ambientGlowRef.current) {
        ambientGlowRef.current.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const observerOptions = { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'features', 'demo', 'workflow', 'pricing', 'faq'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      clearInterval(statsInterval);
      clearInterval(logInterval);
    };
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // 動態根據選擇的模式渲染對應的方案陣列
  const currentPricingPlans = pricingMode === 'bot' ? botPricingPlans : webPricingPlans;
  const currentHostingPlans = pricingMode === 'bot' ? botHostingPlans : webHostingPlans;

  return (
    <div className="min-h-screen bg-[#020203] text-zinc-300 selection:bg-cyan-500/30 overflow-x-hidden relative cursor-none" style={{ fontFamily: "'Inter', 'Noto Sans TC', sans-serif" }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=JetBrains+Mono:wght@400;700;800&family=Noto+Sans+TC:wght@400;500;700;900&display=swap');
        * { cursor: none !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        
        .tech-grid {
          background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        .particles-layer {
          background-image: radial-gradient(circle at 15% 50%, rgba(34, 211, 238, 0.1) 2%, transparent 3%),
                            radial-gradient(circle at 85% 30%, rgba(168, 85, 247, 0.08) 2%, transparent 3%),
                            radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.1) 2%, transparent 3%),
                            radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.1) 1.5%, transparent 2%);
          background-size: 80vmax 80vmax;
          animation: particle-drift 30s infinite linear;
          will-change: background-position;
        }
        @keyframes particle-drift {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        
        @keyframes scan-beam {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 110%; opacity: 0; }
        }
        .animate-scan-beam { animation: scan-beam 6s linear infinite; will-change: top; }
        
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        .animate-shimmer { animation: shimmer 2.5s infinite linear; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 1.5s infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-float { animation: float 6s ease-in-out infinite; will-change: transform; }
        
        .glitch-text { position: relative; }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8;
        }
        .glitch-text::before {
          left: 2px; text-shadow: -2px 0 rgba(255,0,0,0.7);
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim 3s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          left: -2px; text-shadow: -2px 0 rgba(0,255,255,0.7);
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim 2.5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% { clip: rect(10px, 9999px, 81px, 0); }
          5% { clip: rect(70px, 9999px, 96px, 0); }
          10% { clip: rect(8px, 9999px, 14px, 0); }
          15% { clip: rect(98px, 9999px, 47px, 0); }
          20% { clip: rect(19px, 9999px, 20px, 0); }
          25% { clip: rect(61px, 9999px, 51px, 0); }
          30% { clip: rect(31px, 9999px, 100px, 0); }
          35% { clip: rect(86px, 9999px, 67px, 0); }
          40%, 100% { clip: rect(0, 0, 0, 0); }
        }

        .text-glow-cyan { text-shadow: 0 0 25px rgba(34, 211, 238, 0.6); }
        .barcode { background: repeating-linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.2) 2px, transparent 2px, transparent 4px); height: 8px; width: 40px; }

        /* 卡片切換淡入動畫 */
        @keyframes fade-slide-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-slide { animation: fade-slide-up 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}} />

      {/* 開機啟動畫面 */}
      {bootState !== 'ready' && (
        <div className={`fixed inset-0 z-[999] bg-[#020203] flex flex-col items-center justify-center p-8 transition-opacity duration-500 ${bootState === 'fading' ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
              <SafeIcon icon={Terminal} className="w-6 h-6 text-cyan-500" />
              <h2 className="text-cyan-500 font-mono font-bold tracking-widest text-lg">KrProgram.OS // BOOT_SEQUENCE</h2>
            </div>
            <div className="space-y-2 font-mono text-sm text-zinc-400">
              {bootLogs.map((log, i) => (
                <div key={i} className="animate-[fade-in_0.1s_ease-out]">{log}</div>
              ))}
              <div className="flex items-center gap-2 mt-4 text-cyan-400">
                <span className="w-2 h-4 bg-cyan-400 animate-blink inline-block"></span>
              </div>
            </div>
            <div className="mt-8 h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4] transition-all duration-[1.5s] ease-out" style={{ width: bootLogs.length === 5 ? '100%' : `${(bootLogs.length / 5) * 100}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {/* 背景光影與粒子層 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 tech-grid opacity-60 mix-blend-screen" style={{ maskImage: 'linear-gradient(to bottom, transparent, black, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black, transparent)' }}></div>
        <div className="absolute inset-0 particles-layer opacity-60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020203_85%)]"></div>
        <div className="absolute top-[10%] -left-[10%] w-[600px] h-[600px] bg-cyan-900/15 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10s] will-change-transform"></div>
        <div className="absolute bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-indigo-900/15 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-[8s] will-change-transform"></div>
      </div>

      {/* 電腦版兩側 HUD */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-8 z-0 hidden xl:flex opacity-40 pointer-events-none mix-blend-screen">
        <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-4 bg-cyan-400 animate-[scan-beam_2s_linear_infinite]"></div>
        </div>
        <div className="font-mono text-[10px] text-cyan-400 -rotate-90 tracking-[0.4em] whitespace-nowrap">SYS.CORE_READY // V.24.1</div>
        <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
      </div>
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-8 z-0 hidden xl:flex opacity-40 pointer-events-none mix-blend-screen">
        <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-4 bg-purple-400 animate-[scan-beam_3s_linear_infinite_reverse]"></div>
        </div>
        <div className="flex flex-col gap-2 text-purple-400">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400/50"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400/20"></div>
        </div>
        <div className="font-mono text-[10px] text-purple-400 rotate-90 tracking-[0.3em] whitespace-nowrap mt-16">SECURE_CONNECTION</div>
      </div>

      {/* 硬體加速游標 */}
      <div 
        ref={cursorOuterRef}
        className={`fixed top-0 left-0 pointer-events-none z-[100] transition-all duration-75 ease-out flex items-center justify-center rounded-full mix-blend-screen hidden md:flex border border-cyan-400/40 will-change-transform ${isHovering ? 'bg-cyan-500/10 scale-[2.5] backdrop-blur-[2px]' : ''}`} 
        style={{ width: '40px', height: '40px' }}
      >
         {isHovering && <SafeIcon icon={Plus} className="w-4 h-4 text-cyan-400 absolute opacity-50 animate-pulse" />}
      </div>
      <div 
        ref={cursorInnerRef}
        className="fixed top-0 left-0 pointer-events-none z-[100] w-1.5 h-1.5 bg-cyan-400 rounded-full hidden md:block shadow-[0_0_10px_#22d3ee] will-change-transform" 
      />
      <div 
        ref={ambientGlowRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none z-0 transition-transform duration-[400ms] ease-out hidden md:block will-change-transform" 
      />

      {/* 頂部導覽列 */}
      <nav className="fixed top-0 w-full z-50 bg-[#020203]/70 backdrop-blur-xl border-b border-white/5">
        <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 transition duration-300 cursor-none drop-shadow-lg" onClick={() => scrollTo('home')} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            KrProgram<span className="text-cyan-400 animate-blink">_</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest">
            {['home', 'features', 'demo', 'workflow', 'pricing'].map((id, index) => (
              <button key={id} onClick={() => scrollTo(id)} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className={`transition-all duration-300 flex flex-col items-center group relative ${activeSection === id ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'text-zinc-400 hover:text-zinc-200'}`}>
                <span className="font-mono text-[9px] uppercase mb-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  {id === 'home' ? 'HOME' : id === 'features' ? 'FEATURES' : id === 'demo' ? 'DEMO' : id === 'workflow' ? 'PROCESS' : 'PLANS'}
                </span>
                <span>
                  {id === 'home' ? '首頁' : id === 'features' ? '核心模組' : id === 'demo' ? '實機展示' : id === 'workflow' ? '部署流程' : '方案與授權'}
                </span>
                <div className={`absolute -bottom-[4px] w-[120%] h-[2px] bg-cyan-400 blur-[2px] transition-all duration-300 rounded-full ${activeSection === id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 首頁 Hero */}
      <section id="home" className="relative pt-36 pb-20 px-6 min-h-screen flex flex-col items-center justify-center text-center z-10 overflow-hidden">
        <div className="absolute w-full h-[2px] bg-cyan-400/30 shadow-[0_0_15px_#22d3ee] animate-scan-beam blur-[1px] z-0"></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyan-500/5 rounded-full z-0 pointer-events-none will-change-transform"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-500/10 rounded-full z-0 border-dashed animate-[spin_40s_linear_infinite] pointer-events-none will-change-transform"></div>
        
        <div className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(34,211,238,0.15)] backdrop-blur-md z-10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
          全端工程伺服器 // NODE: ACTIVE
        </div>

        <div className="relative mb-10 group animate-float z-10" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <div className="absolute -inset-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-full blur-3xl opacity-30 group-hover:opacity-70 transition duration-700 animate-pulse"></div>
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-[#050505] border-2 border-cyan-500/40 overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.25)] flex items-center justify-center p-1 z-10">
             <img src="https://i.postimg.cc/pLm8hxSD/avatar.png" alt="Profile" className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition duration-500 ease-out" />
          </div>
          <svg className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)] animate-[spin_12s_linear_infinite] opacity-60 pointer-events-none z-0 will-change-transform" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#22d3ee" strokeWidth="0.4" strokeDasharray="3 6" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="10 20 5 10" />
          </svg>
        </div>
        
        <h1 className="text-6xl md:text-[7rem] font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-500 text-glow-cyan z-10 leading-none glitch-text" data-text="KrProgram">KrProgram</h1>
        
        <div className="flex items-center justify-center gap-2 mb-12 text-cyan-400 font-bold text-xl md:text-2xl drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] tracking-wide z-10">
          <span className="text-cyan-500/50 font-mono font-light text-xl">{"<"}</span> 將想像化為現實的全端開發者 <span className="text-cyan-500/50 font-mono font-light text-xl">{"/>"}</span>
        </div>

        <div className="w-full max-w-lg mx-auto bg-[#0a0a0c]/80 border border-white/10 rounded-2xl mb-12 text-left font-mono text-sm md:text-base shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden z-10 hover:border-cyan-500/30 transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_5px_#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_5px_#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_5px_#27c93f]"></div>
            </div>
            <div className="text-[10px] text-zinc-500 tracking-widest uppercase">kr-terminal_v2.0</div>
          </div>
          <div className="p-6 space-y-3">
            <div className="text-cyan-400">krprogram@root:~$ <span className="text-zinc-200">npm start bot-engine</span></div>
            <div className="text-zinc-400">▶ 正在初始化核心模組... <span className="text-cyan-500/60">[完成]</span></div>
            <div className="text-zinc-400">▶ 正在載入必要環境... <span className="text-cyan-500/60">[完成]</span></div>
            <div className="text-blue-400 font-bold">✔ 資料庫連線已建立。</div>
            <div className="text-emerald-400 font-bold flex items-center gap-2 mt-4">
              <SafeIcon icon={CheckCircle2} className="w-4 h-4" /> 系統已準備就緒，隨時為您服務 <span className="w-2.5 h-5 bg-emerald-400 animate-blink inline-block ml-1"></span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-6 z-10">
          <button onClick={() => scrollTo('pricing')} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="group relative flex items-center gap-3 px-8 py-4 bg-cyan-500 text-black rounded-2xl font-black hover:bg-cyan-400 active:scale-95 transition-all shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:shadow-[0_0_60px_rgba(34,211,238,0.5)] tracking-wide">
            <span className="relative z-10 flex flex-col items-center leading-tight">
              <span className="font-mono text-[10px] uppercase opacity-70 tracking-widest">Start Project</span>
              <span className="text-lg">啟動專案</span>
            </span>
            <SafeIcon icon={Terminal} className="w-5 h-5 relative z-10 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="https://github.com/yanandhuang09190217-ctrl" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="flex items-center justify-center w-[72px] h-[72px] bg-[#0a0a0c]/80 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all"><SafeIcon icon={Github} className="w-6 h-6 text-zinc-300" /></a>
        </div>
      </section>

      {/* 數據統計 */}
      <section className="py-12 border-y border-white/5 bg-white/[0.01] backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-4 text-center group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <div className="flex items-center justify-center p-3 bg-black/40 border border-white/5 rounded-2xl mb-4 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/5 transition-colors">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-300 font-mono drop-shadow-md">{stat.value}</div>
              <div className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 核心模組 */}
      <section id="features" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3 flex items-center gap-4 tracking-tight">
              <span className="text-cyan-500 font-mono text-3xl">{"//"}</span> 核心模組功能
            </h2>
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-zinc-700"></span> SYS.MODULES_LOADED: 4 <span className="animate-blink text-cyan-500 font-mono">_</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {botFeatures.map((feat, i) => (
              <div key={i} className="relative p-8 bg-[#08080a]/80 border border-white/5 rounded-3xl hover:border-cyan-500/40 hover:bg-[#0a0f18]/90 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)] transition-all duration-500 group overflow-hidden backdrop-blur-md" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/60 transition-all duration-700"></div>
                
                <div className="absolute top-6 right-6 flex items-center gap-2">
                   <div className="barcode opacity-20 group-hover:opacity-50 transition-opacity"></div>
                   <span className="font-mono text-[9px] text-zinc-600 group-hover:text-cyan-500/70 tracking-widest">[MOD_{feat.hex}]</span>
                </div>

                <div className="flex gap-6 relative z-10">
                  <div className="shrink-0">
                    <div className="p-4 bg-black/60 border border-white/10 rounded-2xl shadow-inner group-hover:scale-110 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-all duration-300">
                      {feat.icon}
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold text-zinc-100 mb-3 tracking-wide group-hover:text-white transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 API 串接生態系 */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-gradient-to-b from-[#050508] to-[#020203]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3 inline-flex items-center gap-4 tracking-tight">
              <span className="text-blue-500 font-mono text-3xl">{"//"}</span> 無限 API 擴充生態
            </h2>
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-zinc-700"></span> EXTERNAL_INTEGRATIONS <span className="animate-blink text-blue-500 font-mono">_</span>
            </div>
          </div>

          <div className="relative py-16" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-[#050505] border-2 border-cyan-500/50 rounded-2xl flex items-center justify-center z-20 shadow-[0_0_50px_rgba(34,211,238,0.4)] backdrop-blur-md">
              <SafeIcon icon={Cpu} className="w-12 h-12 text-cyan-400" />
              <div className="absolute -inset-6 border border-cyan-500/20 rounded-[2rem] animate-[spin_6s_linear_infinite] will-change-transform"></div>
              <div className="absolute -inset-10 border border-blue-500/10 rounded-full animate-[spin_8s_linear_infinite_reverse] border-dashed will-change-transform"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-48 gap-y-16 relative z-10 max-w-4xl mx-auto">
              {integrations.map((item, i) => (
                <div key={i} className={`p-6 bg-[#08080a]/80 backdrop-blur-md border border-white/5 rounded-3xl flex items-center gap-5 hover:${item.border} transition-all duration-500 hover:-translate-y-1 ${i % 2 === 0 ? 'md:mr-12' : 'md:ml-12'} group`}>
                  <div className={`p-4 rounded-2xl bg-black/50 border border-white/10 shadow-inner group-hover:bg-black/80 transition-colors`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-100 text-lg tracking-wide">{item.title}</h4>
                    <p className="text-sm text-zinc-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full pointer-events-none z-0 hidden md:block">
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-t border-l border-dashed border-white/10 rounded-tl-[3rem] shadow-[0_0_15px_rgba(255,255,255,0.05)]"></div>
              <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 border-b border-r border-dashed border-white/10 rounded-br-[3rem] shadow-[0_0_15px_rgba(255,255,255,0.05)]"></div>
              <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 border-t border-r border-dashed border-white/10 rounded-tr-[3rem] shadow-[0_0_15px_rgba(255,255,255,0.05)]"></div>
              <div className="absolute bottom-1/4 left-1/4 w-1/2 h-1/2 border-b border-l border-dashed border-white/10 rounded-bl-[3rem] shadow-[0_0_15px_rgba(255,255,255,0.05)]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 技能與實績 */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-gradient-to-b from-[#020203] to-[#050508]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3 flex items-center gap-4 tracking-tight">
              <span className="text-blue-500 font-mono text-3xl">{"//"}</span> 開發技術與實績
            </h2>
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-zinc-700"></span> SYS.TECH_STACK_READY <span className="animate-blink text-blue-500 font-mono">_</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6 text-left">
              <h3 className="text-sm font-bold text-zinc-500 flex items-center gap-2 tracking-[0.2em] uppercase mb-6 font-mono">
                <SafeIcon icon={Monitor} className="w-4 h-4 text-blue-500" /> root/projects
              </h3>
              {projects.map((p, i) => (
                <div key={i} className="p-8 bg-[#08080a]/80 border border-white/5 rounded-3xl hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500 group relative overflow-hidden backdrop-blur-sm" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="absolute top-6 right-6 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="font-mono text-[9px] text-blue-500/50 tracking-widest uppercase">ID_{p.hex}</span>
                  </div>

                  <h4 className="text-2xl font-black text-zinc-100 mb-3 flex items-center gap-3 relative z-10 tracking-wide">
                    {p.title} 
                    <a href={p.link} target="_blank" rel="noopener noreferrer"><SafeIcon icon={ExternalLink} className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" /></a>
                  </h4>
                  <p className="text-blue-400 text-xs font-bold mb-5 relative z-10 tracking-[0.2em] uppercase font-mono bg-blue-500/10 w-fit px-3 py-1 rounded-md">{p.role}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed relative z-10">{p.description}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-[#08080a]/80 border border-white/5 rounded-3xl space-y-10 text-left relative overflow-hidden backdrop-blur-sm group hover:border-cyan-500/30 transition-colors duration-500">
              <div className="absolute -right-10 -bottom-10 text-cyan-500/5 rotate-12 pointer-events-none group-hover:text-cyan-500/10 transition-colors duration-700">
                <SafeIcon icon={Database} className="w-48 h-48" />
              </div>
              <h3 className="text-sm font-bold text-zinc-500 flex items-center gap-2 tracking-[0.2em] uppercase mb-6 font-mono">
                <SafeIcon icon={Code2} className="w-4 h-4 text-cyan-500" /> root/skills
              </h3>
              {technicalSkills.map((s, i) => (
                <div key={i} className="relative z-10">
                  <div className="flex justify-between text-xs font-bold mb-3 uppercase tracking-widest text-zinc-300">
                    <span>{s.name}</span>
                    <span className="font-mono text-cyan-400">{s.percent}%</span>
                  </div>
                  <div className="h-3 bg-black rounded-sm overflow-hidden relative border border-white/10 shadow-inner">
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0px,transparent_4px,rgba(255,255,255,0.05)_4px,rgba(255,255,255,0.05)_5px)] bg-[length:5px_100%] z-20 pointer-events-none"></div>
                    <div className={`absolute inset-y-0 left-0 bg-gradient-to-r ${s.fromColor} ${s.toColor} transition-all duration-1000 ease-out z-10`} style={{ width: isLoaded ? `${s.percent}%` : '0%' }}>
                      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 選擇優勢 */}
      <section id="advantages" className="py-24 px-6 relative z-10 border-t border-white/5 bg-[#030305]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3 inline-flex items-center gap-4 tracking-tight">
              <span className="text-purple-500 font-mono text-3xl">{"//"}</span> 選擇我的優勢
            </h2>
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-zinc-700"></span> WHY_CHOOSE_KR <span className="animate-blink text-purple-500 font-mono">_</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((adv, i) => (
              <div key={i} className="flex flex-col items-start text-left p-8 bg-[#08080a]/80 border border-white/5 rounded-3xl hover:border-purple-500/40 hover:bg-purple-900/10 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500 relative overflow-hidden backdrop-blur-sm group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-[100%] pointer-events-none group-hover:scale-110 transition-transform"></div>
                
                <div className="absolute top-6 right-6 font-mono text-[9px] text-zinc-600 tracking-widest uppercase">
                  [ADV_{adv.hex}]
                </div>

                <div className="mb-8 p-4 bg-black/60 rounded-2xl border border-white/10 shadow-inner group-hover:border-purple-500/30 transition-colors">
                  {adv.icon}
                </div>
                <h3 className="text-xl font-bold text-zinc-100 mb-4 tracking-wide group-hover:text-purple-300 transition-colors">{adv.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed relative z-10">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 開發部署流程 */}
      <section id="workflow" className="py-24 px-6 relative z-10 border-t border-white/5 bg-gradient-to-b from-[#030305] to-[#050508]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3 inline-flex items-center gap-4 tracking-tight">
              <span className="text-emerald-500 font-mono text-3xl">{"//"}</span> 開發部署流程
            </h2>
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-zinc-700"></span> SYS.DEPLOY_WORKFLOW <span className="animate-blink text-emerald-500 font-mono">_</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            <div className="hidden md:block absolute top-[40px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/40 to-emerald-500/10 z-0 blur-[2px]"></div>
            <div className="hidden md:block absolute top-[41px] left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-emerald-500/30 via-cyan-500/80 to-emerald-500/30 z-0"></div>
            
            {workflows.map((flow, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="w-20 h-20 bg-[#08080a] border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:border-emerald-500/60 group-hover:bg-emerald-500/10 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-500 text-zinc-500 group-hover:text-emerald-400 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {flow.icon}
                </div>
                <div className="text-emerald-500 font-bold font-mono text-[10px] mb-2 opacity-80 tracking-[0.3em] uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">{flow.title}</div>
                <h3 className="text-lg font-black text-zinc-100 mb-3 tracking-wide">{flow.subtitle}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-[200px]">{flow.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 方案與授權 (加入雙切換開關) */}
      <section id="pricing" className="py-24 px-6 relative z-10 border-t border-white/5 bg-[#030305]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3 inline-flex items-center gap-4 tracking-tight">
              <span className="text-cyan-500 font-mono text-3xl">{"//"}</span> 方案與授權
            </h2>
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-zinc-700"></span> LICENSING_PLANS <span className="animate-blink text-cyan-500 font-mono">_</span>
            </div>
          </div>

          {/* 🚀 雙切換開關 (Tech-Toggle) */}
          <div className="flex justify-center mb-16 relative z-10" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="bg-[#08080a] border border-white/10 p-1.5 rounded-[1.5rem] flex gap-2 backdrop-blur-md shadow-inner relative">
              <button
                onClick={() => setPricingType('bot')}
                className={`relative px-8 py-3.5 rounded-2xl font-mono text-sm font-bold tracking-widest transition-all duration-300 flex items-center gap-3 z-10 ${pricingMode === 'bot' ? 'text-cyan-400' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <SafeIcon icon={Bot} className="w-4 h-4" />
                [ BOT_MODS ] 機器人
              </button>
              <button
                onClick={() => setPricingType('web')}
                className={`relative px-8 py-3.5 rounded-2xl font-mono text-sm font-bold tracking-widest transition-all duration-300 flex items-center gap-3 z-10 ${pricingMode === 'web' ? 'text-blue-400' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <SafeIcon icon={Layout} className="w-4 h-4" />
                [ WEB_DEV ] 網頁開發
              </button>
              
              {/* 滑動的高亮背景塊 */}
              <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_0_20px_rgba(0,0,0,0.5)] z-0 ${pricingMode === 'bot' ? 'left-1.5 bg-cyan-500/10 border border-cyan-500/30' : 'left-[calc(50%+0.375rem)] bg-blue-500/10 border border-blue-500/30'}`}></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative">
            {currentPricingPlans.map((plan, i) => {
              const styles = getPlanStyles(plan.theme);
              return (
                <div key={`${pricingMode}-${i}`} className={`group flex flex-col p-8 rounded-[2rem] transition-all duration-500 text-left relative overflow-hidden border backdrop-blur-xl animate-fade-slide ${styles.card}`} style={{ animationDelay: `${i * 0.1}s` }} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${styles.topBar}`}></div>
                  {plan.popular && <div className="absolute top-0 right-0 bg-cyan-500/20 text-cyan-300 text-[9px] font-black px-5 py-2 font-mono tracking-[0.2em] uppercase rounded-bl-3xl border-b border-l border-cyan-500/30 shadow-lg z-20">Recommended</div>}
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
                  
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className={`p-4 rounded-2xl border shadow-inner ${styles.iconBg}`}>
                      <div className={styles.iconColor}>{getIcon(plan.iconName)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase mb-1">AUTH_LEVEL</div>
                      <div className={`text-xs font-mono font-bold tracking-widest border px-2 py-1 rounded-md ${plan.popular ? 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10' : 'border-white/10 text-zinc-400 bg-black/50'}`}>
                        {plan.badge}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black text-zinc-100 mb-6 tracking-wide relative z-10">{plan.name}</h3>
                  
                  <div className="mb-10 flex items-baseline gap-1 border-b border-white/5 pb-8 relative z-10">
                    <span className="text-sm font-bold text-zinc-500 font-mono">NT$</span>
                    <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                  </div>
                  
                  <ul className="space-y-4 mb-10 flex-grow font-medium relative z-10">
                    {plan.features.map((f, fi) => <li key={fi} className="flex items-start gap-3 text-sm"><span className={`${styles.check} font-mono text-xs mt-1`}>{">"}</span><span className="text-zinc-300 leading-relaxed">{f}</span></li>)}
                  </ul>

                  <div className="flex justify-center mb-6 opacity-30 group-hover:opacity-70 transition-opacity">
                    <div className="barcode"></div>
                  </div>

                  <a href="https://discordapp.com/users/1284764153038503990" target="_blank" rel="noopener noreferrer" className={`flex flex-col items-center justify-center w-full py-4 transition-all duration-300 rounded-xl relative z-10 border ${styles.button}`}>
                    <span className="font-mono text-[9px] uppercase opacity-80 mb-0.5 tracking-[0.2em]">Request_Access</span>
                    <span className="font-bold text-sm tracking-widest">獲取授權方案</span>
                  </a>
                </div>
              );
            })}
          </div>

          {/* 系統監控面板 (Server Monitor) */}
          <div className="mt-32 mb-20 max-w-4xl mx-auto">
            <div className="bg-[#08080a]/90 border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-xl" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent animate-scan-beam blur-[2px] will-change-transform"></div>
              <div className="absolute inset-0 tech-grid opacity-20 mix-blend-screen pointer-events-none"></div>

              <div className="flex items-center gap-6 w-full md:w-auto relative z-10">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <SafeIcon icon={Globe} className="w-10 h-10 text-emerald-400" />
                  <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping opacity-20 duration-1000"></div>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1.5 bg-emerald-500/10 w-fit px-3 py-1 rounded-md border border-emerald-500/20">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_5px_#34d399]"></span>
                    <span className="font-mono text-emerald-400 text-[10px] font-bold tracking-widest uppercase">Main_Node_Online</span>
                  </div>
                  <h4 className="text-white font-bold text-2xl tracking-wide">企業級伺服器節點</h4>
                </div>
              </div>

              <div className="flex gap-8 w-full md:w-auto justify-between md:justify-end relative z-10 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10">
                <div className="text-left">
                  <div className="text-zinc-500 font-mono text-[10px] tracking-widest mb-1">CPU_LOAD</div>
                  <div className="text-white font-mono font-black text-3xl flex items-baseline gap-1">
                    <span ref={cpuRef}>12</span><span className="text-sm text-zinc-500 font-bold">%</span>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-zinc-500 font-mono text-[10px] tracking-widest mb-1">MEM_USAGE</div>
                  <div className="text-white font-mono font-black text-3xl flex items-baseline gap-1">
                    <span ref={ramRef}>32</span><span className="text-sm text-zinc-500 font-bold">%</span>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-zinc-500 font-mono text-[10px] tracking-widest mb-1">NET_PING</div>
                  <div className="text-emerald-400 font-mono font-black text-3xl flex items-baseline gap-1 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]">
                    <span ref={pingRef}>24</span><span className="text-sm text-emerald-600 font-bold">ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 伺服器代管方案 */}
          <div className="text-center">
             <div className="mb-12 flex flex-col items-center">
              <h3 className="text-2xl md:text-4xl font-black text-white mb-2 inline-flex items-center gap-4 tracking-tight">
                <span className="text-purple-500 font-mono text-2xl">{"//"}</span> {pricingMode === 'bot' ? '伺服器代管' : '網頁雲端代管'}
              </h3>
              <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono tracking-widest uppercase">
                <span className="w-8 h-[1px] bg-zinc-700"></span> HOSTING_SERVICES <span className="animate-blink text-purple-500 font-mono">_</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
              {currentHostingPlans.map((plan, i) => {
                const styles = getPlanStyles(plan.theme);
                return (
                  <div key={`${pricingMode}-host-${i}`} className={`group flex flex-col p-8 bg-[#08080a]/80 rounded-3xl transition-all duration-500 relative border backdrop-blur-md animate-fade-slide ${styles.card}`} style={{ animationDelay: `${i * 0.1}s` }} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                    {plan.popular && <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-300 text-[9px] font-black tracking-widest uppercase px-4 py-1.5 rounded-bl-2xl border-b border-l border-purple-500/30 z-20">熱門選擇</div>}
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${styles.topBar}`}></div>
                    
                    <div className="flex items-center gap-5 mb-6">
                      <div className={`p-4 rounded-xl border shadow-inner ${styles.iconBg}`}>
                        <div className={styles.iconColor}>{getIcon(plan.iconName)}</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-zinc-600 tracking-widest uppercase mb-1.5">NODE_TYPE_{i+1}</div>
                        <h4 className="text-xl font-bold text-zinc-100 tracking-wide">{plan.name}</h4>
                      </div>
                    </div>
                    
                    <div className="flex items-baseline gap-1 mb-8 border-b border-white/5 pb-6">
                      <span className="text-xs font-bold text-zinc-500 font-mono">NT$</span>
                      <span className="text-4xl font-black text-white tracking-tighter">{plan.price}</span>
                      <span className="text-xs font-bold text-zinc-500 font-mono">{plan.period}</span>
                    </div>
                    
                    <ul className="space-y-3.5 flex-grow font-medium">
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
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3 inline-flex items-center gap-4 tracking-tight">
              <span className="text-blue-500 font-mono text-3xl">{"//"}</span> 常見問題 FAQ
            </h2>
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-zinc-700"></span> SYSTEM.LOG // HELP <span className="animate-blink text-blue-500 font-mono">_</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-[#08080a] border border-white/5 rounded-2xl transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] relative overflow-hidden group"
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-base md:text-lg text-zinc-200 tracking-wide flex items-center gap-4">
                    <span className="text-blue-500 opacity-60 font-mono text-sm bg-blue-500/10 px-2 py-1 rounded">Q{i+1}</span> {faq.q}
                  </span>
                  <SafeIcon icon={ChevronDown} className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-blue-400' : ''}`} />
                </button>
                <div className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-zinc-400 text-sm leading-relaxed border-t border-white/5 pt-5 ml-12">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 聯絡 CTA */}
      <section className="py-24 px-6 relative z-10 text-center border-t border-white/5 bg-[#030305]">
        <div className="max-w-4xl mx-auto p-12 md:p-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#050508] to-[#050508] border border-cyan-900/40 rounded-[3rem] shadow-[0_0_100px_rgba(34,211,238,0.1)] relative overflow-hidden group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px] group-hover:shadow-[0_0_20px_#22d3ee] transition-all"></div>
          
          <div className="text-cyan-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-8 flex justify-center items-center gap-3 bg-cyan-500/10 w-fit mx-auto px-4 py-1.5 rounded-full border border-cyan-500/20">
             <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]"></span> SYSTEM READY
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">準備好啟動專案了嗎？</h2>
          <p className="text-zinc-400 mb-12 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">不論是單純的社群管理機器人，還是高度客製化的全端網站系統，<br className="hidden md:block" />我們都能為您建置最穩定、最現代化的解決方案。</p>
          
          <a href="https://discordapp.com/users/1284764153038503990" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 px-12 py-5 bg-cyan-500 text-black rounded-2xl hover:bg-cyan-400 hover:scale-105 shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all duration-300">
            <SafeIcon icon={Mail} className="w-6 h-6" />
            <span className="flex flex-col items-start leading-tight">
              <span className="font-mono text-[10px] font-black tracking-widest uppercase opacity-70">Initialize Contact</span>
              <span className="font-bold text-lg tracking-wide">啟動專案對話</span>
            </span>
          </a>
        </div>
      </section>

      {/* 頁尾 */}
      <footer className="py-12 text-center border-t border-white/5 bg-[#020202] relative z-10">
        <div className="text-2xl font-black text-zinc-200 mb-6 tracking-wider">KrProgram<span className="text-cyan-500">_</span></div>
        <div className="flex justify-center gap-12 text-zinc-500 text-xs font-black tracking-widest font-mono mb-10">
          <a href="https://github.com/yanandhuang09190217-ctrl" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors duration-300">GITHUB</a>
          <span className="text-zinc-800">|</span>
          <a href="https://discordapp.com/users/1284764153038503990" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors duration-300">DISCORD</a>
        </div>
        <div className="text-zinc-700 text-[9px] font-mono tracking-[0.3em] uppercase flex flex-col items-center gap-2">
          <span>© {new Date().getFullYear()} KrProgram. All Rights Reserved.</span>
          <span>SYS_VERSION: 3.1.6 // FULL_STACK_NODE</span>
        </div>
      </footer>
    </div>
  );
}

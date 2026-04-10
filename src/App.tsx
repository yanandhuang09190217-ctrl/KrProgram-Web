import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, ExternalLink, Code2, Terminal, Mail, 
  Code, Bot, CheckCircle2, Star, Server, Users, Activity, 
  MessageSquare, CreditCard, Settings, Rocket, ChevronDown, 
  Ticket, ShoppingCart, ShieldCheck, Gamepad2, Eye,
  Cpu, Globe, Database, Monitor, MessageCircle, 
  Command, PlayCircle, Coins, Plus, Layout, MonitorSmartphone, Cloud, Wifi
} from 'lucide-react';

// ==========================================
// 🚀 靜態資料區
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

const generateHexId = () => Math.random().toString(16).substring(2, 6).toUpperCase();

// 🚀 已經幫你更新了專案名稱與對應的 Discord 邀請連結
const projects = [
  { title: '幻小悅 (Huan-Yue)', role: '幻悅陪伴所常駐工程師', description: '一個專注於服務、商城、遊戲社群製作的客製化機器人', link: 'https://discord.gg/CKYAWfheCy', hex: generateHexId(), theme: 'blue', status: 'ACTIVE' },
  { title: 'Gemini AI智慧助手(DC版)', role: 'AI 核心實驗專案', description: '無縫串接 Google Gemini 模型，具備高階自然語言理解與即時上下文對答能力的智能實驗機器人。', link: 'https://discord.gg/aN4YRrpQ5x', hex: generateHexId(), theme: 'purple', status: 'BETA_TEST' }
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

const webPricingPlans = [
  { name: '單頁形象官網', badge: 'Landing', price: '5,000', theme: 'blue', popular: false, iconName: 'Layout', features: ['RWD 響應式手機版設計', '現代化滾動與進入動畫', '聯絡表單與社群連結整合', '適合個人履歷/工作室展示', '專業雲端伺服器部署'] },
  { name: '多頁企業網站', badge: 'Corporate', price: '15,000', theme: 'cyan', popular: true, iconName: 'MonitorSmartphone', features: ['包含單頁版所有視覺功能', '多頁面路由 (關於/服務/作品)', '基礎 SEO 搜尋引擎優化設計', '整合 Google Analytics 追蹤', '輕量級系統狀態或資料展示'] },
  { name: '全端系統級應用', badge: 'Full-Stack', price: '35,000', theme: 'emerald', popular: false, iconName: 'Database', features: ['高階客製化前端互動介面', '會員註冊登入與權限系統', '專屬客製化後台管理介面', '獨立資料庫架設 (SQL/NoSQL)', '金流 / 第三方 API 深度串接'] }
];

const webHostingPlans = [
  { name: '基礎靜態託管', price: '200', period: '/月', theme: 'blue', popular: false, iconName: 'Cloud', features: ['全球 CDN 邊緣節點', '自動發放 SSL 安全憑證', '超快的靜態頁面載入速度', '適合無後端之形象網站'] },
  { name: '全端雲端主機', price: '300', period: '/月', theme: 'purple', popular: true, iconName: 'Server', features: ['專屬 Node.js 執行環境', '包含基礎資料庫儲存空間', '自動化部屬與 24/7 連線監控', '適合中小型動態資料網站'] },
  { name: '企業級獨立 VPS', price: '1,000', period: '/月', theme: 'emerald', popular: false, iconName: 'Globe', features: ['獨享高規格 CPU 運算資源', '支援大型關聯式資料庫存取', '無限制流量與完整後台權限', '最高級別的客製化資安防護'] }
];

const faqs = [
  { q: '機器人/網頁需要我另外租伺服器來掛機嗎？', a: '您可以自行租用主機，或者使用我提供的「雲端代管服務」。我會幫您處理所有環境架設、24 小時連線監控與後續的更新維護，讓您完全免除技術煩惱。' },
  { q: '如果 API 更新導致功能壞掉，會幫忙修嗎？', a: '絕對會！只要是本工作室開發的專案，在保固期內若因官方 API 更新導致的非人為故障，皆提供免費修復支援。' },
  { q: '我可以分期付款嗎？', a: '大型專案（如旗艦商城、全端系統）支援階段性付款：簽約時支付訂金 50%，測試伺服器確認功能無誤後，再支付尾款 50%，保障雙方權益。' },
  { q: '後續如果想增加新功能怎麼辦？', a: '歡迎隨時討論！我會根據新功能的複雜度進行單獨評估與報價，而且老客戶絕對享有額外折扣優惠。' }
];

const getPlanStyles = (theme: string) => {
  const themes: any = {
    cyan: {
      card: 'bg-[#0a0a0c] border-cyan-500/30 hover:border-cyan-400/60 z-10 transform md:-translate-y-2',
      topBar: 'from-blue-500 via-cyan-400 to-blue-500 opacity-100',
      iconBg: 'bg-cyan-500/10 border-cyan-500/30',
      iconColor: 'text-cyan-400',
      button: 'bg-cyan-500 text-black hover:bg-cyan-400 border-transparent',
      check: 'text-cyan-400',
      sweep: 'sweep-cyan',
      accent: 'bg-cyan-500 shadow-[0_0_10px_#22d3ee]'
    },
    purple: {
      card: 'bg-[#0a0a0c] border-purple-500/30 hover:border-purple-400/60 z-10 transform md:-translate-y-2',
      topBar: 'from-purple-600 via-fuchsia-400 to-purple-600 opacity-100',
      iconBg: 'bg-purple-500/10 border-purple-500/30',
      iconColor: 'text-purple-400',
      button: 'bg-purple-500 text-white hover:bg-purple-400 border-transparent',
      check: 'text-purple-400',
      sweep: 'sweep-purple',
      accent: 'bg-purple-500 shadow-[0_0_10px_#c084fc]'
    },
    emerald: {
      card: 'bg-[#08080a] border-white/10 hover:border-emerald-500/40 hover:-translate-y-1',
      topBar: 'from-emerald-600/50 to-emerald-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
      iconBg: 'bg-zinc-900 border-white/10 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors',
      iconColor: 'text-zinc-400 group-hover:text-emerald-400',
      button: 'bg-zinc-900 border border-white/10 text-zinc-300 group-hover:border-emerald-500/50 group-hover:text-emerald-400 hover:bg-emerald-500/10',
      check: 'text-zinc-600 group-hover:text-emerald-400 transition-colors',
      sweep: 'sweep-emerald',
      accent: 'bg-emerald-500 shadow-[0_0_10px_#34d399]'
    },
    blue: {
      card: 'bg-[#08080a] border-white/10 hover:border-blue-500/40 hover:-translate-y-1',
      topBar: 'from-cyan-600/50 to-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
      iconBg: 'bg-zinc-900 border-white/10 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-colors',
      iconColor: 'text-zinc-400 group-hover:text-blue-400',
      button: 'bg-zinc-900 border border-white/10 text-zinc-300 group-hover:border-blue-500/50 group-hover:text-blue-400 hover:bg-blue-500/10',
      check: 'text-zinc-600 group-hover:text-blue-400 transition-colors',
      sweep: 'sweep-blue',
      accent: 'bg-blue-500 shadow-[0_0_10px_#3b82f6]'
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
  
  const [pricingMode, setPricingType] = useState<'bot' | 'web'>('bot');
  
  // 🚀 新增：網站瀏覽人次狀態
  const [visitCount, setVisitCount] = useState<string>('LOADING...');

  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);

  const cpuRef = useRef<HTMLSpanElement>(null);
  const ramRef = useRef<HTMLSpanElement>(null);
  const pingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 🚀 呼叫免費計數器 API 取得並增加瀏覽次數
    fetch('https://api.counterapi.dev/v1/krprogram_portfolio/visits/up')
      .then(res => res.json())
      .then(data => {
        setVisitCount(data.count.toLocaleString()); // 加上千分位逗號
      })
      .catch(() => {
        setVisitCount('SYS_ACTIVE'); // 若 API 失敗則顯示預準備用字眼，維持科技感
      });

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
    }, 150);

    setTimeout(() => {
      clearInterval(logInterval);
      setBootState('fading');
      setTimeout(() => {
        setBootState('ready');
        setIsLoaded(true);
      }, 400); 
    }, 1200);

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

  const currentPricingPlans = pricingMode === 'bot' ? botPricingPlans : webPricingPlans;
  const currentHostingPlans = pricingMode === 'bot' ? botHostingPlans : webHostingPlans;

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 selection:bg-cyan-500/30 overflow-x-hidden relative cursor-none" style={{ fontFamily: "'Inter', 'Noto Sans TC', sans-serif" }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=JetBrains+Mono:wght@400;700;800&family=Noto+Sans+TC:wght@400;500;700;900&display=swap');
        * { cursor: none !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        
        .tech-grid {
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        .animate-shimmer { animation: shimmer 2.5s infinite linear; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 1.5s infinite; }
        
        .text-glow-cyan { text-shadow: 0 0 20px rgba(34, 211, 238, 0.4); }
        .barcode { background: repeating-linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.2) 2px, transparent 2px, transparent 4px); height: 8px; width: 40px; }

        @keyframes fade-slide-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-slide { animation: fade-slide-up 0.4s ease-out forwards; }

        @keyframes card-sweep {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .card-sweep-fx {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          will-change: transform;
          transform: translateY(-100%);
        }
        .group:hover .card-sweep-fx {
          animation: card-sweep 2s linear infinite;
        }
        .sweep-cyan { background: linear-gradient(to bottom, transparent, rgba(34, 211, 238, 0.05), transparent); }
        .sweep-blue { background: linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.05), transparent); }
        .sweep-purple { background: linear-gradient(to bottom, transparent, rgba(168, 85, 247, 0.05), transparent); }
        .sweep-emerald { background: linear-gradient(to bottom, transparent, rgba(16, 185, 129, 0.05), transparent); }
        .sweep-red { background: linear-gradient(to bottom, transparent, rgba(239, 68, 68, 0.05), transparent); }
        .sweep-yellow { background: linear-gradient(to bottom, transparent, rgba(234, 179, 8, 0.05), transparent); }

        @keyframes cycle-1 { 0%, 20% { opacity: 1; transform: scale(1) translateZ(0); } 25%, 95% { opacity: 0; transform: scale(0.3) translateZ(0); } 100% { opacity: 1; transform: scale(1) translateZ(0); } }
        @keyframes cycle-2 { 0%, 20% { opacity: 0; transform: scale(0.3) translateZ(0); } 25%, 45% { opacity: 1; transform: scale(1) translateZ(0); } 50%, 100% { opacity: 0; transform: scale(0.3) translateZ(0); } }
        @keyframes cycle-3 { 0%, 45% { opacity: 0; transform: scale(0.3) translateZ(0); } 50%, 70% { opacity: 1; transform: scale(1) translateZ(0); } 75%, 100% { opacity: 0; transform: scale(0.3) translateZ(0); } }
        @keyframes cycle-4 { 0%, 70% { opacity: 0; transform: scale(0.3) translateZ(0); } 75%, 95% { opacity: 1; transform: scale(1) translateZ(0); } 100% { opacity: 0; transform: scale(0.3) translateZ(0); } }
        .animate-cycle-1 { animation: cycle-1 8s infinite; }
        .animate-cycle-2 { animation: cycle-2 8s infinite; }
        .animate-cycle-3 { animation: cycle-3 8s infinite; }
        .animate-cycle-4 { animation: cycle-4 8s infinite; }

        @keyframes data-shoot-1 { 0%, 10% { transform: translate(0, 0) scale(1); opacity: 1; } 40%, 100% { transform: translate(-180px, -80px) scale(0); opacity: 0; } }
        @keyframes data-shoot-2 { 0%, 10% { transform: translate(0, 0) scale(1); opacity: 1; } 40%, 100% { transform: translate(180px, -80px) scale(0); opacity: 0; } }
        @keyframes data-shoot-3 { 0%, 10% { transform: translate(0, 0) scale(1); opacity: 1; } 40%, 100% { transform: translate(-180px, 80px) scale(0); opacity: 0; } }
        @keyframes data-shoot-4 { 0%, 10% { transform: translate(0, 0) scale(1); opacity: 1; } 40%, 100% { transform: translate(180px, 80px) scale(0); opacity: 0; } }
        .animate-data-shoot-1 { animation: data-shoot-1 3s infinite ease-out; }
        .animate-data-shoot-2 { animation: data-shoot-2 3.5s infinite ease-out 0.5s; }
        .animate-data-shoot-3 { animation: data-shoot-3 2.8s infinite ease-out 1s; }
        .animate-data-shoot-4 { animation: data-shoot-4 3.2s infinite ease-out 1.5s; }
      `}} />

      {/* 開機啟動畫面 */}
      {bootState !== 'ready' && (
        <div className={`fixed inset-0 z-[999] bg-[#050505] flex flex-col items-center justify-center p-8 transition-opacity duration-500 ${bootState === 'fading' ? 'opacity-0' : 'opacity-100'}`}>
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
              <div className="h-full bg-cyan-500 transition-all duration-[1s] ease-out" style={{ width: bootLogs.length === 5 ? '100%' : `${(bootLogs.length / 5) * 100}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {/* 極簡靜態背景 */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#050505]">
        <div className="absolute inset-0 tech-grid opacity-30" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}></div>
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-indigo-900/20 rounded-full blur-[100px]"></div>
      </div>

      {/* 輕量級游標 */}
      <div 
        ref={cursorOuterRef}
        className={`fixed top-0 left-0 pointer-events-none z-[100] transition-all duration-75 ease-out flex items-center justify-center rounded-full hidden md:flex border border-cyan-400/30 will-change-transform ${isHovering ? 'bg-cyan-500/10 scale-150' : ''}`} 
        style={{ width: '40px', height: '40px' }}
      >
         {isHovering && <SafeIcon icon={Plus} className="w-4 h-4 text-cyan-400 absolute opacity-80" />}
      </div>
      <div 
        ref={cursorInnerRef}
        className="fixed top-0 left-0 pointer-events-none z-[100] w-1.5 h-1.5 bg-cyan-400 rounded-full hidden md:block will-change-transform" 
      />

      {/* 頂部導覽列 */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-black text-xl tracking-wider text-white hover:text-cyan-400 transition duration-300 cursor-none" onClick={() => scrollTo('home')} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            KrProgram<span className="text-cyan-500 animate-blink">_</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest">
            {['home', 'features', 'demo', 'workflow', 'pricing'].map((id, index) => (
              <button key={id} onClick={() => scrollTo(id)} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className={`transition-all duration-300 flex flex-col items-center group relative ${activeSection === id ? 'text-cyan-400' : 'text-zinc-500 hover:text-zinc-300'}`}>
                <span className="font-mono text-[9px] uppercase mb-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  {id === 'home' ? 'HOME' : id === 'features' ? 'FEATURES' : id === 'demo' ? 'DEMO' : id === 'workflow' ? 'PROCESS' : 'PLANS'}
                </span>
                <span>
                  {id === 'home' ? '首頁' : id === 'features' ? '核心模組' : id === 'demo' ? '實機展示' : id === 'workflow' ? '部署流程' : '方案與授權'}
                </span>
                <div className={`absolute -bottom-[4px] w-full h-[2px] bg-cyan-400 transition-all duration-300 ${activeSection === id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 首頁 Hero */}
      <section id="home" className="relative pt-36 pb-20 px-6 min-h-screen flex flex-col items-center justify-center text-center z-10 overflow-hidden">
        <div className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          全端工程伺服器 // NODE: ACTIVE
        </div>

        <div className="relative mb-10 group z-10" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <div className="absolute -inset-4 bg-cyan-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-[#0a0a0a] border border-cyan-500/30 overflow-hidden flex items-center justify-center p-1 z-10">
             <img src="https://i.postimg.cc/pLm8hxSD/avatar.png" alt="Profile" className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition duration-500 ease-out" />
          </div>
          <svg className="absolute -inset-8 w-[calc(100%+64px)] h-[calc(100%+64px)] opacity-30 pointer-events-none z-0" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#22d3ee" strokeWidth="0.4" strokeDasharray="4 8" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="20 10" opacity="0.5" />
          </svg>
        </div>
        
        <h1 className="text-6xl md:text-[6rem] font-black mb-6 tracking-tight text-white z-10 leading-none">KrProgram</h1>
        
        <div className="flex items-center justify-center gap-2 mb-12 text-cyan-400 font-bold text-lg md:text-xl tracking-wide z-10">
          <span className="text-cyan-500/50 font-mono font-light">{"<"}</span> 將想像化為現實的全端開發者 <span className="text-cyan-500/50 font-mono font-light">{"/>"}</span>
        </div>

        <div className="w-full max-w-lg mx-auto bg-[#0a0a0c] border border-zinc-800 rounded-xl mb-12 text-left font-mono text-sm md:text-base overflow-hidden z-10 hover:border-cyan-500/40 transition-colors shadow-lg relative group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <div className="card-sweep-fx sweep-cyan"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-cyan-500 group-hover:h-1/2 transition-all duration-500 shadow-[0_0_10px_#22d3ee] z-20"></div>
          
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 relative z-10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="text-[10px] text-zinc-500 tracking-widest uppercase">kr-terminal_v2.0</div>
          </div>
          <div className="p-6 space-y-3 bg-[#050505] relative z-10">
            <div className="text-cyan-400">krprogram@root:~$ <span className="text-zinc-200">npm start dev-server</span></div>
            <div className="text-zinc-500">▶ 正在初始化核心模組... <span className="text-cyan-500/60">[完成]</span></div>
            <div className="text-zinc-500">▶ 正在載入必要環境... <span className="text-cyan-500/60">[完成]</span></div>
            <div className="text-blue-400 font-bold">✔ 資料庫連線已建立。</div>
            <div className="text-emerald-400 font-bold flex items-center gap-2 mt-4">
              <SafeIcon icon={CheckCircle2} className="w-4 h-4" /> 系統已準備就緒，隨時為您服務 <span className="w-2 h-4 bg-emerald-400 animate-blink inline-block ml-1"></span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-6 z-10">
          <button onClick={() => scrollTo('pricing')} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="group relative flex items-center gap-3 px-8 py-4 bg-cyan-500 text-black rounded-xl font-black hover:bg-cyan-400 active:scale-95 transition-all tracking-wide">
            <span className="flex flex-col items-center leading-tight">
              <span className="font-mono text-[10px] uppercase opacity-80 tracking-widest">Start Project</span>
              <span className="text-base">啟動專案</span>
            </span>
            <SafeIcon icon={Terminal} className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="https://github.com/yanandhuang09190217-ctrl" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="flex items-center justify-center w-[64px] h-[64px] bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 hover:border-cyan-500/50 transition-all"><SafeIcon icon={Github} className="w-6 h-6 text-zinc-300" /></a>
        </div>
      </section>

      {/* 數據統計 */}
      <section className="py-12 border-y border-zinc-900 bg-[#08080a] relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-4 text-center group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <div className="flex items-center justify-center p-3 bg-zinc-900 border border-zinc-800 rounded-2xl mb-4 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-colors">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter group-hover:text-cyan-400 transition-colors duration-300 font-mono">{stat.value}</div>
              <div className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 核心模組 */}
      <section id="features" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 flex items-center gap-4 tracking-tight">
              <span className="text-cyan-500 font-mono text-3xl">{"//"}</span> 核心模組功能
            </h2>
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-zinc-700"></span> SYS.MODULES_LOADED: 4 <span className="animate-blink text-cyan-500 font-mono">_</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {botFeatures.map((feat, i) => (
              <div key={i} className="relative p-8 bg-[#0a0a0c] border border-zinc-800 rounded-2xl hover:border-cyan-500/40 hover:bg-[#0c1218] transition-all duration-300 group overflow-hidden" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="card-sweep-fx sweep-cyan"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-cyan-500 group-hover:h-2/3 transition-all duration-500 shadow-[0_0_10px_#22d3ee] z-20"></div>
                
                <div className="absolute top-6 right-6 flex items-center gap-2 relative z-10">
                   <div className="barcode opacity-20 group-hover:opacity-40 transition-opacity"></div>
                   <span className="font-mono text-[9px] text-zinc-600 tracking-widest">[MOD_{feat.hex}]</span>
                </div>

                <div className="flex gap-6 relative z-10">
                  <div className="shrink-0">
                    <div className="p-4 bg-black border border-zinc-800 rounded-xl group-hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden">
                       <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {feat.icon}
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold text-zinc-100 mb-2 tracking-wide group-hover:text-cyan-300 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discord 實機對話模擬 */}
      <section id="demo" className="py-24 px-6 relative z-10 border-t border-zinc-900 bg-[#08080a]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 inline-flex items-center gap-4 tracking-tight">
              <span className="text-purple-500 font-mono text-3xl">{"//"}</span> 系統實機展示
            </h2>
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-zinc-700"></span> DISCORD_UI_SIMULATION <span className="animate-blink text-purple-500 font-mono">_</span>
            </div>
          </div>

          <div className="w-full max-w-3xl mx-auto bg-[#313338] rounded-xl overflow-hidden border border-zinc-700 font-sans relative group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="card-sweep-fx sweep-purple"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-purple-500 group-hover:h-3/4 transition-all duration-700 shadow-[0_0_10px_#c084fc] z-20"></div>

            <div className="bg-[#2b2d31] px-5 py-3 border-b border-[#1e1f22] flex items-center gap-3 relative z-10">
              <SafeIcon icon={Command} className="w-4 h-4 text-zinc-400" />
              <span className="text-white font-bold text-sm tracking-wide">bot-指令測試區</span>
            </div>
            
            <div className="p-6 md:p-8 space-y-6 relative z-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
                  <SafeIcon icon={Users} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[#f2f3f5] font-bold text-base hover:underline cursor-pointer">客戶_Client</span>
                    <span className="text-[#949ba4] text-xs">今天 14:00</span>
                  </div>
                  <div className="text-[#dbdee1] font-mono bg-[#1e1f22] px-3 py-1 rounded text-sm border border-[#2b2d31]">&gt; /查詢商品 ID: 1024</div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-black">
                  <img src="https://i.postimg.cc/pLm8hxSD/avatar.png" alt="Bot Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[#f2f3f5] font-bold text-base hover:underline cursor-pointer">KrProgram Bot</span>
                    <span className="bg-[#5865F2] text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                      <SafeIcon icon={CheckCircle2} className="w-3 h-3" /> BOT
                    </span>
                    <span className="text-[#949ba4] text-xs">今天 14:00</span>
                  </div>
                  
                  <div className="mt-2 bg-[#2b2d31] border-l-4 border-cyan-400 rounded-md p-4 max-w-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <SafeIcon icon={ShoppingCart} className="w-4 h-4 text-white" />
                      <span className="text-white font-bold text-sm">系統商品查詢成功</span>
                    </div>
                    <h3 className="text-cyan-400 font-bold text-base mb-2 cursor-pointer hover:underline">💎 頂級客製化機器人套餐</h3>
                    <p className="text-[#dbdee1] text-sm mb-4 leading-relaxed">這是一套為您的社群量身打造的專屬系統，包含商城、經濟與進階管理防護。</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-[#1e1f22] rounded border border-[#313338]">
                      <div>
                        <div className="text-[#dbdee1] font-bold text-xs mb-1">💰 價格</div>
                        <div className="text-[#949ba4] text-sm font-mono">20,000 Kr 幣</div>
                      </div>
                      <div>
                        <div className="text-[#dbdee1] font-bold text-xs mb-1">📦 庫存狀態</div>
                        <div className="text-emerald-400 text-sm font-bold">充足 (無限)</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button className="bg-[#248046] hover:bg-[#1a6334] text-white text-sm font-bold px-4 py-2 rounded transition-colors flex items-center gap-2">
                      <SafeIcon icon={CreditCard} className="w-4 h-4" /> 立即購買
                    </button>
                    <button className="bg-[#4e5058] hover:bg-[#6d6f78] text-white text-sm font-bold px-4 py-2 rounded transition-colors flex items-center gap-2">
                      <SafeIcon icon={MessageCircle} className="w-4 h-4" /> 聯絡客服
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API 串接生態系 */}
      <section className="py-24 px-6 relative z-10 border-t border-zinc-900 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 inline-flex items-center gap-4 tracking-tight">
              <span className="text-blue-500 font-mono text-3xl">{"//"}</span> 無限 API 擴充生態
            </h2>
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-zinc-700"></span> EXTERNAL_INTEGRATIONS <span className="animate-blink text-blue-500 font-mono">_</span>
            </div>
          </div>

          <div className="relative py-12" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-zinc-900 border border-cyan-500/40 rounded-2xl flex items-center justify-center z-20 group shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-xl animate-pulse blur-[10px] will-change-transform pointer-events-none"></div>
              
              <div className="relative w-10 h-10 flex items-center justify-center pointer-events-none">
                <SafeIcon icon={Cpu} className="absolute w-8 h-8 text-cyan-400 animate-cycle-1 will-change-transform" />
                <SafeIcon icon={Globe} className="absolute w-8 h-8 text-blue-400 animate-cycle-2 will-change-transform opacity-0" />
                <SafeIcon icon={Database} className="absolute w-8 h-8 text-purple-400 animate-cycle-3 will-change-transform opacity-0" />
                <SafeIcon icon={Wifi} className="absolute w-8 h-8 text-emerald-400 animate-cycle-4 will-change-transform opacity-0" />
              </div>

              <div className="absolute -inset-4 border border-cyan-500/20 rounded-[1.5rem] animate-[spin_6s_linear_infinite] will-change-transform pointer-events-none"></div>
              <div className="absolute -inset-8 border border-blue-500/10 rounded-full animate-[spin_8s_linear_infinite_reverse] border-dashed will-change-transform pointer-events-none"></div>
              
              <div className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981] animate-data-shoot-1 will-change-transform pointer-events-none hidden md:block"></div>
              <div className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_#3b82f6] animate-data-shoot-2 will-change-transform pointer-events-none hidden md:block"></div>
              <div className="absolute w-1.5 h-1.5 bg-red-400 rounded-full shadow-[0_0_8px_#ef4444] animate-data-shoot-3 will-change-transform pointer-events-none hidden md:block"></div>
              <div className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_8px_#eab308] animate-data-shoot-4 will-change-transform pointer-events-none hidden md:block"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-40 gap-y-12 relative z-10 max-w-4xl mx-auto">
              {integrations.map((item, i) => {
                const sweepClass = item.border.includes('emerald') ? 'sweep-emerald' : 
                                   item.border.includes('blue') ? 'sweep-blue' : 
                                   item.border.includes('red') ? 'sweep-red' : 'sweep-yellow';
                const accentColor = item.border.includes('emerald') ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 
                                    item.border.includes('blue') ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 
                                    item.border.includes('red') ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-yellow-500 shadow-[0_0_10px_#eab308]';

                return (
                  <div key={i} className={`p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex items-center gap-4 hover:${item.border} transition-colors duration-300 ${i % 2 === 0 ? 'md:mr-8' : 'md:ml-8'} relative overflow-hidden group`}>
                    <div className={`card-sweep-fx ${sweepClass}`}></div>
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-hover:h-2/3 transition-all duration-500 z-20 ${accentColor}`}></div>
                    
                    <div className={`p-3 rounded-xl bg-black border border-zinc-800 relative z-10`}>
                      {item.icon}
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-bold text-zinc-200 text-base group-hover:text-white transition-colors">{item.title}</h4>
                      <p className="text-xs text-zinc-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* 靜態連線裝飾 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full pointer-events-none z-0 hidden md:block opacity-30">
              <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] border-t border-l border-zinc-600 rounded-tl-3xl"></div>
              <div className="absolute bottom-[30%] right-[30%] w-[40%] h-[40%] border-b border-r border-zinc-600 rounded-br-3xl"></div>
              <div className="absolute top-[30%] right-[30%] w-[40%] h-[40%] border-t border-r border-zinc-600 rounded-tr-3xl"></div>
              <div className="absolute bottom-[30%] left-[30%] w-[40%] h-[40%] border-b border-l border-zinc-600 rounded-bl-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 技能與實績 (已修復點擊跳轉) */}
      <section className="py-24 px-6 relative z-10 border-t border-zinc-900 bg-[#08080a]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 flex items-center gap-4 tracking-tight">
              <span className="text-blue-500 font-mono text-3xl">{"//"}</span> 開發技術與實績
            </h2>
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-zinc-700"></span> SYS.TECH_STACK_READY <span className="animate-blink text-blue-500 font-mono">_</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6 text-left">
              <h3 className="text-sm font-bold text-zinc-500 flex items-center gap-2 tracking-[0.2em] uppercase mb-4 font-mono">
                <SafeIcon icon={Monitor} className="w-4 h-4 text-blue-500" /> root/projects
              </h3>
              {projects.map((p, i) => {
                // 為不同專案配置專屬的風格設定
                const tStyle = p.theme === 'purple' ? {
                  hoverBorder: 'hover:border-purple-500/40',
                  sweep: 'sweep-purple',
                  bar: 'bg-purple-500 shadow-[0_0_10px_#c084fc]',
                  dot: 'bg-purple-500',
                  titleHover: 'group-hover:text-purple-300',
                  linkHover: 'group-hover:text-purple-400',
                  roleText: 'text-purple-400',
                  statusColor: 'text-purple-500/50 border-purple-500/20'
                } : {
                  hoverBorder: 'hover:border-blue-500/40',
                  sweep: 'sweep-blue',
                  bar: 'bg-blue-500 shadow-[0_0_10px_#3b82f6]',
                  dot: 'bg-blue-500',
                  titleHover: 'group-hover:text-blue-300',
                  linkHover: 'group-hover:text-blue-400',
                  roleText: 'text-blue-400',
                  statusColor: 'text-blue-500/50 border-blue-500/20'
                };

                // 🚀 已修復此處的 JSX 語法錯誤
                return (
                  <div 
                    key={i} 
                    onClick={() => window.open(p.link, '_blank')}
                    className={`cursor-pointer p-6 bg-[#0a0a0c] border border-zinc-800 rounded-2xl ${tStyle.hoverBorder} transition-colors duration-300 relative overflow-hidden group`} 
                    onMouseEnter={() => setIsHovering(true)} 
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <div className={`card-sweep-fx ${tStyle.sweep}`}></div>
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-hover:h-2/3 transition-all duration-500 z-20 ${tStyle.bar}`}></div>

                    <div className="absolute top-5 right-5 flex items-center gap-2 z-10">
                      <span className={`font-mono text-[8px] tracking-widest border px-1.5 py-0.5 rounded ${tStyle.statusColor}`}>[{p.status}]</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${tStyle.dot} group-hover:animate-ping`}></span>
                      <span className="font-mono text-[9px] text-zinc-600 tracking-widest uppercase">ID_{p.hex}</span>
                    </div>

                    <h4 className={`text-xl font-black text-zinc-100 mb-2 flex items-center gap-2 tracking-wide relative z-10 ${tStyle.titleHover} transition-colors`}>
                      {p.title} 
                      <SafeIcon icon={ExternalLink} className={`w-4 h-4 text-zinc-500 ${tStyle.linkHover} transition-colors`} />
                    </h4>
                    <p className={`${tStyle.roleText} text-xs font-bold mb-4 tracking-widest uppercase font-mono relative z-10`}>{p.role}</p>
                    <p className="text-zinc-500 text-sm leading-relaxed relative z-10">{p.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="p-6 bg-[#0a0a0c] border border-zinc-800 rounded-2xl space-y-8 text-left relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-300">
              <div className="card-sweep-fx sweep-cyan"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-cyan-500 group-hover:h-1/2 transition-all duration-500 shadow-[0_0_10px_#22d3ee] z-20"></div>

              <div className="absolute -right-8 -bottom-8 text-zinc-800/50 rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-500 z-0">
                <SafeIcon icon={Database} className="w-40 h-40" />
              </div>
              <h3 className="text-sm font-bold text-zinc-500 flex items-center gap-2 tracking-[0.2em] uppercase mb-4 font-mono relative z-10">
                <SafeIcon icon={Code2} className="w-4 h-4 text-cyan-500" /> root/skills
              </h3>
              {technicalSkills.map((s, i) => (
                <div key={i} className="relative z-10">
                  <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-widest text-zinc-400">
                    <span>{s.name}</span>
                    <span className="font-mono text-cyan-400">{s.percent}%</span>
                  </div>
                  <div className="h-2 bg-black rounded-sm overflow-hidden border border-zinc-800">
                    <div className={`h-full bg-gradient-to-r ${s.fromColor} ${s.toColor} transition-all duration-1000 ease-out`} style={{ width: isLoaded ? `${s.percent}%` : '0%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 選擇優勢 */}
      <section id="advantages" className="py-24 px-6 relative z-10 border-t border-zinc-900 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 inline-flex items-center gap-4 tracking-tight">
              <span className="text-purple-500 font-mono text-3xl">{"//"}</span> 選擇我的優勢
            </h2>
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-zinc-700"></span> WHY_CHOOSE_KR <span className="animate-blink text-purple-500 font-mono">_</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advantages.map((adv, i) => (
              <div key={i} className="flex flex-col items-start text-left p-6 bg-[#0a0a0c] border border-zinc-800 rounded-2xl hover:border-purple-500/30 transition-colors duration-300 relative overflow-hidden group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="card-sweep-fx sweep-purple"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-purple-500 group-hover:h-2/3 transition-all duration-500 shadow-[0_0_10px_#c084fc] z-20"></div>

                <div className="absolute top-4 right-4 font-mono text-[9px] text-zinc-600 tracking-widest uppercase relative z-10">
                  [ADV_{adv.hex}]
                </div>

                <div className="mb-6 p-3 bg-black rounded-xl border border-zinc-800 group-hover:border-purple-500/30 transition-colors relative z-10">
                  {adv.icon}
                </div>
                <h3 className="text-lg font-bold text-zinc-200 mb-3 group-hover:text-purple-300 transition-colors relative z-10">{adv.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed relative z-10">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 開發部署流程 */}
      <section id="workflow" className="py-24 px-6 relative z-10 border-t border-zinc-900 bg-[#08080a]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 inline-flex items-center gap-4 tracking-tight">
              <span className="text-emerald-500 font-mono text-3xl">{"//"}</span> 開發部署流程
            </h2>
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-zinc-700"></span> SYS.DEPLOY_WORKFLOW <span className="animate-blink text-emerald-500 font-mono">_</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
            <div className="hidden md:block absolute top-[36px] left-[15%] right-[15%] h-[1px] border-t border-dashed border-zinc-700 z-0"></div>
            
            {workflows.map((flow, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="w-16 h-16 bg-[#0a0a0c] border border-zinc-700 rounded-xl flex items-center justify-center mb-6 group-hover:border-emerald-500/50 transition-colors duration-300 text-zinc-500 group-hover:text-emerald-400 bg-[#050505] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent -translate-y-[100%] group-hover:animate-[card-sweep_1.5s_linear_infinite] pointer-events-none will-change-transform z-0"></div>
                  <div className="relative z-10">{flow.icon}</div>
                </div>
                <div className="text-emerald-500 font-bold font-mono text-[10px] mb-2 opacity-80 tracking-widest uppercase">{flow.title}</div>
                <h3 className="text-base font-bold text-zinc-200 mb-2 group-hover:text-emerald-300 transition-colors">{flow.subtitle}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed max-w-[180px]">{flow.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 方案與授權 (雙切換開關) */}
      <section id="pricing" className="py-24 px-6 relative z-10 border-t border-zinc-900 bg-[#050505]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 inline-flex items-center gap-4 tracking-tight">
              <span className="text-cyan-500 font-mono text-3xl">{"//"}</span> 方案與授權
            </h2>
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-zinc-700"></span> LICENSING_PLANS <span className="animate-blink text-cyan-500 font-mono">_</span>
            </div>
          </div>

          <div className="flex justify-center mb-12 relative z-10" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="bg-[#0a0a0c] border border-zinc-800 p-1.5 rounded-xl flex gap-1 relative overflow-hidden group">
              <div className="card-sweep-fx sweep-cyan"></div>
              <button
                onClick={() => setPricingType('bot')}
                className={`relative z-10 px-6 py-2.5 rounded-lg font-mono text-sm font-bold tracking-wider transition-colors flex items-center gap-2 ${pricingMode === 'bot' ? 'bg-cyan-500/10 text-cyan-400' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <SafeIcon icon={Bot} className="w-4 h-4" /> BOT_MODS
              </button>
              <button
                onClick={() => setPricingType('web')}
                className={`relative z-10 px-6 py-2.5 rounded-lg font-mono text-sm font-bold tracking-wider transition-colors flex items-center gap-2 ${pricingMode === 'web' ? 'bg-blue-500/10 text-blue-400' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <SafeIcon icon={Layout} className="w-4 h-4" /> WEB_DEV
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative">
            {currentPricingPlans.map((plan, i) => {
              const styles = getPlanStyles(plan.theme);
              return (
                <div key={`${pricingMode}-${i}`} className={`group flex flex-col p-6 rounded-2xl transition-all duration-300 text-left relative overflow-hidden border animate-fade-slide ${styles.card}`} style={{ animationDelay: `${i * 0.1}s` }} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  
                  <div className={`card-sweep-fx ${styles.sweep}`}></div>
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-hover:h-3/4 transition-all duration-500 z-20 ${styles.accent}`}></div>

                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${styles.topBar}`}></div>
                  {plan.popular && <div className="absolute top-0 right-0 bg-cyan-500/10 text-cyan-400 text-[9px] font-bold px-3 py-1.5 font-mono tracking-widest uppercase rounded-bl-lg border-b border-l border-cyan-500/20 z-20">Recommended</div>}
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className={`p-3 rounded-xl border ${styles.iconBg}`}>
                      <div className={styles.iconColor}>{getIcon(plan.iconName)}</div>
                    </div>
                    <div className="text-right mt-1">
                      <div className={`text-[10px] font-mono font-bold tracking-widest uppercase border px-2 py-0.5 rounded ${plan.popular ? 'border-cyan-500/30 text-cyan-400' : 'border-zinc-700 text-zinc-500'}`}>
                        {plan.badge}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-zinc-100 mb-4 tracking-wide relative z-10">{plan.name}</h3>
                  
                  <div className="mb-6 flex items-baseline gap-1 border-b border-zinc-800 pb-6 relative z-10">
                    <span className="text-xs font-bold text-zinc-500 font-mono">NT$</span>
                    <span className="text-4xl font-black text-white tracking-tighter">{plan.price}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow font-medium relative z-10">
                    {plan.features.map((f, fi) => <li key={fi} className="flex items-start gap-2 text-sm"><span className={`${styles.check} font-mono text-xs mt-0.5`}>{">"}</span><span className="text-zinc-400 leading-snug">{f}</span></li>)}
                  </ul>

                  <a href="https://discordapp.com/users/1284764153038503990" target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center w-full py-3 transition-colors rounded-lg font-bold tracking-widest text-sm border relative z-10 ${styles.button}`}>
                    獲取方案
                  </a>
                </div>
              );
            })}
          </div>

          {/* 系統監控面板 */}
          <div className="mt-24 mb-16 max-w-4xl mx-auto">
            <div className="bg-[#0a0a0c] border border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <div className="card-sweep-fx sweep-emerald"></div>
              
              <div className="flex items-center gap-5 w-full md:w-auto relative z-10">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <SafeIcon icon={Globe} className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span className="font-mono text-emerald-400 text-[10px] font-bold tracking-widest uppercase">Main_Node_Online</span>
                  </div>
                  <h4 className="text-zinc-100 font-bold text-lg tracking-wide">企業級伺服器節點</h4>
                </div>
              </div>

              <div className="flex gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 md:border-l border-zinc-800 pt-6 md:pt-0 md:pl-8 relative z-10">
                <div className="text-left">
                  <div className="text-zinc-500 font-mono text-[10px] tracking-widest mb-1">CPU_LOAD</div>
                  <div className="text-zinc-200 font-mono font-bold text-2xl flex items-baseline gap-1">
                    <span ref={cpuRef}>12</span><span className="text-xs text-zinc-600">%</span>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-zinc-500 font-mono text-[10px] tracking-widest mb-1">MEM_USAGE</div>
                  <div className="text-zinc-200 font-mono font-bold text-2xl flex items-baseline gap-1">
                    <span ref={ramRef}>32</span><span className="text-xs text-zinc-600">%</span>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-zinc-500 font-mono text-[10px] tracking-widest mb-1">NET_PING</div>
                  <div className="text-emerald-400 font-mono font-bold text-2xl flex items-baseline gap-1">
                    <span ref={pingRef}>24</span><span className="text-xs text-emerald-600/50">ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 伺服器代管方案 */}
          <div className="text-center">
             <div className="mb-10 flex flex-col items-center">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2 inline-flex items-center gap-4 tracking-tight">
                <span className="text-purple-500 font-mono text-2xl">{"//"}</span> {pricingMode === 'bot' ? '伺服器代管' : '網頁雲端代管'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
              {currentHostingPlans.map((plan, i) => {
                const styles = getPlanStyles(plan.theme);
                return (
                  <div key={`${pricingMode}-host-${i}`} className={`group flex flex-col p-6 bg-[#0a0a0c] rounded-2xl transition-all duration-300 relative border animate-fade-slide overflow-hidden ${styles.card}`} style={{ animationDelay: `${i * 0.1}s` }} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                    <div className={`card-sweep-fx ${styles.sweep}`}></div>
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-hover:h-2/3 transition-all duration-500 z-20 ${styles.accent}`}></div>

                    {plan.popular && <div className="absolute top-0 right-0 bg-purple-500/10 text-purple-400 text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-bl-lg border-b border-l border-purple-500/20 relative z-10">熱門選擇</div>}
                    
                    <div className="flex items-center gap-4 mb-5 relative z-10">
                      <div className={`p-3 rounded-xl border ${styles.iconBg}`}>
                        <div className={styles.iconColor}>{getIcon(plan.iconName)}</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-mono text-zinc-600 tracking-widest uppercase mb-0.5">NODE_{i+1}</div>
                        <h4 className="text-lg font-bold text-zinc-200">{plan.name}</h4>
                      </div>
                    </div>
                    
                    <div className="flex items-baseline gap-1 mb-5 border-b border-zinc-800 pb-5 relative z-10">
                      <span className="text-xs font-bold text-zinc-500 font-mono">NT$</span>
                      <span className="text-3xl font-black text-white tracking-tighter">{plan.price}</span>
                      <span className="text-xs font-bold text-zinc-500 font-mono">{plan.period}</span>
                    </div>
                    
                    <ul className="space-y-2.5 flex-grow font-medium relative z-10">
                      {plan.features.map((f, fi) => <li key={fi} className="flex items-center gap-2 text-xs"><span className={`${styles.check} font-mono`}>{">"}</span><span className="text-zinc-400">{f}</span></li>)}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 常見問題 FAQ */}
      <section id="faq" className="py-24 px-6 relative z-10 border-t border-zinc-900 bg-[#08080a]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 inline-flex items-center gap-4 tracking-tight">
              <span className="text-blue-500 font-mono text-3xl">{"//"}</span> 常見問題 FAQ
            </h2>
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-zinc-700"></span> SYSTEM.LOG // HELP <span className="animate-blink text-blue-500 font-mono">_</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-[#0a0a0c] border border-zinc-800 rounded-xl transition-colors duration-300 hover:border-blue-500/30 overflow-hidden relative group"
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 h-0 group-hover:h-full transition-all duration-300 ease-out"></div>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none relative z-10"
                >
                  <span className="font-bold text-sm md:text-base text-zinc-300 flex items-center gap-3">
                    <span className="text-blue-500 font-mono text-xs bg-blue-500/10 px-2 py-0.5 rounded">Q{i+1}</span> {faq.q}
                  </span>
                  <SafeIcon icon={ChevronDown} className={`w-5 h-5 text-zinc-600 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-blue-400' : ''}`} />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out relative z-10 ${openFaq === i ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-zinc-500 text-sm leading-relaxed border-t border-zinc-800 pt-4 ml-10">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 聯絡 CTA */}
      <section className="py-24 px-6 relative z-10 text-center border-t border-zinc-900 bg-[#050505]">
        <div className="max-w-4xl mx-auto p-10 md:p-16 bg-[#0a0a0c] border border-zinc-800 rounded-[2rem] relative overflow-hidden group hover:border-cyan-500/30 transition-colors duration-500" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          
          <div className="card-sweep-fx sweep-cyan"></div>
          
          <div className="text-cyan-500 font-mono text-[10px] tracking-[0.2em] uppercase mb-6 flex justify-center items-center gap-2 bg-cyan-500/10 w-fit mx-auto px-3 py-1 rounded-full border border-cyan-500/20 relative z-10">
             <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span> SYSTEM READY
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight relative z-10">準備好啟動專案了嗎？</h2>
          <p className="text-zinc-400 mb-10 text-sm md:text-base leading-relaxed max-w-xl mx-auto relative z-10">不論是單純的社群管理機器人，還是高度客製化的全端網站系統，我們都能為您建置最穩定、最現代化的解決方案。</p>
          
          <a href="https://discordapp.com/users/1284764153038503990" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 active:scale-95 transition-all relative z-10">
            <SafeIcon icon={Mail} className="w-5 h-5" />
            <span className="tracking-wide">啟動專案對話</span>
          </a>
        </div>
      </section>

      {/* 頁尾與瀏覽人次 */}
      <footer className="py-10 text-center border-t border-zinc-900 bg-[#020202] relative z-10">
        <div className="text-xl font-black text-zinc-400 mb-4 tracking-wider">KrProgram<span className="text-cyan-500">_</span></div>
        <div className="flex justify-center gap-8 text-zinc-600 text-xs font-bold tracking-widest font-mono mb-8">
          <a href="https://github.com/yanandhuang09190217-ctrl" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GITHUB</a>
          <span className="text-zinc-800">|</span>
          <a href="https://discordapp.com/users/1284764153038503990" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">DISCORD</a>
        </div>
        <div className="text-zinc-600 text-[9px] font-mono tracking-[0.2em] uppercase flex flex-col items-center gap-1">
          <span>© {new Date().getFullYear()} KrProgram. All Rights Reserved.</span>
          <span>SYS_VERSION: 3.3.1 // HIGH_PERF_HUD</span>
          
          {/* 🚀 網頁連線計數器 */}
          <div className="mt-2 flex items-center gap-2 bg-[#0a0a0c] px-3 py-1.5 rounded-full border border-zinc-800 shadow-inner">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_#10b981]"></span>
            <span>TOTAL_CONNECTIONS: <span className="text-emerald-400 font-bold">{visitCount}</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

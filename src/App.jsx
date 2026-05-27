import React, { useState, useEffect } from 'react';
import fotoProfil from './assets/foto-profil.png'; 
import favoriteFilm from './assets/download.jpg'; // Import gambar film

const stats = [
  { label: "Projects Completed", value: "12+" },
  { label: "CTF Challenges Solved", value: "50+" },
  { label: "Hours of Coding", value: "1000+" },
];

const education = [
  {
    year: "2024 - Sekarang",
    role: "Mahasiswa S1 Teknologi Informasi",
    institution: "Universitas Muhammadiyah Yogyakarta",
    desc: "Fokus pada pengembangan infrastruktur backend, keamanan siber, dan rekayasa jaringan."
  },
  {
    year: "2026",
    role: "Peserta Self-Development Program",
    institution: "Novo Club Batch 4 (Paragon)",
    desc: "Mengembangkan keterampilan kepemimpinan dan kolaborasi tim profesional."
  }
];

const portfolioData = [
  {
    id: 1,
    title: "Nyawit: Sistem Maintenance Alat Pertanian",
    category: "Desktop",
    desc: "Aplikasi manajemen database tingkat enterprise untuk penjadwalan pemeliharaan.",
    tech: ["C#", "SQL Server", "UI/UX"],
    githubLink: "https://github.com/Haffi24"
  },
  {
    id: 2,
    title: "Direktori Tugas Akhir",
    category: "Web",
    desc: "Sistem direktori terpusat berbasis web berfokus pada keandalan teknologi server.",
    tech: ["Node.js", "Express", "Tailwind"],
    githubLink: "https://github.com/Haffi24"
  },
  {
    id: 3,
    title: "Network Topology Configuration",
    category: "Network",
    desc: "Implementasi OSPF, VLANs, dan STP untuk simulasi infrastruktur jaringan perusahaan.",
    tech: ["Cisco Packet Tracer", "Routing"],
    githubLink: "https://github.com/Haffi24"
  },
  {
    id: 4,
    title: "CTF Exploitation Scripts",
    category: "Security",
    desc: "Kumpulan skrip otomatisasi untuk analisis forensik dan pemecahan tantangan kriptografi.",
    tech: ["Python", "Cryptography", "picoCTF"],
    githubLink: "https://github.com/Haffi24"
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  
  const [darkMode, setDarkMode] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  
  const roles = ["Backend Development.", "Keamanan Siber.", "Jaringan Komputer."];
  const [currentRole, setCurrentRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fullText = roles[roleIndex];
      if (!isDeleting) {
        setCurrentRole(fullText.substring(0, currentRole.length + 1));
        if (currentRole === fullText) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setCurrentRole(fullText.substring(0, currentRole.length - 1));
        if (currentRole === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [currentRole, isDeleting, roleIndex]);

  const handleFilter = (category) => setFilter(category);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setToastMessage('Pesan berhasil terkirim! Saya akan segera membalasnya.');
    setTimeout(() => setToastMessage(''), 4000);
    e.target.reset();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProjects = filter === 'All' 
    ? portfolioData 
    : portfolioData.filter(p => p.category === filter);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-orange-200 selection:text-orange-900 transition-colors duration-300 relative overflow-hidden">
        
        {/* EFEK CAHAYA ORANYE MENGIKUTI KURSOR MOUSE */}
        <div 
          className="fixed top-0 left-0 w-[500px] h-[500px] bg-orange-600/20 dark:bg-orange-500/10 rounded-full blur-[120px] pointer-events-none z-0 transition-transform duration-75 ease-out"
          style={{ 
            transform: `translate(${mousePos.x - 250}px, ${mousePos.y - 250}px)` 
          }}
        ></div>

        <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-600/10 dark:bg-orange-600/5 blur-[150px] pointer-events-none -z-10"></div>
        
        {toastMessage && (
          <div className="fixed top-24 right-6 z-[100] bg-white dark:bg-slate-800 border-l-4 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)] rounded-r-lg px-6 py-4 flex items-center gap-3 animate-[slideInRight_0.3s_ease-out]">
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">{toastMessage}</span>
          </div>
        )}

        <button 
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-[90] p-3 bg-orange-600 hover:bg-orange-500 text-white rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all duration-300 transform ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
        </button>

        {/* NAVBAR */}
        <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/70 dark:bg-slate-950/60 backdrop-blur-xl shadow-lg py-3 border-b-2 border-transparent dark:border-b-orange-500/50' : 'bg-transparent py-5'}`}>
          <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
            <a href="#" className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
              Haffi<span className="text-orange-500 shadow-orange-500/50 drop-shadow-md">.</span>
            </a>
            
            <nav className="hidden md:flex items-center space-x-8">
              <ul className="flex space-x-8 text-sm font-bold text-slate-600 dark:text-slate-300">
                <li><a href="#home" className="hover:text-orange-600 dark:hover:text-orange-400 transition">Home</a></li>
                <li><a href="#about" className="hover:text-orange-600 dark:hover:text-orange-400 transition">About & Edu</a></li>
                <li><a href="#portfolio" className="hover:text-orange-600 dark:hover:text-orange-400 transition">Portfolio</a></li>
              </ul>
              <div className="flex items-center space-x-5 border-l border-slate-200 dark:border-slate-700 pl-8 relative z-50">
                <button onClick={() => setDarkMode(!darkMode)} className="text-slate-500 hover:text-orange-500 transition p-1">
                  {darkMode ? (
                    <svg className="w-5 h-5 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                  )}
                </button>

                <a href="https://github.com/Haffi24" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition" title="Buka GitHub">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.0.069-.608 1 .07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                </a>
                <a href="#contact" className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-sm font-bold hover:bg-orange-600 dark:hover:bg-orange-500 transition shadow-[0_0_10px_rgba(249,115,22,0)] dark:hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]">Let's Talk</a>
              </div>
            </nav>

            <div className="md:hidden flex items-center gap-4 relative z-50">
              <button onClick={() => setDarkMode(!darkMode)} className="text-slate-500">
                {darkMode ? <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
              </button>
              <button className="text-slate-900 dark:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 shadow-lg py-4 px-6 flex flex-col space-y-4 font-semibold text-slate-700 dark:text-slate-300">
              <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>About & Edu</a>
              <a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
              <a href="https://github.com/Haffi24" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)}>GitHub Profile</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-orange-500">Contact</a>
            </div>
          )}
        </header>

        {/* HERO SECTION */}
        <section id="home" className="relative pt-32 pb-16 lg:pt-40 lg:pb-0 relative z-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4=')] opacity-40 dark:opacity-5 -z-10"></div>
          
          <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8 text-center lg:text-left py-6 relative z-20">
              <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100/80 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 font-bold text-xs uppercase tracking-widest mb-2 border border-orange-200 dark:border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.1)]">
                Available for Work
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Crafting robust <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400 animate-gradient-x drop-shadow-sm">Digital Solutions.</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Saya Haffi Saifulloh, spesialis dalam <span className="font-bold text-orange-600 dark:text-orange-400 inline-block min-w-[150px] text-left">{currentRole}<span className="animate-pulse">|</span></span> Mengubah masalah teknis yang kompleks menjadi infrastruktur yang elegan dan aman.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#portfolio" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-orange-600 dark:hover:bg-orange-500 transition shadow-[0_0_15px_rgba(249,115,22,0)] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] flex items-center justify-center">
                  Lihat Portfolio
                </a>
                <a href="/cv-haffi.pdf" download className="bg-white dark:bg-slate-900/50 backdrop-blur-sm text-slate-800 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-800 px-8 py-4 rounded-xl font-bold hover:border-orange-600 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition flex items-center justify-center gap-2 group">
                  <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download CV
                </a>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center lg:justify-end relative group select-none lg:translate-x-16 self-end z-20">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-orange-300 rounded-full blur-[110px] opacity-15 dark:opacity-20 w-80 h-80 m-auto transition-all duration-700 group-hover:scale-110 group-hover:opacity-30"></div>
              
              <div 
                onClick={() => setIsImgModalOpen(true)}
                className="relative cursor-pointer transition-all duration-500 transform group-hover:scale-[1.01] active:scale-95 z-10 flex flex-col justify-end overflow-hidden"
              >
                <img 
                  src={fotoProfil} 
                  alt="Haffi Saifulloh Portrait" 
                  className="w-[380px] h-auto lg:w-[500px] max-h-[620px] object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_10px_25px_rgba(249,115,22,0.15)] group-hover:drop-shadow-[0_20px_35px_rgba(249,115,22,0.3)] transition-all duration-500 relative z-10"
                />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-950 via-white/80 dark:via-slate-950/80 to-transparent pointer-events-none z-20"></div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-white dark:bg-slate-950 pointer-events-none z-30"></div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="bg-slate-900 dark:bg-black/40 backdrop-blur-lg py-12 relative z-20 border-y border-slate-800 dark:border-slate-800/50">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800 dark:divide-slate-800/50 relative z-20">
            {stats.map((stat, i) => (
              <div key={i} className="pt-6 md:pt-0">
                <h3 className="text-4xl font-black text-white mb-2">{stat.value}</h3>
                <p className="text-orange-500 dark:text-orange-400 font-semibold text-sm uppercase tracking-wider drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT & TIMELINE SECTION */}
        <section id="about" className="pt-24 pb-12 relative z-10">
          <div className="absolute right-0 top-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
          
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-20">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Pendidikan & Pengalaman</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
                Perjalanan akademis dan profesional saya dibentuk oleh rasa ingin tahu yang kuat terhadap cara kerja sistem teknologi di balik layar.
              </p>
              
              <div className="space-y-8 border-l-2 border-orange-200 dark:border-orange-500/30 pl-6 ml-3 relative z-20">
                {education.map((item, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-orange-600 border-4 border-white dark:border-slate-950 shadow-[0_0_10px_rgba(249,115,22,0.6)]"></span>
                    <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{item.year}</span>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{item.role}</h4>
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 block mb-2">{item.institution}</span>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-10 border border-slate-100 dark:border-t-slate-700/50 dark:border-l-slate-700/50 dark:border-r-transparent dark:border-b-2 dark:border-b-orange-500/50 shadow-2xl relative z-20 h-max">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Keahlian Teknis</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between font-bold mb-2"><span className="text-slate-700 dark:text-slate-300">Backend (Node.js, C#, SQL)</span><span className="text-orange-600 dark:text-orange-400">90%</span></div>
                  <div className="w-full bg-slate-200 dark:bg-slate-950 rounded-full h-2.5 overflow-hidden"><div className="bg-gradient-to-r from-orange-600 to-orange-400 h-2.5 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]" style={{ width: '90%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between font-bold mb-2"><span className="text-slate-700 dark:text-slate-300">Network Engineering (Cisco)</span><span className="text-orange-600 dark:text-orange-400">85%</span></div>
                  <div className="w-full bg-slate-200 dark:bg-slate-950 rounded-full h-2.5 overflow-hidden"><div className="bg-gradient-to-r from-orange-600 to-orange-400 h-2.5 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]" style={{ width: '85%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between font-bold mb-2"><span className="text-slate-700 dark:text-slate-300">Cybersecurity (CTF, Forensics)</span><span className="text-orange-600 dark:text-orange-400">80%</span></div>
                  <div className="w-full bg-slate-200 dark:bg-slate-950 rounded-full h-2.5 overflow-hidden"><div className="bg-gradient-to-r from-orange-600 to-orange-400 h-2.5 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]" style={{ width: '80%' }}></div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BEYOND THE SCREEN / FAVORITE FILM SECTION */}
        <section className="py-12 relative z-10">
          <div className="max-w-6xl mx-auto px-6 relative z-20">
            <div className="bg-slate-50 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-t-slate-700/50 dark:border-l-slate-700/50 dark:border-r-transparent dark:border-b-2 dark:border-b-orange-500/50 shadow-2xl flex flex-col md:flex-row items-center gap-12">
              
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 font-bold text-xs uppercase tracking-widest border border-orange-200 dark:border-orange-500/30">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" /></svg>
                  Personal Interest
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">Film Favorit Sepanjang Masa</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  Sebagai seorang *tech-enthusiast*, <strong className="text-slate-900 dark:text-orange-400">Back to the Future</strong> adalah mahakarya fiksi ilmiah yang tak pernah lekang oleh waktu. <br/><br/>
                  Perpaduan yang brilian antara inovasi mesin waktu modifikasi, *problem-solving* yang jenius di bawah tekanan, serta imajinasi masa depan yang liar sangat beresonansi dengan *passion* saya dalam dunia pengembangan teknologi dan infrastruktur digital.
                </p>
              </div>

              {/* POSTER IMAGE DENGAN EFEK 3D GLOW */}
              <div className="w-full md:w-1/3 flex justify-center group perspective">
                <div className="relative transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-2">
                  <div className="absolute inset-0 bg-orange-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <img 
                    src={favoriteFilm} 
                    alt="Back to the Future Poster" 
                    className="relative rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-700 w-full max-w-[280px] object-cover z-10"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-900/20 relative z-10">
          <div className="max-w-6xl mx-auto px-6 relative z-20">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Karya Pilihan</h2>
              <p className="text-slate-600 dark:text-slate-400">Beberapa implementasi sistem dan infrastruktur yang telah saya kembangkan.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12 relative z-20">
              {['All', 'Web', 'Desktop', 'Network', 'Security'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  className={`px-6 py-2 rounded-full font-bold text-sm transition-all relative z-20 ${filter === cat ? 'bg-slate-900 dark:bg-orange-600 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white dark:bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-200 dark:border-slate-700/50 hover:border-orange-400 dark:hover:border-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] dark:hover:shadow-[0_0_30px_rgba(249,115,22,0.25)] hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between relative z-20">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-black tracking-widest text-orange-600 dark:text-orange-400 uppercase block">{project.category}</span>
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition" title="Lihat Source Code">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.008.069-.008 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .65-.207 2.13.793A7.417 7.417 0 0112 6.584c.68.003 1.36.092 2 .27 1.48-1 2.13-.793 2.13-.793.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.523-10-10-10z"/></svg>
                      </a>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition">{project.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">{project.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-transparent dark:border-slate-700 text-xs px-3 py-1.5 rounded-lg font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 relative overflow-hidden z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-600/20 dark:bg-orange-600/15 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none -z-10"></div>
          
          <div className="max-w-4xl mx-auto px-6 relative z-20">
            <div className="bg-slate-900 dark:bg-slate-900/60 backdrop-blur-xl dark:border dark:border-slate-700/50 dark:border-b-2 dark:border-b-orange-500/50 rounded-3xl p-8 md:p-16 shadow-2xl text-white relative z-20">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-black mb-4">Mari Berdiskusi.</h2>
                <p className="text-slate-400">Punya proyek inovatif atau butuh solusi infrastruktur IT? Kirimkan pesan.</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Nama Lengkap</label>
                    <input required type="text" className="w-full bg-slate-800 dark:bg-slate-950/50 border border-slate-700 dark:border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition relative z-20" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Email Valid</label>
                    <input required type="email" className="w-full bg-slate-800 dark:bg-slate-950/50 border border-slate-700 dark:border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition relative z-20" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-2">Pesan Anda</label>
                  <textarea required rows="4" className="w-full bg-slate-800 dark:bg-slate-950/50 border border-slate-700 dark:border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition relative z-20" placeholder="Ceritakan detail proyek Anda..."></textarea>
                </div>

                <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] relative z-20">
                  Kirim Pesan Sekarang
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-slate-50 dark:bg-slate-950/80 backdrop-blur-md py-10 border-t border-slate-200 dark:border-slate-800/50 relative z-20">
          <div className="max-w-6xl mx-auto px-6 text-center md:flex md:justify-between md:items-center text-sm font-bold text-slate-500 dark:text-slate-500">
            <p>&copy; {new Date().getFullYear()} Haffi Saifulloh (20240140181).</p>
            <p className="mt-2 md:mt-0">Praktikum 12 PDW - Universitas Muhammadiyah Yogyakarta</p>
          </div>
        </footer>

        {/* LIGHTBOX MODAL DIALOG */}
        {isImgModalOpen && (
          <div 
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setIsImgModalOpen(false)}
          >
            <div className="relative max-w-full max-h-[90vh] bg-transparent p-2">
              <button 
                className="absolute top-4 right-4 bg-slate-900/80 hover:bg-orange-600 text-white p-2.5 rounded-full transition-all z-50 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                onClick={() => setIsImgModalOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <img 
                src={fotoProfil} 
                alt="Haffi Saifulloh Full Screen View" 
                className="max-w-full max-h-[85vh] object-contain filter drop-shadow-[0_20px_40px_rgba(249,115,22,0.15)]"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-accent-gold">
                <span className="material-symbols-outlined text-3xl">explore</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-primary dark:text-accent-gold uppercase">Pramuka Ambalan</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-semibold text-primary dark:text-slate-200 hover:text-accent-gold transition-colors">Home</Link>
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-semibold text-primary dark:text-slate-200 hover:text-accent-gold transition-colors">
                  Profil Ambalan
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-background-dark border border-primary/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <a className="block px-4 py-3 text-sm hover:bg-primary/5 dark:hover:bg-primary/20" href="/#sejarah">Sejarah</a>
                  <a className="block px-4 py-3 text-sm hover:bg-primary/5 dark:hover:bg-primary/20" href="/#visi-misi">Visi &amp; Misi</a>
                  <a className="block px-4 py-3 text-sm hover:bg-primary/5 dark:hover:bg-primary/20" href="#">Struktur Organisasi</a>
                </div>
              </div>
              <Link to="/gallery" className="text-sm font-semibold text-primary dark:text-slate-200 hover:text-accent-gold transition-colors">Galeri</Link>
              <Link to="/members" className="text-sm font-semibold text-primary dark:text-slate-200 hover:text-accent-gold transition-colors">Anggota</Link>
              <Link to="/news" className="text-sm font-semibold text-primary dark:text-slate-200 hover:text-accent-gold transition-colors">Berita</Link>
            </div>

            {/* Action Buttons & Mobile Hamburger */}
            <div className="flex items-center gap-4">
              <button className="hidden md:block bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                Gabung
              </button>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden flex items-center justify-center text-primary dark:text-accent-gold p-2"
              >
                <span className="material-symbols-outlined text-3xl">menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-in Mobile Menu */}
      <div className={`md:hidden fixed inset-0 z-[60] transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Menu Panel */}
        <div className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white dark:bg-background-dark shadow-2xl flex flex-col p-6 border-l border-primary/10 transform transition-transform">
          <div className="flex justify-end mb-6">
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-primary dark:text-accent-gold p-2 hover:bg-primary/5 rounded-full transition-colors">
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>
          <div className="flex flex-col gap-6 overflow-y-auto">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-primary dark:text-slate-200 hover:text-accent-gold transition-colors">Home</Link>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary/20">
              <span className="text-sm font-semibold text-primary/50 dark:text-slate-400 uppercase tracking-wider">Profil Ambalan</span>
              <a href="/#sejarah" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-primary dark:text-slate-200 hover:text-accent-gold transition-colors">Sejarah</a>
              <a href="/#visi-misi" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-primary dark:text-slate-200 hover:text-accent-gold transition-colors">Visi &amp; Misi</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-primary dark:text-slate-200 hover:text-accent-gold transition-colors">Struktur Organisasi</a>
            </div>
            <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-primary dark:text-slate-200 hover:text-accent-gold transition-colors">Galeri</Link>
            <Link to="/members" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-primary dark:text-slate-200 hover:text-accent-gold transition-colors">Anggota</Link>
            <Link to="/news" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-primary dark:text-slate-200 hover:text-accent-gold transition-colors">Berita Utama</Link>

            <button className="mt-4 bg-primary text-white w-full py-3 rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow-md">
              Gabung Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* Main Content (Outlet) */}
      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-accent-gold rounded flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">explore</span>
              </div>
              <span className="text-xl font-black uppercase tracking-tight">Pramuka Ambalan</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Berdedikasi untuk mencetak kader bangsa yang berkarakter, beriman, dan bertaqwa melalui pendidikan kepramukaan.
            </p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-gold hover:text-primary transition-all" href="#">
                <i className="material-symbols-outlined">public</i>
              </a>
              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-gold hover:text-primary transition-all" href="#">
                <i className="material-symbols-outlined">mail</i>
              </a>
            </div>
          </div>
          <div>
            <h5 className="font-bold text-accent-gold mb-6 uppercase tracking-widest text-sm">Tautan Cepat</h5>
            <ul className="space-y-4 text-slate-300 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><a className="hover:text-white transition-colors" href="#">Program Latihan</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Agenda Kegiatan</a></li>
              <li><Link to="/news" className="hover:text-white transition-colors">Berita Terkini</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-accent-gold mb-6 uppercase tracking-widest text-sm">Kontak</h5>
            <ul className="space-y-4 text-slate-300 text-sm">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-accent-gold text-lg">location_on</span>
                <span>Bojonegoro, Indonesia</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-accent-gold text-lg">phone</span>
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-accent-gold text-lg">mail</span>
                <span>info@pramuka-ambalan.or.id</span>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-accent-gold mb-6 uppercase tracking-widest text-sm">Newsletter</h5>
            <p className="text-xs text-slate-400 mb-4">Dapatkan info kegiatan terbaru langsung di email Anda.</p>
            <div className="flex">
              <input className="bg-white/10 border-none rounded-l-lg text-sm px-4 py-2 w-full focus:ring-1 focus:ring-accent-gold" placeholder="Email Anda" type="email" />
              <button className="bg-accent-gold text-primary px-4 py-2 rounded-r-lg font-bold">
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© 2024 Gerakan Pramuka Ambalan. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex gap-6">
            <a className="hover:text-white" href="#">Privacy Policy</a>
            <a className="hover:text-white" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* FAB WhatsApp */}
      <a className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform" href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
        </svg>
      </a>
    </div>
  );
}

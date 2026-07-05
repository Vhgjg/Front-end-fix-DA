import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://202.155.18.152:1337";

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${STRAPI_URL}/api/beritas?populate=*&pagination[limit]=4`, {
          headers: {
            'Authorization': import.meta.env.VITE_STRAPI_TOKEN ? `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}` : ''
          }
        });
        const result = await response.json();

        if (result.data) {
          setNews(result.data);
        }
      } catch (error) {
        console.error("Error fetching home news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const getImageUrl = (item) => {
    const attributes = item.attributes || item;
    const thumb = attributes.Thumbnail || attributes.thumbnail;
    let url = thumb?.data?.attributes?.formats?.small?.url || thumb?.data?.attributes?.url || thumb?.url;
    if (url && url.startsWith('/')) {
      return `${STRAPI_URL}${url}`;
    }
    return url || 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  };

  const getTitle = (item) => {
    const attributes = item.attributes || item;
    return attributes.Judul_Berita || 'Tanpa Judul';
  };

  const getDesc = (item) => {
    const attributes = item.attributes || item;
    return attributes.Ringkasan || 'Jelajahi berbagai kegiatan menarik dari ambalan kami yang penuh dengan semangat dan kekayaan pengalaman.';
  };

  const getId = (item) => {
    return item.documentId || item.id;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-10"></div>
          {/* <img alt="Hero Background" className="w-full h-full object-cover object-center grayscale opacity-70" data-alt="Scouts hiking in a lush forest during sunrise" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxR7TiZBtAisDwElYH9C7xBEskAMZNsgjw4Y6D0sCFRx_1yYmsOhyibUc0kOMTKI0156VbvIacjGYshZP-NKArbNpQWHPRtC1fO0jBLTl6QmGko8PYm7nuwNif8-HMuN68P_qMCZl4F7SZXjPpPmwVueTxorQFelB0-WBm31z3bRkwgkUtRueuYfm8q8EhK9inDjtxbifzdZmHGigTqQvjoTzI5_ItEvUOtct69NFSmCNMRFfiTIl2QFiQAB4MMS4Jjivoa60KaGA" /> */}
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block px-4 py-1.5 bg-accent-gold/20 text-accent-gold border border-accent-gold/30 rounded-full text-sm font-bold tracking-wider uppercase">Gerakan Pramuka</span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
              Satu Pramuka untuk <br /><span className="text-accent-gold">Satu Indonesia</span>
            </h1>
            <p className="text-lg text-slate-100 leading-relaxed max-w-lg">
              Membentuk karakter generasi muda yang tangguh, disiplin, dan berjiwa sosial tinggi melalui kegiatan kepramukaan yang inovatif.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-accent-gold hover:bg-accent-gold/90 text-primary px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:-translate-y-1 shadow-xl shadow-black/20">
                Pelajari lebih lanjut
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="relative -mt-16 z-30 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/members" className="group bg-white dark:bg-background-dark p-8 rounded-2xl shadow-xl border border-primary/5 hover:-translate-y-2 hover:scale-105 transition-all duration-300">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">person</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Daftar Anggota</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Bergabunglah bersama kami dan mulailah petualanganmu hari ini.</p>
          </Link>
          <Link to="/gallery" className="group bg-white dark:bg-background-dark p-8 rounded-2xl shadow-xl border border-primary/5 hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">photo_library</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Galeri Kegiatan</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Lihat dokumentasi momen-momen berharga dari setiap kegiatan kami.</p>
          </Link>
          <a className="group bg-white dark:bg-background-dark p-8 rounded-2xl shadow-xl border border-primary/5 hover:-translate-y-2 transition-all duration-300" href="#">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">location_on</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Lokasi Pangkalan</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Temukan lokasi pangkalan ambalan kami untuk koordinasi langsung.</p>
          </a>
        </div>
      </section>

      {/* Visi & Misi */}
      <section id="visi-misi" className="max-w-4xl mx-auto py-16 px-6 text-center scroll-mt-24">
        <h2 className="text-3xl md:text-4xl font-black text-primary mb-8 tracking-tight font-display">Visi &amp; Misi</h2>
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-xl md:text-2xl font-medium text-primary italic leading-relaxed">
              "Menjadi wadah pembentukan karakter generasi muda yang unggul, berbudaya, dan berwawasan global berlandaskan Pancasila."
            </p>
          </div>
          <div>
            <ul className="inline-block text-left space-y-4 text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-accent-gold mt-1">check_circle</span>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-accent-gold mt-1">check_circle</span>
                <span>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-accent-gold mt-1">check_circle</span>
                <span>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sejarah Dewan Ambalan */}
      <section id="sejarah" className="bg-slate-50 dark:bg-white/5 py-20 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-10 tracking-tight font-display">Sejarah Dewan Ambalan</h2>
          <div className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed space-y-6 text-justify md:text-center">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
            </p>
            <p>
              Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus.
            </p>
            <p>
              In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery / Kegiatan Section */}
      <section className="py-24 px-4 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-primary dark:text-slate-100 mb-2 tracking-tight uppercase">Gallery / Kegiatan</h2>
              <div className="w-20 h-1.5 bg-accent-gold rounded-full"></div>
            </div>
            <Link to="/gallery" className="text-primary dark:text-accent-gold font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Lihat Semua <span className="material-symbols-outlined">arrow_right_alt</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 dark:border-white/10 overflow-hidden shadow-sm animate-pulse flex flex-col h-full">
                  <div className="h-56 bg-slate-200 dark:bg-slate-700/50 flex-shrink-0"></div>
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-1/3 mb-4"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700/50 rounded w-full mb-2"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700/50 rounded w-5/6 mb-6"></div>
                    <div className="flex-grow">
                      <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-full mb-2"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-full mb-2"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-3/4 mb-6"></div>
                    </div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-1/4 mt-auto"></div>
                  </div>
                </div>
              ))
            ) : (
              news.map((item) => (
                <div key={getId(item)} className="group relative bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 dark:border-white/10 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 flex flex-col">
                  <div className="h-56 overflow-hidden flex-shrink-0">
                    <img alt={getTitle(item)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={getImageUrl(item)} />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <span className="text-xs font-bold text-accent-gold uppercase tracking-widest">Kabar</span>
                    <h4 className="text-xl font-bold mt-2 mb-4 leading-snug text-primary dark:text-slate-100 line-clamp-2">{getTitle(item)}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 flex-grow">{getDesc(item)}</p>
                    <Link to={`/news/${getId(item)}`} className="inline-flex items-center text-primary dark:text-accent-gold font-bold text-sm gap-2 hover:translate-x-1 transition-transform mt-auto">
                      READ MORE <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 md:py-16 px-4">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden h-[300px] md:h-[400px] border border-primary/10 shadow-lg">
          <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center relative">
            <div className="absolute inset-0  opacity-100 dark:opacity-30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1886.6056158641827!2d111.88044274910669!3d-7.151533014644031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sid!2sid!4v1774416384470!5m2!1sid!2sid" // Isi dengan src dari Google
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="relative z-10 bg-white dark:bg-background-dark p-6 rounded-2xl shadow-2xl border border-primary/10 max-w-xs text-center">
              <span className="material-symbols-outlined text-primary text-4xl mb-2">location_on</span>
              <h5 className="text-lg font-bold">Pangkalan Utama</h5>
              <p className="text-sm text-slate-500 mb-4">Jl. Pramuka No. 123, Kota Pusat, Indonesia</p>
              <button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg"><a href="https://maps.app.goo.gl/qsQrUSMiVkGps95x5">Buka di Maps</a></button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

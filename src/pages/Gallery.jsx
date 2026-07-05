import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://202.155.18.152:1337";

export default function Gallery() {
  const [beritas, setBeritas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeritas = async () => {
      try {
        const response = await fetch(`${STRAPI_URL}/api/beritas?populate=*`);
        const result = await response.json();

        console.log("=== DEBUG GALLERY BERITA ===", result);

        if (result.data) {
          setBeritas(result.data);
        }
      } catch (error) {
        console.log("❌ ERROR: Tidak terhubung ke server Strapi", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeritas();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getImageUrl = (item) => {
    // Handling different Strapi response structures
    const attributes = item.attributes || item;
    const thumb = attributes.Thumbnail || attributes.thumbnail;
    let url = thumb?.data?.attributes?.url || thumb?.url;

    if (url && url.startsWith('/')) {
      url = `${STRAPI_URL}${url}`;
    }

    // Fallback if no image
    return url || 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  };

  const getTitle = (item) => {
    const attributes = item.attributes || item;
    return attributes.Judul_Berita || 'Tanpa Judul';
  };

  const getDate = (item) => {
    const attributes = item.attributes || item;
    return attributes.Tanggal || attributes.publishedAt || attributes.createdAt;
  };

  const getId = (item) => {
    return item.documentId || item.id;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full">
      {/* Header Section */}
      <div className="mb-8 md:mb-12 border-l-4 border-accent-gold pl-6">
        <h1 className="text-3xl md:text-5xl font-black text-primary mb-3 font-display">Galeri Kegiatan</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-base md:text-lg">
          Dokumentasi momen berharga, semangat kepanduan, dan dedikasi anggota Ambalan kami dalam berbagai bakti dan prestasi.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-10 border-b border-primary/10 pb-4 overflow-x-auto">
        <button className="px-5 py-2 rounded-full bg-primary text-white font-bold text-sm whitespace-nowrap">Semua Kegiatan</button>
        <button className="px-5 py-2 rounded-full bg-white dark:bg-background-dark border border-primary/20 text-primary dark:text-slate-300 font-semibold text-sm hover:bg-primary/5 transition-all whitespace-nowrap">Pelantikan</button>
        <button className="px-5 py-2 rounded-full bg-white dark:bg-background-dark border border-primary/20 text-primary dark:text-slate-300 font-semibold text-sm hover:bg-primary/5 transition-all whitespace-nowrap">Bakti Sosial</button>
        <button className="px-5 py-2 rounded-full bg-white dark:bg-background-dark border border-primary/20 text-primary dark:text-slate-300 font-semibold text-sm hover:bg-primary/5 transition-all whitespace-nowrap">Lomba</button>
        <button className="px-5 py-2 rounded-full bg-white dark:bg-background-dark border border-primary/20 text-primary dark:text-slate-300 font-semibold text-sm hover:bg-primary/5 transition-all whitespace-nowrap">Perkemahan</button>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-accent-gold rounded-full animate-spin"></div>
          <span className="ml-3 text-primary font-bold">Memuat data...</span>
        </div>
      ) : beritas.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {beritas.map((item) => (
            <Link to={`/news/${getId(item)}`} key={getId(item)} className="break-inside-avoid group cursor-pointer inline-block w-full">
              <div className="relative overflow-hidden rounded-xl bg-white dark:bg-background-dark shadow-sm hover:shadow-xl transition-all duration-300 border border-primary/5">
                <div className="aspect-[4/3] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${getImageUrl(item)}')` }}>
                </div>
                <div className="p-4">
                  <p className="text-primary font-bold text-lg mb-1 line-clamp-2">{getTitle(item)}</p>
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-medium uppercase tracking-wider">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    <span>{formatDate(getDate(item))}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-background-dark rounded-xl border border-primary/10">
          <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-4 block">photo_library</span>
          <h3 className="text-xl font-bold text-primary dark:text-white mb-2">Belum ada berita</h3>
          <p className="text-slate-500 dark:text-slate-400">Silakan tambahkan data melalui Strapi admin panel.</p>
        </div>
      )}
    </div>
  );
}

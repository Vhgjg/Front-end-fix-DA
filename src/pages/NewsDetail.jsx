import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://192.168.185.4:1337";

export default function NewsDetail() {
  const { id } = useParams();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await fetch(`${STRAPI_URL}/api/beritas/${id}?populate=*`, {
          headers: {
            'Authorization': import.meta.env.VITE_STRAPI_TOKEN ? `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}` : ''
          }
        });
        const result = await response.json();
        if (result.data) {
          setBerita(result.data);
        }
      } catch (error) {
        console.error("Error fetching berita:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBerita();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="w-10 h-10 border-4 border-primary border-t-accent-gold rounded-full animate-spin"></div>
        <span className="ml-4 text-primary font-bold text-lg">Memuat berita...</span>
      </div>
    );
  }

  if (!berita) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">error</span>
        <h2 className="text-2xl font-bold text-primary mb-2">Berita tidak ditemukan</h2>
        <p className="text-slate-500 mb-6">Mungkin berita telah dihapus atau ID tidak valid.</p>
        <Link to="/gallery" className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-lg">Kembali ke Galeri</Link>
      </div>
    );
  }

  // Handle data structure differences between Strapi v4 and v5
  const attributes = berita.attributes || berita;
  
  const getImageUrl = () => {
    const thumb = attributes.Thumbnail || attributes.thumbnail;
    let url = thumb?.data?.attributes?.url || thumb?.url;
    if (url && url.startsWith('/')) {
      url = `${STRAPI_URL}${url}`;
    }
    return url || 'https://images.unsplash.com/photo-1523480717984-24cba35ae1ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
  };

  const title = attributes.Judul_Berita || 'Tanpa Judul';
  const dateStr = attributes.Tanggal || attributes.publishedAt || attributes.createdAt;
  const dateFormatted = dateStr ? new Date(dateStr).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const content = attributes.Isi_Berita || '';

  // Helper to render content properly
  const renderContent = (contentData) => {
    if (!contentData) return null;
    
    // String (markdown or plain text/HTML)
    if (typeof contentData === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: contentData.replace(/\n/g, '<br />') }} />;
    }
    
    // Array (Strapi v5 rich text blocks)
    if (Array.isArray(contentData)) {
      return contentData.map((block, idx) => {
        if (block.type === 'paragraph') {
          return (
            <p key={idx}>
              {block.children?.map((child, cIdx) => (
                <span key={cIdx} className={child.bold ? 'font-bold' : child.italic ? 'italic' : child.underline ? 'underline' : ''}>
                  {child.text}
                </span>
              ))}
            </p>
          );
        }
        if (block.type === 'heading') {
          const Tag = `h${block.level}`;
          return (
            <Tag key={idx} className="font-display text-primary dark:text-accent-gold font-bold pt-4 pb-2">
              {block.children?.map((child, cIdx) => child.text).join('')}
            </Tag>
          );
        }
        if (block.type === 'list') {
          const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
          return (
            <ListTag key={idx} className={block.format === 'ordered' ? 'list-decimal pl-6 my-4 space-y-2' : 'list-disc pl-6 my-4 space-y-2'}>
              {block.children?.map((listItem, lIdx) => (
                <li key={lIdx} className="mb-2">
                  {listItem.children?.map((child, cIdx) => child.text).join('')}
                </li>
              ))}
            </ListTag>
          );
        }
        if (block.type === 'image') {
          return (
            <img 
              key={idx} 
              src={block.image?.url} 
              alt={block.image?.alternativeText || ''} 
              className="my-6 rounded-lg shadow-md w-full object-cover" 
            />
          );
        }
        if (block.type === 'quote') {
          return (
            <blockquote key={idx} className="border-l-4 border-accent-gold bg-primary/5 dark:bg-white/5 p-4 md:p-6 rounded-r-lg italic my-8">
              <p className="text-primary dark:text-slate-200 font-medium text-lg md:text-xl">
                 {block.children?.map((child, cIdx) => child.text).join('')}
              </p>
            </blockquote>
          );
        }
        return null;
      });
    }
    
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 w-full">
      {/* Back Button */}
      <div className="mb-6 md:mb-8">
        <Link to="/gallery" className="group flex items-center gap-2 text-primary dark:text-accent-gold font-bold text-sm hover:translate-x-[-4px] transition-transform w-max">
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Kembali ke Galeri</span>
        </Link>
      </div>

      {/* Featured Image */}
      <div className="relative w-full aspect-video mb-8 md:mb-10 overflow-hidden rounded-lg shadow-xl">
        <img alt={title} className="w-full h-full object-cover" src={getImageUrl()} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 md:p-8">
          <span className="bg-accent-gold text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">Berita</span>
        </div>
      </div>

      {/* Metadata Row */}
      <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 text-xs md:text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2 bg-primary/10 text-primary dark:text-accent-gold px-3 py-1 rounded-full font-semibold">
          <span className="material-symbols-outlined text-sm md:text-base">category</span>
          Kegiatan
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm md:text-base">calendar_month</span>
          {dateFormatted}
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm md:text-base">person</span>
          Pramuka Admin
        </div>
      </div>

      {/* Article Content */}
      <article className="prose prose-slate max-w-none text-slate-700 dark:text-slate-300">
        <h1 className="font-display text-3xl md:text-5xl text-primary dark:text-white font-bold leading-tight mb-6 md:mb-8">
          {title}
        </h1>

        <div className="space-y-6 text-base md:text-lg leading-relaxed content-body">
          {renderContent(content)}
        </div>
      </article>

      {/* Share Section */}
      <section className="mt-12 md:mt-16 pt-8 border-t border-primary/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
             <h3 className="font-display text-lg font-bold text-primary dark:text-white mb-2">Bagikan Berita</h3>
             <p className="text-sm text-slate-500">Ayo sebarkan keseruan ini ke rekan pramuka lainnya!</p>
          </div>
          <div className="flex flex-wrap gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined text-lg">chat</span>
                WhatsApp
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined text-lg">public</span>
                Facebook
             </button>
          </div>
        </div>
      </section>
    </div>
  );
}

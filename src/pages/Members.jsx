import React, { useEffect, useState } from 'react';

export default function Members() {
  // 1. Inisialisasi state untuk menampung data dari Strapi
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL dan Token Strapi dari .env
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://192.168.185.4:1337";
  const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // Ambil data dari endpoint 'anggotas' dengan Authorization
        const response = await fetch(`${STRAPI_URL}/api/anggotas?populate=*`, {
          headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`
          }
        });
        const result = await response.json();

        // Sebagai percobaan cukup 1 data dari database
        const sampleData = result.data ? result.data.slice(0, 1) : [];

        // 2. Mapping data Strapi agar sesuai dengan format variabel 'members'
        const formattedData = sampleData.map(item => {
          return {
            name: item.nama || "Tanpa Nama",
            div: item.Sie || "Tanpa Divisi",
            // Logika warna status: jika ada no_telp dianggap aktif (hijau), jika tidak (abu-abu)
            color: item.telepon ? "bg-green-500" : "bg-gray-400",
            img: item.foto?.url
              ? `${STRAPI_URL}${item.foto.url}`
              : "https://via.placeholder.com/150", // placeholder jika foto kosong
            phone: item.telepon
          };
        });

        setMembers(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching members:", error);
        setLoading(false);
      }
    };

    fetchMembers();
  }, [STRAPI_URL, STRAPI_TOKEN]);

  if (loading) {
    return <div className="text-center py-20 text-primary">Memuat data dewan ambalan...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Search Header */}
      <div className="md:hidden w-full mb-8">
        <div className="flex items-center bg-primary/5 dark:bg-white/5 rounded-lg px-3 py-2 border border-primary/10 w-full">
          <span className="material-symbols-outlined text-primary/50 dark:text-slate-400 mr-2">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-primary/40 dark:placeholder:text-slate-500 outline-none" placeholder="Cari anggota..." type="text" />
        </div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col gap-4 mb-8 md:mb-12 text-center md:text-left">
        <h1 className="text-primary dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight font-display">Daftar Anggota</h1>
        <p className="text-primary/60 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto md:mx-0">
          Temukan dan hubungi rekan pramuka di berbagai divisi. Bangun kolaborasi dan pererat persaudaraan antar sesama penggerak.
        </p>
      </div>

      {/* Filter System */}
      <div className="mb-8 md:mb-10 overflow-x-auto pb-4">
        <div className="flex flex-nowrap items-center gap-3 w-max">
          <button className="px-6 py-2.5 rounded-full bg-primary text-white font-bold text-sm shadow-md transition-all hover:shadow-lg hover:scale-105">
            All
          </button>
          {["Dewan Ambalan", "Humas", "Kerohanian", "Perlengkapan"].map(divisi => (
            <button key={divisi} className="px-6 py-2.5 rounded-full bg-white dark:bg-white/5 text-primary dark:text-slate-300 border border-primary/10 font-bold text-sm transition-all hover:bg-primary/5 dark:hover:bg-white/10">
              {divisi}
            </button>
          ))}
        </div>
      </div>

      {/* Member Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((member, index) => (
          <div key={index} className="group bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-primary/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full border-4 border-accent-gold/20 p-1 overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className={`absolute bottom-1 right-1 ${member.color} w-4 h-4 rounded-full border-2 border-white dark:border-background-dark`}></div>
              </div>
              <h3 className="text-primary dark:text-white text-xl font-bold font-display mb-1">{member.name}</h3>
              <span className="inline-block px-3 py-1 bg-accent-gold/10 dark:bg-accent-gold/20 text-accent-gold font-bold text-xs uppercase tracking-wider rounded-full mb-4">{member.div}</span>
              <div className="flex gap-2 mt-2 text-primary/40">
                <button className="p-2 rounded-lg bg-primary/5 text-primary hover:bg-primary hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-lg">mail</span>
                </button>
                {member.phone && (
                  <a href={`https://wa.me/${member.phone}`} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-primary/5 text-primary hover:bg-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-lg">call</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
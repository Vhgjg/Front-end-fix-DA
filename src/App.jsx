import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Members from './pages/Members';
import NewsDetail from './pages/NewsDetail';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="members" element={<Members />} />
          <Route path="news/:id" element={<NewsDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

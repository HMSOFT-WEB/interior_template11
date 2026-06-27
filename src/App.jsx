import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ShoppingBag, User, Search, ArrowRight } from 'lucide-react';
import * as THREE from 'three';
import './index.css';

import logo from './assets/logo.png';
import heroImg from './assets/hero.png';
import prodImg from './assets/prod1.png';

// 3D Minimalist Abstract Sculpture / Furniture Piece
function AbstractVase() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, -1, 0]}>
        {/* Simple elegant organic shape */}
        <latheGeometry args={[1, 0.4, 64]} />
        <meshStandardMaterial 
          color="#f0ece6" 
          roughness={0.9} 
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#bfaea0" 
          roughness={0.4} 
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <img src={logo} alt="HMSOFT LIVING" onError={(e) => e.target.style.display='none'} />
          HMSOFT LIVING
        </div>
        
        <nav className="nav-links">
          <a href="#">Furniture</a>
          <a href="#">Lighting</a>
          <a href="#">Decor</a>
          <a href="#">Journal</a>
        </nav>
        
        <div className="nav-icons">
          <button><Search size={22} strokeWidth={1.5} /></button>
          <button><User size={22} strokeWidth={1.5} /></button>
          <button><ShoppingBag size={22} strokeWidth={1.5} /></button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img src={heroImg} alt="Minimalist Interior" />
      </div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <motion.span 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          The Spring Collection
        </motion.span>
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Elevate Your <br/>Space.
        </motion.h1>
        <motion.p 
          className="hero-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Discover sustainable, handcrafted furniture designed with Scandinavian simplicity and timeless elegance in mind.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="btn-primary">Explore Collection</button>
        </motion.div>
      </div>
    </section>
  );
}

function Showcase3D() {
  return (
    <section className="showcase-3d">
      <div className="showcase-text">
        <h2>Organic Form</h2>
      </div>
      
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} style={{ zIndex: 2 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#fff" />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#bfaea0" />
        <Environment preset="apartment" />
        
        <PresentationControls global config={{ mass: 2, tension: 500 }} rotation={[0.1, 0, 0]} polar={[-0.2, 0.2]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
          <AbstractVase />
        </PresentationControls>
        
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#000000" />
      </Canvas>
    </section>
  );
}

function Products() {
  const items = [
    { name: "LöV Lounge Chair", price: "$1,250", img: prodImg },
    { name: "Aura Pendant Light", price: "$340", img: prodImg },
    { name: "Nordic Oak Console", price: "$890", img: prodImg },
    { name: "Ceramic Linea Vase", price: "$120", img: prodImg }
  ];

  return (
    <section className="products">
      <div className="section-header">
        <h2 className="section-title">New Arrivals</h2>
        <a href="#" style={{ color: 'var(--accent-dark)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Shop All <ArrowRight size={16} />
        </a>
      </div>
      
      <div className="product-grid">
        {items.map((item, idx) => (
          <motion.div 
            className="product-card" 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            <div className="product-img-box">
              <img src={item.img} alt={item.name} />
              <button className="add-btn">Add to Cart</button>
            </div>
            <div className="product-meta">
              <h3 className="product-name">{item.name}</h3>
              <div className="product-price">{item.price}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Showcase3D />
        <Products />
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">HMSOFT LIVING</div>
            <p className="footer-desc">Curating mindful spaces with sustainable design and uncompromising quality since 2026.</p>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><a href="#">Furniture</a></li>
              <li><a href="#">Lighting</a></li>
              <li><a href="#">Textiles</a></li>
              <li><a href="#">Accessories</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Care Guide</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 HMSOFT Living. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;

// src/components/Header.jsx
import React from 'react';
import { Zap, Library, Sparkles } from 'lucide-react';
import { useAdStore } from '../store/useAdStore';

export default function Header({ activeTab, setActiveTab }) {
  const { savedAds } = useAdStore();

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">
            <Zap size={20} fill="currentColor" />
          </div>
          <div className="logo-text">
            <span className="logo-name">AdForge</span>
            <span className="logo-badge">AI</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="nav">
          <button
            className={`nav-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            <Sparkles size={16} />
            <span>Create</span>
          </button>
          <button
            className={`nav-btn ${activeTab === 'library' ? 'active' : ''}`}
            onClick={() => setActiveTab('library')}
          >
            <Library size={16} />
            <span>Library</span>
            {savedAds.length > 0 && (
              <span className="nav-count">{savedAds.length}</span>
            )}
          </button>
        </nav>

        {/* Status */}
        <div className="header-status">
          <div className="status-dot" />
          <span className="status-text">Powered by Grok-3</span>
        </div>
      </div>
    </header>
  );
}

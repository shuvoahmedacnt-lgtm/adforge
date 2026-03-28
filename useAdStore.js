// src/pages/LibraryPage.jsx
import React, { useState } from 'react';
import { Trash2, ExternalLink, Search, Grid3x3, List, Sparkles } from 'lucide-react';
import { useAdStore } from '../store/useAdStore';

export default function LibraryPage() {
  const { savedAds, deleteAd, loadAd, setActiveTab } = useAdStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = savedAds.filter(
    (ad) =>
      ad.formData.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.formData.adPlatform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.creative.headline?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLoad = (id) => {
    loadAd(id);
    setActiveTab('create');
  };

  const handleDelete = (id) => {
    if (deleteConfirm === id) {
      deleteAd(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  if (savedAds.length === 0) {
    return (
      <div className="library-empty">
        <div className="library-empty-icon">
          <Sparkles size={48} />
        </div>
        <h3 className="library-empty-title">Your library is empty</h3>
        <p className="library-empty-sub">Generate your first ad creative and save it here</p>
        <button className="generate-btn" style={{ maxWidth: 240 }} onClick={() => setActiveTab('create')}>
          <Sparkles size={18} />
          <span>Start Creating</span>
        </button>
      </div>
    );
  }

  return (
    <div className="library-page">
      {/* Toolbar */}
      <div className="library-toolbar">
        <div className="library-search-wrap">
          <Search size={16} className="library-search-icon" />
          <input
            className="library-search"
            type="text"
            placeholder="Search by product, platform, or headline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid3x3 size={16} />
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List size={16} />
          </button>
        </div>
        <span className="library-count">{filtered.length} ad{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Grid / List */}
      <div className={viewMode === 'grid' ? 'library-grid' : 'library-list'}>
        {filtered.map((ad) => (
          <LibraryCard
            key={ad.id}
            ad={ad}
            viewMode={viewMode}
            onLoad={() => handleLoad(ad.id)}
            onDelete={() => handleDelete(ad.id)}
            deleteConfirm={deleteConfirm === ad.id}
          />
        ))}
      </div>

      {filtered.length === 0 && searchQuery && (
        <div className="library-no-results">
          <p>No ads match "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}

function LibraryCard({ ad, viewMode, onLoad, onDelete, deleteConfirm }) {
  const { creative, formData, createdAt } = ad;
  const date = new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const tokens = creative.designTokens || {};

  if (viewMode === 'list') {
    return (
      <div className="library-list-item">
        <div
          className="lib-list-swatch"
          style={{ background: `linear-gradient(135deg, ${tokens.primaryColor || '#6366F1'}, ${tokens.secondaryColor || '#8B5CF6'})` }}
        />
        <div className="lib-list-info">
          <h4 className="lib-list-product">{formData.productName}</h4>
          <p className="lib-list-headline">{creative.headline}</p>
          <div className="lib-list-meta">
            <span className="lib-meta-tag">{formData.adPlatform}</span>
            <span className="lib-meta-tag">{formData.adFormat}</span>
            <span className="lib-meta-date">{date}</span>
          </div>
        </div>
        <div className="lib-list-actions">
          <button className="lib-action-btn" onClick={onLoad} title="Open in editor">
            <ExternalLink size={15} />
          </button>
          <button
            className={`lib-action-btn lib-delete-btn ${deleteConfirm ? 'confirm' : ''}`}
            onClick={onDelete}
            title={deleteConfirm ? 'Click again to confirm delete' : 'Delete'}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="library-card">
      {/* Mini preview */}
      <div
        className="lib-card-preview"
        style={{
          '--ad-primary': tokens.primaryColor || '#6366F1',
          '--ad-secondary': tokens.secondaryColor || '#8B5CF6',
          '--ad-accent': tokens.accentColor || '#F59E0B',
        }}
      >
        <div className="lib-preview-bg-1" />
        <div className="lib-preview-bg-2" />
        <div className="lib-preview-content">
          <div className="lib-preview-tag">AD</div>
          <h5 className="lib-preview-headline">{creative.headline}</h5>
          <button className="lib-preview-cta">{creative.cta}</button>
        </div>
      </div>

      {/* Card info */}
      <div className="lib-card-body">
        <div className="lib-card-meta">
          <span className="lib-meta-tag">{formData.adPlatform}</span>
          <span className="lib-meta-tag">{formData.adFormat}</span>
        </div>
        <h4 className="lib-card-product">{formData.productName}</h4>
        <p className="lib-card-date">{date}</p>
      </div>

      {/* Actions */}
      <div className="lib-card-actions">
        <button className="lib-card-btn lib-card-primary" onClick={onLoad}>
          <ExternalLink size={14} />
          <span>Open</span>
        </button>
        <button
          className={`lib-card-btn lib-card-danger ${deleteConfirm ? 'confirm' : ''}`}
          onClick={onDelete}
        >
          <Trash2 size={14} />
          <span>{deleteConfirm ? 'Confirm?' : 'Delete'}</span>
        </button>
      </div>
    </div>
  );
}

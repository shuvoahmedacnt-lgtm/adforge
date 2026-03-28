// src/components/AdForm.jsx
import React, { useState } from 'react';
import { ChevronDown, Wand2, Loader2 } from 'lucide-react';
import { useAdStore } from '../store/useAdStore';
import { PLATFORMS, TONES, PRESET_PALETTES } from '../lib/constants';

export default function AdForm() {
  const { formData, setFormData, setBrandColor, isGenerating, generateAd, error, clearError } = useAdStore();
  const [expandedSection, setExpandedSection] = useState('product');

  const currentPlatform = PLATFORMS.find((p) => p.id === formData.adPlatform) || PLATFORMS[0];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    await generateAd();
  };

  return (
    <form className="ad-form" onSubmit={handleSubmit}>
      {/* ── Product Section ─────────────────────────────── */}
      <FormSection
        id="product"
        title="Product Details"
        icon="📦"
        expanded={expandedSection === 'product'}
        onToggle={() => toggleSection('product')}
      >
        <div className="field-group">
          <label className="field-label">Product Name *</label>
          <input
            className="field-input"
            type="text"
            placeholder="e.g. SuperNova Running Shoes"
            value={formData.productName}
            onChange={(e) => setFormData({ productName: e.target.value })}
            required
          />
        </div>

        <div className="field-group">
          <label className="field-label">Product Description *</label>
          <textarea
            className="field-input field-textarea"
            placeholder="Describe your product, its key benefits, what makes it unique, and your value proposition..."
            value={formData.productDescription}
            onChange={(e) => setFormData({ productDescription: e.target.value })}
            rows={4}
            required
          />
        </div>

        <div className="field-group">
          <label className="field-label">Target Audience</label>
          <input
            className="field-input"
            type="text"
            placeholder="e.g. Women 25-40, fitness enthusiasts, urban professionals"
            value={formData.targetAudience}
            onChange={(e) => setFormData({ targetAudience: e.target.value })}
          />
        </div>
      </FormSection>

      {/* ── Brand Colors Section ─────────────────────────── */}
      <FormSection
        id="brand"
        title="Brand Identity"
        icon="🎨"
        expanded={expandedSection === 'brand'}
        onToggle={() => toggleSection('brand')}
      >
        <div className="field-group">
          <label className="field-label">Brand Colors</label>
          <div className="color-pickers">
            {formData.brandColors.map((color, i) => (
              <div key={i} className="color-picker-item">
                <label className="color-picker-label">{['Primary', 'Secondary', 'Accent'][i]}</label>
                <div className="color-picker-row">
                  <input
                    type="color"
                    className="color-input"
                    value={color}
                    onChange={(e) => setBrandColor(i, e.target.value)}
                  />
                  <input
                    type="text"
                    className="field-input color-hex"
                    value={color}
                    onChange={(e) => setBrandColor(i, e.target.value)}
                    maxLength={7}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="field-group">
          <label className="field-label">Quick Palettes</label>
          <div className="palette-grid">
            {PRESET_PALETTES.map((palette) => (
              <button
                key={palette.name}
                type="button"
                className="palette-btn"
                onClick={() => setFormData({ brandColors: palette.colors })}
                title={palette.name}
              >
                <div className="palette-swatches">
                  {palette.colors.map((c, i) => (
                    <div key={i} className="palette-swatch" style={{ background: c }} />
                  ))}
                </div>
                <span className="palette-name">{palette.name}</span>
              </button>
            ))}
          </div>
        </div>
      </FormSection>

      {/* ── Platform Section ─────────────────────────────── */}
      <FormSection
        id="platform"
        title="Ad Placement"
        icon="📡"
        expanded={expandedSection === 'platform'}
        onToggle={() => toggleSection('platform')}
      >
        <div className="field-group">
          <label className="field-label">Platform</label>
          <div className="platform-grid">
            {PLATFORMS.map((platform) => (
              <button
                key={platform.id}
                type="button"
                className={`platform-btn ${formData.adPlatform === platform.id ? 'active' : ''}`}
                style={{ '--platform-color': platform.color }}
                onClick={() => {
                  setFormData({ adPlatform: platform.id, adFormat: platform.formats[0].id });
                }}
              >
                <span className="platform-icon">{platform.icon}</span>
                <span className="platform-name">{platform.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="field-group">
          <label className="field-label">Ad Format</label>
          <div className="format-list">
            {currentPlatform.formats.map((format) => (
              <button
                key={format.id}
                type="button"
                className={`format-btn ${formData.adFormat === format.id ? 'active' : ''}`}
                onClick={() => setFormData({ adFormat: format.id })}
              >
                <span className="format-label">{format.label}</span>
                <span className="format-size">{format.size}</span>
              </button>
            ))}
          </div>
        </div>
      </FormSection>

      {/* ── Tone Section ─────────────────────────────────── */}
      <FormSection
        id="tone"
        title="Creative Direction"
        icon="✍️"
        expanded={expandedSection === 'tone'}
        onToggle={() => toggleSection('tone')}
      >
        <div className="field-group">
          <label className="field-label">Ad Tone</label>
          <div className="tone-grid">
            {TONES.map((tone) => (
              <button
                key={tone.id}
                type="button"
                className={`tone-btn ${formData.tone === tone.id ? 'active' : ''}`}
                onClick={() => setFormData({ tone: tone.id })}
              >
                <span className="tone-emoji">{tone.emoji}</span>
                <span className="tone-label">{tone.label}</span>
                <span className="tone-desc">{tone.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="field-group">
          <label className="field-label">Additional Notes</label>
          <textarea
            className="field-input field-textarea"
            placeholder="Any specific requirements, competitor differentiation, promotions, etc."
            value={formData.additionalNotes}
            onChange={(e) => setFormData({ additionalNotes: e.target.value })}
            rows={3}
          />
        </div>
      </FormSection>

      {/* ── Error ─────────────────────────────────────────── */}
      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button type="button" onClick={clearError} className="error-close">×</button>
        </div>
      )}

      {/* ── Submit ────────────────────────────────────────── */}
      <button type="submit" className="generate-btn" disabled={isGenerating}>
        {isGenerating ? (
          <>
            <Loader2 size={20} className="spin" />
            <span>Generating your $10K creative...</span>
          </>
        ) : (
          <>
            <Wand2 size={20} />
            <span>Generate Ad Creative</span>
          </>
        )}
      </button>
    </form>
  );
}

function FormSection({ id, title, icon, expanded, onToggle, children }) {
  return (
    <div className={`form-section ${expanded ? 'expanded' : ''}`}>
      <button type="button" className="section-header" onClick={onToggle}>
        <div className="section-title">
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        <ChevronDown size={16} className={`section-arrow ${expanded ? 'rotated' : ''}`} />
      </button>
      {expanded && <div className="section-body">{children}</div>}
    </div>
  );
}

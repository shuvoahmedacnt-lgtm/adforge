// src/components/AdPreview.jsx
import React, { useRef } from 'react';
import { Save, Download, Copy, RefreshCw, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import { useAdStore } from '../store/useAdStore';

const VARIANT_TABS = [
  { id: 'main', label: 'Main Creative' },
  { id: 'A', label: 'Variant A' },
  { id: 'B', label: 'Variant B' },
  { id: 'C', label: 'Variant C' },
];

export default function AdPreview() {
  const { currentCreative, isGenerating, saveCurrentAd, activeVariant, setActiveVariant, formData } = useAdStore();
  const previewRef = useRef(null);

  if (isGenerating) {
    return (
      <div className="preview-panel loading-state">
        <div className="loading-anim">
          <div className="loading-rings">
            <div className="ring ring-1" />
            <div className="ring ring-2" />
            <div className="ring ring-3" />
          </div>
          <div className="loading-icon">
            <Sparkles size={28} />
          </div>
        </div>
        <h3 className="loading-title">Crafting your creative...</h3>
        <p className="loading-sub">Our AI is thinking like a $10K/creative art director</p>
        <div className="loading-steps">
          {['Analyzing your brand', 'Writing scroll-stopping copy', 'Crafting 3 variants', 'Adding strategy insights'].map((step, i) => (
            <div key={i} className="loading-step" style={{ animationDelay: `${i * 0.6}s` }}>
              <Loader2 size={12} className="spin" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!currentCreative) {
    return (
      <div className="preview-panel empty-state">
        <div className="empty-icon">
          <Sparkles size={40} />
        </div>
        <h3 className="empty-title">Your ad preview will appear here</h3>
        <p className="empty-sub">Fill in your product details and click Generate to create a professional ad creative</p>
        <div className="empty-features">
          {['3 copy variants per generation', 'Platform-specific optimization', 'Psychology insights included', 'Visual concept direction'].map((f) => (
            <div key={f} className="empty-feature">
              <span className="empty-feature-dot" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const c = currentCreative;
  const tokens = c.designTokens || {};
  const isVariant = activeVariant !== 'main';
  const variantData = isVariant ? c.adVariants?.find((v) => v.variant === activeVariant) : null;

  const displayHeadline = variantData?.headline || c.headline;
  const displayBody = variantData?.bodyText || c.bodyText;
  const displayCta = variantData?.cta || c.cta;

  const handleSave = () => {
    const id = saveCurrentAd();
    if (id) {
      // Quick feedback
      const btn = document.getElementById('save-btn');
      if (btn) {
        btn.textContent = '✓ Saved!';
        setTimeout(() => { btn.textContent = 'Save to Library'; }, 2000);
      }
    }
  };

  const handleCopy = () => {
    const text = `HEADLINE: ${displayHeadline}\n\nBODY: ${displayBody}\n\nCTA: ${displayCta}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="preview-panel">
      {/* Variant Tabs */}
      <div className="variant-tabs">
        {VARIANT_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`variant-tab ${activeVariant === tab.id ? 'active' : ''}`}
            onClick={() => setActiveVariant(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Ad Canvas */}
      <div className="ad-canvas-wrap" ref={previewRef}>
        <div
          className="ad-canvas"
          style={{
            '--ad-primary': tokens.primaryColor || '#6366F1',
            '--ad-secondary': tokens.secondaryColor || '#8B5CF6',
            '--ad-accent': tokens.accentColor || '#F59E0B',
          }}
        >
          {/* Decorative BG */}
          <div className="ad-bg-shape ad-bg-1" />
          <div className="ad-bg-shape ad-bg-2" />

          {/* Platform badge */}
          <div className="ad-platform-badge">
            {formData.adPlatform} · {formData.adFormat}
          </div>

          {/* Content */}
          <div className="ad-content">
            <div className="ad-tag">ADVERTISEMENT</div>
            <h2 className="ad-headline">{displayHeadline}</h2>
            {c.subheadline && activeVariant === 'main' && (
              <p className="ad-subheadline">{c.subheadline}</p>
            )}
            <p className="ad-body">{displayBody}</p>
            <button className="ad-cta-btn">{displayCta}</button>
            {c.tagline && (
              <p className="ad-tagline">{c.tagline}</p>
            )}
          </div>
        </div>
      </div>

      {/* Variant angle label */}
      {isVariant && variantData && (
        <div className="variant-angle-label">
          <span className="variant-angle-pill">
            Angle: {variantData.angle}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="preview-actions">
        <button id="save-btn" className="action-btn action-primary" onClick={handleSave}>
          <Save size={15} />
          <span>Save to Library</span>
        </button>
        <button className="action-btn action-secondary" onClick={handleCopy}>
          <Copy size={15} />
          <span>Copy Copy</span>
        </button>
      </div>

      {/* Insights Grid */}
      {activeVariant === 'main' && (
        <div className="insights-grid">
          <InsightCard title="Strategy" icon="🧠" content={c.platformStrategy} />
          <InsightCard title="Psychology" icon="🎯" content={c.psychologyInsight} />
          <InsightCard title="Copywriting" icon="✍️" content={c.copywritingNotes} />
          {c.visualConcept && (
            <InsightCard title="Visual Direction" icon="🎨" content={c.visualConcept.layout + ' — ' + c.visualConcept.mood} />
          )}
        </div>
      )}

      {/* All Variants Summary (main tab only) */}
      {activeVariant === 'main' && c.adVariants?.length > 0 && (
        <div className="variants-summary">
          <h4 className="variants-summary-title">3 Copy Variants Generated</h4>
          <div className="variants-list">
            {c.adVariants.map((v) => (
              <div key={v.variant} className="variant-card" onClick={() => setActiveVariant(v.variant)}>
                <div className="variant-card-header">
                  <span className="variant-badge">Variant {v.variant}</span>
                  <span className="variant-angle-tag">{v.angle}</span>
                  <ExternalLink size={12} className="variant-arrow" />
                </div>
                <p className="variant-card-headline">{v.headline}</p>
                <p className="variant-card-cta">CTA: {v.cta}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InsightCard({ title, icon, content }) {
  if (!content) return null;
  return (
    <div className="insight-card">
      <div className="insight-header">
        <span>{icon}</span>
        <span className="insight-title">{title}</span>
      </div>
      <p className="insight-content">{content}</p>
    </div>
  );
}

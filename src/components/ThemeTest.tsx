export default function ThemeTest() {
  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-display-1 mb-4 text-gradient-creative">
          AI Content Creation Studio
        </h1>
        <p className="text-body-large text-text-secondary max-w-6xl">
          Theme & Color System Test - Showcasing our vibrant, creative, and cutting-edge design system
        </p>
      </header>

      {/* Color Palette Section */}
      <section className="mb-16">
        <h2 className="text-heading-2 mb-8">Color Palette</h2>
        
        {/* Primary Colors */}
        <div className="mb-12">
          <h3 className="text-heading-3 mb-6">Primary Colors (Vibrant & Creative)</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-11 gap-4">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
              <div key={shade} className="text-center">
                <div 
                  className={`w-full h-20 rounded-lg mb-2 border border-border`}
                  style={{ backgroundColor: `var(--primary-${shade})` }}
                ></div>
                <span className="text-tiny font-mono">primary-{shade}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Colors */}
        <div className="mb-12">
          <h3 className="text-heading-3 mb-6">Secondary Colors (Innovative & Cutting-edge)</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-11 gap-4">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
              <div key={shade} className="text-center">
                <div 
                  className={`w-full h-20 rounded-lg mb-2 border border-border`}
                  style={{ backgroundColor: `var(--secondary-${shade})` }}
                ></div>
                <span className="text-tiny font-mono">secondary-{shade}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Accent Colors */}
        <div className="mb-12">
          <h3 className="text-heading-3 mb-6">Accent Colors (Creative & Energetic)</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'emerald', var: 'accent-emerald' },
              { name: 'amber', var: 'accent-amber' },
              { name: 'rose', var: 'accent-rose' },
              { name: 'indigo', var: 'accent-indigo' },
              { name: 'cyan', var: 'accent-cyan' }
            ].map((color) => (
              <div key={color.name} className="text-center">
                <div 
                  className={`w-full h-20 rounded-lg mb-2 border border-border`}
                  style={{ backgroundColor: `var(--${color.var})` }}
                ></div>
                <span className="text-tiny font-mono">{color.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Colors */}
        <div className="mb-12">
          <h3 className="text-heading-3 mb-6">Status Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'success', shades: [50, 500, 600, 700] },
              { name: 'warning', shades: [50, 500, 600, 700] },
              { name: 'error', shades: [50, 500, 600, 700] },
              { name: 'info', shades: [50, 500, 600, 700] }
            ].map((status) => (
              <div key={status.name} className="space-y-2">
                <h4 className="text-heading-4 capitalize">{status.name}</h4>
                <div className="grid grid-cols-4 gap-2">
                  {status.shades.map((shade) => (
                    <div key={shade} className="text-center">
                      <div 
                        className={`w-full h-12 rounded-md mb-1 border border-border`}
                        style={{ backgroundColor: `var(--${status.name}-${shade})` }}
                      ></div>
                      <span className="text-tiny font-mono">{shade}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="mb-16">
        <h2 className="text-heading-2 mb-8">Typography Scale</h2>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-display-1 mb-2">Display 1 - The quick brown fox jumps over the lazy dog</h1>
            <p className="text-caption">text-display-1 - 48px, Bold, Tight line-height</p>
          </div>
          
          <div>
            <h2 className="text-display-2 mb-2">Display 2 - The quick brown fox jumps over the lazy dog</h2>
            <p className="text-caption">text-display-2 - 36px, Bold, Tight line-height</p>
          </div>
          
          <div>
            <h3 className="text-heading-1 mb-2">Heading 1 - The quick brown fox jumps over the lazy dog</h3>
            <p className="text-caption">text-heading-1 - 30px, Semibold, Snug line-height</p>
          </div>
          
          <div>
            <h4 className="text-heading-2 mb-2">Heading 2 - The quick brown fox jumps over the lazy dog</h4>
            <p className="text-caption">text-heading-2 - 24px, Semibold, Snug line-height</p>
          </div>
          
          <div>
            <h5 className="text-heading-3 mb-2">Heading 3 - The quick brown fox jumps over the lazy dog</h5>
            <p className="text-caption">text-heading-3 - 20px, Semibold, Snug line-height</p>
          </div>
          
          <div>
            <h6 className="text-heading-4 mb-2">Heading 4 - The quick brown fox jumps over the lazy dog</h6>
            <p className="text-caption">text-heading-4 - 18px, Medium, Normal line-height</p>
          </div>
          
          <div>
            <p className="text-body-large mb-2">Body Large - The quick brown fox jumps over the lazy dog. This is a longer paragraph to demonstrate how the text flows and wraps naturally across multiple lines.</p>
            <p className="text-caption">text-body-large - 18px, Normal, Relaxed line-height</p>
          </div>
          
          <div>
            <p className="text-body mb-2">Body - The quick brown fox jumps over the lazy dog. This is a longer paragraph to demonstrate how the text flows and wraps naturally across multiple lines.</p>
            <p className="text-caption">text-body - 16px, Normal, Relaxed line-height</p>
          </div>
          
          <div>
            <p className="text-body-small mb-2">Body Small - The quick brown fox jumps over the lazy dog. This is a longer paragraph to demonstrate how the text flows and wraps naturally across multiple lines.</p>
            <p className="text-caption">text-body-small - 14px, Normal, Relaxed line-height, Secondary color</p>
          </div>
          
          <div>
            <p className="text-caption mb-2">CAPTION TEXT - The quick brown fox jumps over the lazy dog</p>
            <p className="text-caption">text-caption - 12px, Medium, Normal line-height, Uppercase</p>
          </div>
          
          <div>
            <p className="text-tiny mb-2">Tiny Text - The quick brown fox jumps over the lazy dog</p>
            <p className="text-caption">text-tiny - 10px, Medium, Normal line-height</p>
          </div>
        </div>
      </section>

      {/* Component Styles Section */}
      <section className="mb-16">
        <h2 className="text-heading-2 mb-8">Component Styles</h2>
        
        {/* Buttons */}
        <div className="mb-12">
          <h3 className="text-heading-3 mb-6">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">Primary Button</button>
            <button className="btn-secondary">Secondary Button</button>
            <button className="btn-ghost">Ghost Button</button>
            <button className="btn-primary" disabled>Disabled Button</button>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-12">
          <h3 className="text-heading-3 mb-6">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h4 className="text-heading-4 mb-3">Standard Card</h4>
              <p className="text-body-small mb-4">This is a standard card with subtle hover effects and clean styling.</p>
              <button className="btn-primary">Action</button>
            </div>
            <div className="card-elevated">
              <h4 className="text-heading-4 mb-3">Elevated Card</h4>
              <p className="text-body-small mb-4">This is an elevated card with more prominent shadows and hover effects.</p>
              <button className="btn-secondary">Action</button>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="mb-12">
          <h3 className="text-heading-3 mb-6">Input Fields</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-caption mb-2 block">Standard Input</label>
              <input 
                type="text" 
                className="input w-full" 
                placeholder="Enter your text here..."
              />
            </div>
            <div>
              <label className="text-caption mb-2 block">Disabled Input</label>
              <input 
                type="text" 
                className="input w-full" 
                placeholder="Disabled input"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-12">
          <h3 className="text-heading-3 mb-6">Badges</h3>
          <div className="flex flex-wrap gap-4">
            <span className="badge badge-primary">Primary</span>
            <span className="badge badge-secondary">Secondary</span>
            <span className="badge badge-success">Success</span>
            <span className="badge badge-warning">Warning</span>
            <span className="badge badge-error">Error</span>
          </div>
        </div>

        {/* Gradients */}
        <div className="mb-12">
          <h3 className="text-heading-3 mb-6">Gradients</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="gradient-primary h-32 rounded-xl flex items-center justify-center">
              <span className="text-text-inverse font-semibold">Primary Gradient</span>
            </div>
            <div className="gradient-secondary h-32 rounded-xl flex items-center justify-center">
              <span className="text-text-inverse font-semibold">Secondary Gradient</span>
            </div>
            <div className="gradient-creative h-32 rounded-xl flex items-center justify-center">
              <span className="text-text-inverse font-semibold">Creative Gradient</span>
            </div>
          </div>
        </div>

        {/* Glass Effect */}
        <div className="mb-12">
          <h3 className="text-heading-3 mb-6">Glass Effect</h3>
          <div className="relative h-32 rounded-xl overflow-hidden bg-gradient-to-br from-primary-400 to-secondary-500">
            <div className="glass absolute inset-4 rounded-lg flex items-center justify-center">
              <span className="text-text-inverse font-semibold">Glass Effect</span>
            </div>
          </div>
        </div>
      </section>

      {/* Animations Section */}
      <section className="mb-16">
        <h2 className="text-heading-2 mb-8">Animations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card animate-fade-in">
            <h4 className="text-heading-4 mb-3">Fade In</h4>
            <p className="text-body-small">This card fades in when the page loads.</p>
          </div>
          
          <div className="card animate-slide-up">
            <h4 className="text-heading-4 mb-3">Slide Up</h4>
            <p className="text-body-small">This card slides up from below.</p>
          </div>
          
          <div className="card animate-pulse-glow">
            <h4 className="text-heading-4 mb-3">Pulse Glow</h4>
            <p className="text-body-small">This card has a pulsing glow effect.</p>
          </div>
        </div>
      </section>

      {/* Dark Mode Toggle Info */}
      <section className="mb-16">
        <h2 className="text-heading-2 mb-8">Dark Mode Support</h2>
        <div className="card">
          <h3 className="text-heading-3 mb-4">Automatic Dark Mode</h3>
          <p className="text-body mb-4">
            This theme automatically adapts to your system&apos;s dark mode preference. 
            Try switching your system theme to see the colors change!
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-background-secondary p-4 rounded-lg">
              <p className="text-caption mb-2">Background Secondary</p>
              <p className="text-body-small">Adapts to light/dark mode</p>
            </div>
            <div className="bg-background-tertiary p-4 rounded-lg">
              <p className="text-caption mb-2">Background Tertiary</p>
              <p className="text-body-small">Adapts to light/dark mode</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-border">
        <p className="text-body-small text-text-tertiary">
          AI Content Creation Studio - Theme System Ready for Development
        </p>
      </footer>
    </div>
  );
} 
import { ArrowRight, Leaf } from 'lucide-react';

const Hero = () => {
  const handleStartChat = () => {
    // Dispatch custom event to open chat widget
    window.dispatchEvent(new CustomEvent('open-chat'));
  };

  return (
    <section style={{
      padding: '6rem 0',
      background: 'linear-gradient(135deg, var(--bg) 0%, var(--primary-light) 100%)',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative leaf */}
      <Leaf 
        size={120} 
        color="var(--primary)" 
        style={{ 
          position: 'absolute', 
          right: '-20px', 
          top: '-20px', 
          opacity: 0.1, 
          transform: 'rotate(45deg)' 
        }} 
      />

      <div className="container animate-fade-in" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        zIndex: 1
      }}>
        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          color: 'var(--primary)',
          fontWeight: '600',
          fontSize: '0.875rem',
          marginBottom: '1.5rem',
          boxShadow: 'var(--shadow)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--primary)', borderRadius: '50%', display: 'inline-block' }}></span>
          Smart & Rule-Based
        </div>
        
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '700',
          color: 'var(--text)',
          marginBottom: '1.5rem',
          lineHeight: '1.1'
        }}>
          Your Personal <span style={{ color: 'var(--primary)' }}>Diet Assistant</span>
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text-muted)',
          marginBottom: '2.5rem',
          maxWidth: '600px',
          lineHeight: '1.6'
        }}>
          Get personalized diet plans, fitness advice, and healthy lifestyle tips instantly. Start chatting to achieve your goals.
        </p>
        
        <button 
          onClick={handleStartChat}
          style={{
            backgroundColor: 'var(--primary)',
            color: '#fff',
            padding: '1rem 2rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: 'var(--shadow)',
            transition: 'transform 0.2s, background-color 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Start Chat <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default Hero;

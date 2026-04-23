import { Moon, Sun, Salad } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(var(--surface), 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border)',
      padding: '1rem 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            backgroundColor: 'var(--primary-light)', 
            padding: '0.5rem', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Salad color="var(--primary)" size={24} />
          </div>
          <span style={{ 
            fontSize: '1.25rem', 
            fontWeight: '700', 
            color: 'var(--text)' 
          }}>
            DietBuddy
          </span>
        </div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#about" style={{ color: 'var(--text)', fontWeight: '500' }}>About</a>
          <a href="#features" style={{ color: 'var(--text)', fontWeight: '500' }}>Features</a>
          
          <button 
            onClick={toggleTheme}
            style={{
              background: 'transparent',
              color: 'var(--text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
              borderRadius: '50%',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

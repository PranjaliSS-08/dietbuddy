import { Activity, Apple, Target, Scale } from 'lucide-react';

const AboutCard = ({ icon: Icon, title, desc }) => (
  <div style={{
    backgroundColor: 'var(--surface)',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: 'var(--shadow)',
    transition: 'transform 0.3s ease',
  }}
  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
  >
    <div style={{ 
      backgroundColor: 'var(--primary-light)', 
      width: '50px', 
      height: '50px', 
      borderRadius: '12px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      marginBottom: '1.5rem'
    }}>
      <Icon size={24} color="var(--primary)" />
    </div>
    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text)' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)' }}>{desc}</p>
  </div>
);

const About = () => {
  return (
    <section id="about" style={{ padding: '6rem 0', backgroundColor: 'var(--bg)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>How It Works</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            DietBuddy collects basic information to provide tailored recommendations for your health journey.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          <AboutCard 
            icon={Scale} 
            title="Weight Tracking" 
            desc="Input your current weight to help us understand your starting point." 
          />
          <AboutCard 
            icon={Apple} 
            title="Diet Preference" 
            desc="Whether you're veg, non-veg, or vegan, we have plans for you." 
          />
          <AboutCard 
            icon={Target} 
            title="Your Goals" 
            desc="Set a goal for weight loss, gain, or simply maintaining fitness." 
          />
          <AboutCard 
            icon={Activity} 
            title="Lifestyle" 
            desc="Tell us about your activity level for precise calorie recommendations." 
          />
        </div>

        <div style={{
          backgroundColor: 'var(--primary)',
          borderRadius: '24px',
          padding: '3rem',
          color: 'white',
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#fff' }}>What You Get</h3>
          <p style={{ fontSize: '1.125rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
            Personalized diet plans • Meal recommendations • Exercise suggestions • Daily health and lifestyle tips
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

import { MessageSquare, Zap, Smile, BookOpen } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, desc }) => (
  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
    <div style={{
      backgroundColor: 'var(--surface)',
      minWidth: '60px',
      height: '60px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow)'
    }}>
      <Icon size={28} color="var(--primary)" />
    </div>
    <div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text)' }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)' }}>{desc}</p>
    </div>
  </div>
);

const Features = () => {
  return (
    <section id="features" style={{ padding: '6rem 0', backgroundColor: 'var(--surface)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text)' }}>
              A smarter way to reach your fitness goals
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>
              Our AI assistant guides you through a step-by-step conversation to build the perfect plan for your unique body and lifestyle.
            </p>
            
            <FeatureItem 
              icon={MessageSquare} 
              title="Guided Conversation" 
              desc="Step-by-step guided diet conversation to make getting started easy and fun." 
            />
            <FeatureItem 
              icon={Zap} 
              title="Quick Responses" 
              desc="Instant answers to your health questions, 24/7." 
            />
            <FeatureItem 
              icon={Smile} 
              title="Beginner Friendly" 
              desc="Clean, intuitive interface designed for everyone." 
            />
          </div>
          
          <div style={{ 
            flex: '1 1 400px', 
            position: 'relative',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '350px',
              height: '500px',
              backgroundColor: 'var(--bg)',
              borderRadius: '24px',
              boxShadow: 'var(--shadow-lg)',
              border: '8px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem'
            }}>
              <div style={{ 
                alignSelf: 'flex-start', 
                backgroundColor: 'var(--surface)', 
                padding: '0.75rem 1rem', 
                borderRadius: '16px', 
                borderBottomLeftRadius: '4px',
                marginBottom: '1rem',
                boxShadow: 'var(--shadow)'
              }}>
                <p>Hi! What's your current goal?</p>
              </div>
              <div style={{ 
                alignSelf: 'flex-end', 
                backgroundColor: 'var(--primary)', 
                color: 'white',
                padding: '0.75rem 1rem', 
                borderRadius: '16px', 
                borderBottomRightRadius: '4px',
                marginBottom: '1rem',
                boxShadow: 'var(--shadow)'
              }}>
                <p>I want to lose weight</p>
              </div>
              <div style={{ 
                alignSelf: 'flex-start', 
                backgroundColor: 'var(--surface)', 
                padding: '0.75rem 1rem', 
                borderRadius: '16px', 
                borderBottomLeftRadius: '4px',
                marginBottom: '1rem',
                boxShadow: 'var(--shadow)'
              }}>
                <p>Great! Are you veg or non-veg?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

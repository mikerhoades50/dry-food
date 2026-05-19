import { useState } from 'react';

export default function BuyMeABeer() {
  const [amount, setAmount] = useState(5);

  const quickAmounts = [5, 8, 10, 20, 25, 50];

  const paypalUsername = "mikerhoades50";   

  const paypalLink = `https://www.paypal.com/paypalme/${paypalUsername}/${amount}`;

  return (
    <div className="container" style={{ maxWidth: '620px', margin: '60px auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>🍺 Buy Me a Beer!</h1>
      
      <p style={{ fontSize: '1.35rem', color: 'var(--text-secondary)', marginBottom: '40px' }}>
        If this site has helped you, consider buying me a cold one!<br />
        Every donation is greatly appreciated.
      </p>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px' }}>Quick Amounts</h3>
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          marginBottom: '30px'
        }}>
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt)}
              style={{
                padding: '14px 26px',
                fontSize: '1.15rem',
                fontWeight: '600',
                borderRadius: '9999px',
                border: amount === amt ? '2px solid var(--primary)' : '2px solid var(--gray-300)',
                background: amount === amt ? 'var(--primary)' : 'var(--bg-card)',
                color: amount === amt ? 'white' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                minWidth: '70px'
              }}
            >
              ${amt}
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Or enter custom amount:
          </label>
          <input 
            type="number" 
            min="1" 
            step="1"
            value={amount}
            onChange={(e) => setAmount(Math.max(1, parseFloat(e.target.value) || 1))}
            style={{
              fontSize: '1.8rem',
              width: '180px',
              textAlign: 'center',
              padding: '12px',
              borderRadius: '12px',
              border: '2px solid var(--primary)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)'
            }}
          />
        </div>
      </div>

      <a
        href={paypalLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          background: '#00457C',
          color: 'white',
          padding: '18px 52px',
          fontSize: '1.5rem',
          fontWeight: '700',
          borderRadius: '9999px',
          textDecoration: 'none',
          boxShadow: '0 8px 25px rgba(0, 69, 124, 0.3)',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        🍺 Send Me ${amount} for a Beer
      </a>

      <p style={{ marginTop: '50px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
        Thank you so much for your support! It really helps keep this project going. 🙏
      </p>
    </div>
  );
}
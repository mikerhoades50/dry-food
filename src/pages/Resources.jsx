import { useEffect } from 'react';

const supplies = [
  {
    url: "https://www.amazon.com/dp/B0CKKK1HJ1",
    title: "50 Mylar Bags - 1 Pint (6x8 Inch) - 7 Mil Thick",
    description: "Airtight gusseted zip-lock bags perfect for long-term food storage and freeze dryer use. Durable and high quality.",
    image: "https://m.media-amazon.com/images/I/71pjVk7rb-L._SS284_.jpg",
    source: "Sophos Survival"
  },
  {
    url: "https://www.amazon.com/dp/B0D2PQ9M7D",
    title: "50 Mylar Bags - 1 Cup (5x7 Inch) - 7 Mil Thick",
    description: "Smaller airtight mylar bags ideal for portioning spices, snacks, and smaller batches of freeze-dried food.",
    image: "https://m.media-amazon.com/images/I/71ZWV-eIZzL._SS284_.jpg",
    source: "Sophos Survival"
  },
  {
    url: "https://www.amazon.com/dp/B0DWK52331",
    title: "2 Gallon Mylar Bags - 60 Pack with Oxygen Absorbers & Labels",
    description: "Extra-large 10 mil thick mylar bags including oxygen absorbers and labels. Great for bulk long-term storage.",
    image: "https://m.media-amazon.com/images/I/716O9OxKYBL._SS284_.jpg",
    source: "Cloudslucky"
  },
  {
    url: "https://www.amazon.com/dp/B0CX5GVVY7",
    title: "500cc Oxygen Absorbers for Food Storage - 100 Count",
    description: "Food-grade oxygen absorbers for use with mylar bags. Essential for long-term storage with Harvest Right freeze dryers.",
    image: "https://m.media-amazon.com/images/I/81wM8p-nPaL._SS284_.jpg",
    source: "Amazon"
  }
];

export default function Resources() {
  // Theme consistency
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div style={{
      maxWidth: '960px',
      margin: '40px auto',
      padding: '0 16px'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Resources</h1>
      <p style={{ 
        textAlign: 'center', 
        color: 'var(--text-secondary)', 
        fontSize: '1.1rem',
        marginBottom: '40px' 
      }}>
        Supplies, Equipment, and Helpful Content for Batch Processing
      </p>

      {/* Supplies Section */}
      <h2 style={{
        fontSize: '1.8rem',
        margin: '50px 0 25px',
        textAlign: 'center',
        color: 'var(--text-primary)'
      }}>Supplies</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: '24px'
      }}>
        {supplies.map((item, index) => (
          <a 
            key={index} 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              background: 'var(--bg-card)',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'row',
              minHeight: '170px',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
          >
            <img 
              src={item.image} 
              alt={item.title}
              style={{
                width: '160px',
                height: '100%',
                objectFit: 'cover',
                flexShrink: 0
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
              }}
            />
            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.18rem', lineHeight: '1.35' }}>
                {item.title}
              </h3>
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '0.93rem', 
                lineHeight: '1.45', 
                margin: '0 0 14px 0',
                flexGrow: 1 
              }}>
                {item.description}
              </p>
              <div style={{ 
                fontSize: '0.86rem', 
                color: 'var(--primary)', 
                marginTop: 'auto',
                fontWeight: '500'
              }}>
                {item.source} • Amazon
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Placeholders */}
      <h2 style={{ fontSize: '1.8rem', margin: '50px 0 25px', textAlign: 'center' }}>Equipment</h2>
      <div style={{ textAlign: 'center', color: '#888', padding: '60px 20px' }}>
        Equipment recommendations coming soon...
      </div>

      <h2 style={{ fontSize: '1.8rem', margin: '50px 0 25px', textAlign: 'center' }}>Videos & Recipes</h2>
      <div style={{ textAlign: 'center', color: '#888', padding: '60px 20px' }}>
        Helpful videos and recipes coming soon...
      </div>
    </div>
  );
}
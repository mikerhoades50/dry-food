export default function Home() {
  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '120px' }}>
      <h1>Batch Processing System</h1>
      <p style={{ margin: '40px 0', fontSize: '1.25rem' }}>Choose your tool:</p>
      
      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="/Calc.html" 
           style={{ 
             display: 'block', 
             padding: '28px 48px', 
             background: 'var(--primary)', 
             color: 'white', 
             textDecoration: 'none', 
             borderRadius: '12px', 
             fontSize: '1.35rem', 
             fontWeight: '600', 
             minWidth: '280px' 
           }}>
          Batch Weight Calculator
        </a>
        <a href="/inv.html" 
           style={{ 
             display: 'block', 
             padding: '28px 48px', 
             background: 'var(--primary)', 
             color: 'white', 
             textDecoration: 'none', 
             borderRadius: '12px', 
             fontSize: '1.35rem', 
             fontWeight: '600', 
             minWidth: '280px' 
           }}>
          Inventory Viewer
        </a>
      </div>
    </div>
  );
}
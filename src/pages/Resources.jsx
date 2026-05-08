import { useEffect } from 'react';

const supplies = [
  {
    url: "https://www.amazon.com/dp/B0CKKK1HJ1",
    title: "50 Mylar Bags - 1 Pint (6x8 Inch) - 7 Mil Thick",
    description: "Airtight gusseted zip-lock bags perfect for long-term food storage and freeze dryer use. Durable and high quality.",
    image: "https://m.media-amazon.com/images/I/71pjVk7rb-L._SS284_.jpg",
    source: "Amazon"
  },
  {
    url: "https://www.amazon.com/dp/B0D2PQ9M7D",
    title: "50 Mylar Bags - 1 Cup (5x7 Inch) - 7 Mil Thick",
    description: "Smaller airtight mylar bags ideal for portioning spices, snacks, and smaller batches of freeze-dried food.",
    image: "https://m.media-amazon.com/images/I/71ZWV-eIZzL._SS284_.jpg",
    source: "Amazon"
  },
  {
    url: "https://www.amazon.com/dp/B0DWK52331",
    title: "2 Gallon Mylar Bags - 60 Pack with Oxygen Absorbers & Labels",
    description: "Extra-large 10 mil thick mylar bags including oxygen absorbers and labels. Great for bulk long-term storage.",
    image: "https://m.media-amazon.com/images/I/716O9OxKYBL._SS284_.jpg",
    source: "Amazon"
  },
  {
    url: "https://www.amazon.com/dp/B0CX5GVVY7",
    title: "500cc Oxygen Absorbers for Food Storage - 100 Count",
    description: "Food-grade oxygen absorbers for use with mylar bags. Essential for long-term storage with Harvest Right freeze dryers.",
    image: "https://m.media-amazon.com/images/I/81wM8p-nPaL._SS284_.jpg",
    source: "Amazon"
  },
  {
    url: "https://sophossurvival.com/collections/food-you-will-eat-freeze-drying/products/mylar-bags-7-mil-stand-up-zip-top-pack-of-50",
    title: "Mylar Bags | 7-Mil, Stand Up, Zip-Top (pack of 50)",
    description: "This link takes directly to the manufacturer website. use this one in case Amazon is out of stock, or to compare prices. All sizes are available here",
    image: "https://sophossurvival.com/cdn/shop/files/5X7_1_CUP_MYLAR_BAGS_-_MAIN_SHADOW_BOX_IMAGE_1.png",
    source: "Sophos Survival"
  }
];
const videos = [
  {
    url: "https://www.youtube.com/watch?v=RKc4xgjK-84",
    title: "Freeze Drying 360 Eggs🍳 & How to make the Perfect Freeze Dried Egg! ",
    description: "Great video showing the freeze drying process for eggs, including tips on how to achieve the best texture and flavor. A must-watch for anyone interested in freeze drying breakfast foods.",
    image: "https://i.ytimg.com/an_webp/RKc4xgjK-84/mqdefault_6s.webp?du=3000&sqp=CMKy9M8G&rs=AOn4CLBqT2ky5W2nUgO__SITDLa7x5xqAA",
    source: "Youtube"
  },
  {
    url: "https://www.youtube.com/watch?v=gA0qbFnxMn8&t=3s",
    title: "Freeze Dried Candy in ONLY 2 Hours!",
    description: "Freeze drying candy is easy!",
    image: "https://i.ytimg.com/an_webp/gA0qbFnxMn8/mqdefault_6s.webp?du=3000&sqp=COrZ9M8G&rs=AOn4CLDWt9aS7aY4JC_NIjCQwkzjsWjfeA",
    source: "Youtube"
  }
];const equipment = [
  {
    url: "https://harvestright.com/products/home-pro-freeze-dryer-bundle",
    title: "Home Freeze Dryer Bundle - Harvest Right",
    description: "Source for the Harvest Right Home Freeze Dryer, the most popular freeze drying machine for home use. This bundle includes the freeze dryer, accessories, and a starter kit.",
    image: "https://harvestright.com/cdn/shop/files/home-freeze-dryer-small-black-loaded.jpg",
    source: "Harvest Right"
  },
  {
    url: "https://harvestright.com/collections/accessories/products/wifi-upgrade-kit",
    title: "Wi-Fi Upgrade Kit",
    description: "Wi-Fi Upgrade Kit for Harvest Right Freeze Dryers. Allows you to monitor and control your freeze dryer remotely via the Harvest Right app. A great addition for batch processing and convenience.",
    image: "https://harvestright.com/cdn/shop/files/Wi-FiDongle.jpg",
    source: "Harvest Right"
  },
  {
    url: "https://harvestright.com/collections/accessories/products/large-trays",
    title: "Extra Trays for Harvest Right Freeze Dryer",
    description: "These allow you to prefreeze your next batch while the current one is still running. A must-have for efficient batch processing and maximizing your freeze dryer's capacity.",
    image: "https://harvestright.com/cdn/shop/files/trays-medium-1.jpg?v=1767382891&width=162",
    source: "Harvest Right"
  },
  {
    url: "https://harvestright.com/collections/accessories/products/large-lids",
    title: "Tray Lids for Harvest Right Freeze Dryer",
    description: "Tray lids alloy you to stack trays on top of each other, saving space in the freezer and allowing you to prefreeze more batches at once. Essential for efficient batch processing.",
    image: "https://harvestright.com/cdn/shop/files/tray-lids-large-1.jpg?v=1767383214&width=162",
    source: "Harvest Right"
  },
  {
    url: "https://www.vevor.com/analytical-balance-c_11079/vevor-lab-analytical-balance-digital-precision-scale-5000gx0-01g-high-precision-p_010730728544",
    title: "VEVOR Analytical Balance, 5000g x 0.01g Accuracy Lab Scale",
    description: "Great High accuracy scale for weighing your food before and after freeze drying.",
    image: "https://img.vevorstatic.com/us%2FFX5000GX0.01GJ42OV1%2Fgoods_thumb-v5%2Fanalytical-balance-m100-1.2.jpg",
    source: "Vervor"
  },
  {
    url: "https://www.uline.com/Product/Detail/S-20351/Scale-Accessories/Scale-Scoop?pricode=WB2308&gadtype=pla&id=S-20351&ad_group_id=152179479302&gad_source=1&gad_campaignid=11612151726&gbraid=0AAAAAD_uetMP9tqayxQHzzWrmG5q9yLV4&gclid=Cj0KCQjw8PDPBhCeARIsAOJwmWWP27XjMb6h5Vd_5AoCzNvga_IzAq5-My-vGS0LYGIRKWSGIzGdvTMaAj7pEALw_wcB",
    title: "Scale Scoop",
    description: "Works great for weighing your foodbefore you bag your food",
    image: "https://img.uline.com/is/image/uline/S-20351?$Small$",
    source: "Uline"
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
                {item.source}
              </div>
            </div>
          </a>
        ))}
      </div>

      <h2 style={{
        fontSize: '1.8rem',
        margin: '50px 0 25px',
        textAlign: 'center',
        color: 'var(--text-primary)'
      }}>Videos</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: '24px'
      }}>
        {videos.map((item, index) => (
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
                {item.source}
              </div>
            </div>
          </a>
        ))}
      </div>
      <h2 style={{
        fontSize: '1.8rem',
        margin: '50px 0 25px',
        textAlign: 'center',
        color: 'var(--text-primary)'
      }}>Equipment</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: '24px'
      }}>
        {equipment.map((item, index) => (
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
                {item.source}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
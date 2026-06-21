import { useEffect, useState } from 'react';
import { supabase } from '../auth';
import { useGroup } from '../contexts/GroupContext';

const supplies = [
  {
    url: "https://www.amazon.com/dp/B0CKKK1HJ1",
    title: "50 Mylar Bags - 1 Pint (6x8 Inch) - 7 Mil Thick",
    description: "Airtight gusseted zip-lock bags perfect for long-term food storage and freeze dryer use. Very durable and high quality.",
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
    description: "Extra-large 10 mil thick mylar bags including oxygen absorbers and labels. Excellent for bulk long-term storage.",
    image: "https://m.media-amazon.com/images/I/716O9OxKYBL._SS284_.jpg",
    source: "Cloudslucky"
  },
  {
    url: "https://www.amazon.com/dp/B0CX5GVVY7",
    title: "500cc Oxygen Absorbers - 100 Count",
    description: "Food-grade oxygen absorbers for use with mylar bags. Essential for long-term storage with Harvest Right freeze dryers.",
    image: "https://m.media-amazon.com/images/I/81wM8p-nPaL._SS284_.jpg",
    source: "Amazon"
  },
  {
    url: "https://sophossurvival.com/collections/food-you-will-eat-freeze-drying/products/mylar-bags-7-mil-stand-up-zip-top-pack-of-50",
    title: "Mylar Bags | 7-Mil, Stand Up, Zip-Top (Pack of 50)",
    description: "Direct from the manufacturer. Great alternative if Amazon is out of stock or to compare pricing.",
    image: "https://sophossurvival.com/cdn/shop/files/5X7_1_CUP_MYLAR_BAGS_-_MAIN_SHADOW_BOX_IMAGE_1.png",
    source: "Sophos Survival"
  }
];

const videos = [
  {
    url: "https://www.youtube.com/watch?v=RKc4xgjK-84",
    title: "Freeze Drying 360 Eggs & How to Make the Perfect Freeze Dried Egg",
    description: "Excellent tutorial showing the full process of freeze drying eggs with great tips.",
    image: "https://tse2.mm.bing.net/th/id/OIP.kA13Itmxev0ytEqrJf_f1gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    source: "YouTube"
  },
  {
    url: "https://www.youtube.com/watch?v=gA0qbFnxMn8",
    title: "Freeze Dried Candy in ONLY 2 Hours!",
    description: "Fun and easy demonstration of freeze drying various candies.",
    image: "https://tse2.mm.bing.net/th/id/OIP.kA13Itmxev0ytEqrJf_f1gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    source: "YouTube"
  }
];

const equipment = [
  {
    url: "https://harvestright.com/products/home-pro-freeze-dryer-bundle",
    title: "Harvest Right Home Pro Freeze Dryer Bundle",
    description: "The most popular home freeze dryer. Includes machine, accessories, and starter kit.",
    image: "https://harvestright.com/cdn/shop/files/home-freeze-dryer-small-black-loaded.jpg",
    source: "Harvest Right"
  },
  {
    url: "https://harvestright.com/collections/accessories/products/wifi-upgrade-kit",
    title: "Wi-Fi Upgrade Kit for Harvest Right",
    description: "Monitor and control your freeze dryer remotely via the Harvest Right app.",
    image: "https://harvestright.com/cdn/shop/files/Wi-FiDongle.jpg",
    source: "Harvest Right"
  },
  {
    url: "https://harvestright.com/collections/accessories/products/large-trays",
    title: "Extra Large Trays for Harvest Right",
    description: "Allows you to pre-freeze your next batch while one is running.",
    image: "https://harvestright.com/cdn/shop/files/trays-medium-1.jpg?v=1767382891&width=162",
    source: "Harvest Right"
  }
];

export default function Resources() {
  const { currentGroupId } = useGroup();
  const [customLinks, setCustomLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState('supplies');

  const [newLink, setNewLink] = useState({
    title: '',
    description: '',
    url: '',
    image: ''
  });

  const fetchCustomLinks = async () => {
    if (!currentGroupId) return;
    const { data, error } = await supabase
      .from('custom_links')
      .select('*')
      .eq('group_id', currentGroupId)
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setCustomLinks(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomLinks();
  }, [currentGroupId]);

  const customBySection = {
    supplies: customLinks.filter(l => l.section === 'supplies'),
    equipment: customLinks.filter(l => l.section === 'equipment'),
    videos: customLinks.filter(l => l.section === 'videos')
  };

  const openModal = (section) => {
    setSelectedSection(section);
    setNewLink({ title: '', description: '', url: '', image: '' });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentGroupId) return alert("Group not loaded yet.");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("You must be logged in.");

    let finalUrl = newLink.url.trim();
    if (!finalUrl) return alert("Please enter a URL");

    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    const { error } = await supabase
      .from('custom_links')
      .insert([{
        group_id: currentGroupId,
        user_id: user.id,
        section: selectedSection,
        title: newLink.title.trim(),
        description: newLink.description.trim(),
        url: finalUrl,
        image: newLink.image.trim() || null
      }]);

    if (error) {
      alert('Error saving link: ' + error.message);
    } else {
      alert('✅ Link added successfully!');
      closeModal();
      fetchCustomLinks();
    }
  };

  const deleteLink = async (id) => {
    if (!confirm('Delete this custom link?')) return;

    const { error } = await supabase
      .from('custom_links')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error deleting link: ' + error.message);
    } else {
      alert('✅ Link deleted');
      fetchCustomLinks();
    }
  };

  const renderCard = (item, isCustom = false) => (
    <a 
      key={item.url || item.id} 
      href={item.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="resource-card"
      style={{ position: 'relative' }}
    >
      <img 
        src={item.image} 
        alt={item.title} 
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=No+Image';
        }}
      />
      <div className="content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="source">
          {item.source} {isCustom && '• (Your Link)'}
        </div>
      </div>

      {isCustom && (
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteLink(item.id);
          }}
          className="delete-btn"
          title="Delete this link"
        >
          ✕
        </button>
      )}
    </a>
  );

  return (
    <div className="resources-container">
      <h1>Resources</h1>
      <p className="subtitle">Supplies, Equipment, and Helpful Content for Freeze Drying</p>

      {/* Supplies */}
      <div className="section-header">
        <h2 className="section-title">Supplies</h2>
        <button onClick={() => openModal('supplies')} className="add-btn">+ Add Link</button>
      </div>
      <div className="link-cards">
        {supplies.map(item => renderCard(item))}
        {customBySection.supplies.map(item => renderCard(item, true))}
      </div>

      {/* Equipment */}
      <div className="section-header">
        <h2 className="section-title">Equipment</h2>
        <button onClick={() => openModal('equipment')} className="add-btn">+ Add Link</button>
      </div>
      <div className="link-cards">
        {equipment.map(item => renderCard(item))}
        {customBySection.equipment.map(item => renderCard(item, true))}
      </div>

      {/* Videos */}
      <div className="section-header">
        <h2 className="section-title">Videos</h2>
        <button onClick={() => openModal('videos')} className="add-btn">+ Add Link</button>
      </div>
      <div className="link-cards">
        {videos.map(item => renderCard(item))}
        {customBySection.videos.map(item => renderCard(item, true))}
      </div>

      {/* Add Link Modal */}
      {showModal && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <h2>Add New {selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)} Link</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input 
                  type="text" 
                  required
                  value={newLink.title}
                  onChange={(e) => setNewLink({...newLink, title: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  rows="3"
                  value={newLink.description}
                  onChange={(e) => setNewLink({...newLink, description: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>URL * (e.g. www.grok.com)</label>
                <input 
                  type="text" 
                  required
                  placeholder="www.example.com"
                  value={newLink.url}
                  onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Image URL (optional)</label>
                <input 
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={newLink.image}
                  onChange={(e) => setNewLink({...newLink, image: e.target.value})}
                />
              </div>

              <div className="modal-buttons">
                <button type="button" onClick={closeModal} className="cancel-btn">Cancel</button>
                <button type="submit" className="save-btn-modal">Add Link</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
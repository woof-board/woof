import React, {useState} from 'react';
import './css/App.css';
import WalkerProfile from './pages/WalkerProfile';
import WalkerHeader from './components/Header/WalkerHeader';
import Footer from './components/Footer';
import Jobs from './pages/Jobs';
// npm install --save-dev @iconify/react @iconify-icons/ant-design
import homeOutlined from '@iconify-icons/ant-design/home-outlined';
// npm install --save-dev @iconify/react @iconify-icons/ic
import baselineWorkOutline from '@iconify-icons/ic/baseline-work-outline';

function App() {

  const [links] = useState([
    {
      name: 'Profile',
      href: '#home',
      icon: homeOutlined
    },
    {
      name: 'Jobs',
      href: '#jobs',
      icon: baselineWorkOutline
    }
  ])

  const [currentLink, setCurrentLink] = useState(links[0])

  return (
    <>
      <div>
        <Header 
        links={links}
        currentLink={currentLink}
        setCurrentLink={setCurrentLink}
        />
      </div>
      <div>
        {currentLink.name === links[0].name && (
          <WalkerProfile />
        )}
        {currentLink.name === links[1].name && (
          <Jobs />
        )}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;

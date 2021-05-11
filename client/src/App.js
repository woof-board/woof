import React, {useState} from 'react';
import './css/App.css';
import Home from './pages/Home';
import Footer from './components/Footer';
import WalkerLogin from './pages/WalkerLogin';
import OwnerLogin from './pages/OwnerLogin';
import Signup from './pages/Signup';
// npm install --save-dev @iconify/react @iconify-icons/ant-design
import homeOutlined from '@iconify-icons/ant-design/home-outlined';
// npm install --save-dev @iconify/react @iconify-icons/ic
import baselineWorkOutline from '@iconify-icons/ic/baseline-work-outline';
import loginOutlined from '@iconify-icons/ant-design/login-outlined';
import personAdd from '@iconify-icons/akar-icons/person-add';

function App() {

  const [links] = useState([
    {
      name: 'Home',
      href: '#home',
      icon: homeOutlined
    },
    {
      name: 'Walker Login',
      href: '#walkerlogin',
      icon: baselineWorkOutline
    },
    {
      name: 'Owner Login',
      href: '#ownerlogin',
      icon: loginOutlined
    },
    {
      name: 'Signup',
      href: '#signup',
      icon: personAdd
    }
  ])

  const [currentLink, setCurrentLink] = useState(links[0])

  return (
    <body className="page">
      <div>
        {/* <Header 
        links={links}
        currentLink={currentLink}
        setCurrentLink={setCurrentLink}
        /> */}
      </div>
      <div>
        {currentLink.name === links[0].name && (
          <Home 
          links={links}
          currentLink={currentLink}
          setCurrentLink={setCurrentLink}/>
        )}
        {currentLink.name === links[1].name && (
          <WalkerLogin />
        )}
        {currentLink.name === links[2].name && (
          <OwnerLogin />
        )}
        {currentLink.name === links[3].name && (
          <Signup />
        )}
      </div>
      <div>
        <Footer />
      </div>
    </body>
  );
}

export default App;

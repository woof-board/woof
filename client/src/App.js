import React, {useState} from 'react';
import './css/App.css';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Jobs from './pages/Jobs';
import Login from './pages/Jobs';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Walkers from './pages/Walkers';
// npm install --save-dev @iconify/react @iconify-icons/ant-design
import homeOutlined from '@iconify-icons/ant-design/home-outlined';
// npm install --save-dev @iconify/react @iconify-icons/ic
import baselineWorkOutline from '@iconify-icons/ic/baseline-work-outline';
import loginOutlined from '@iconify-icons/ant-design/login-outlined';
import personAdd from '@iconify-icons/akar-icons/person-add';
// npm install --save-dev @iconify/react @iconify-icons/icomoon-free
import profileIcon from '@iconify-icons/icomoon-free/profile';
// npm install --save-dev @iconify/react @iconify-icons/bx
import bxWalk from '@iconify-icons/bx/bx-walk';

function App() {

  const [links] = useState([
    {
      name: 'Home',
      href: '#home',
      icon: homeOutlined
    },
    {
      name: 'Jobs',
      href: '#jobs',
      icon: baselineWorkOutline
    },
    {
      name: 'Login',
      href: '#login',
      icon: loginOutlined
    },
    {
      name: 'Signup',
      href: '#signup',
      icon: personAdd
    },
    {
      name: 'Profile',
      href: '#profile',
      icon: profileIcon
    },
    {
      name: 'Walkers',
      href: '#walkers',
      icon: bxWalk
    }
  ])

  const [currentLink, setCurrentLink] = useState(links[0])

  return (
    <body className="page">
      <div>
        <Header 
        links={links}
        currentLink={currentLink}
        setCurrentLink={setCurrentLink}
        />
      </div>
      <div>
        {currentLink.name === links[0].name && (
          <Home />
        )}
        {currentLink.name === links[1].name && (
          <Jobs />
        )}
        {currentLink.name === links[2].name && (
          <Login />
        )}
        {currentLink.name === links[3].name && (
          <Signup />
        )}
        {currentLink.name === links[4].name && (
          <Profile />
        )}
        {currentLink.name === links[5].name && (
          <Walkers />
        )}
      </div>
      <div>
        <Footer />
      </div>
    </body>
  );
}

export default App;

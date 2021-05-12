import React, {useState} from 'react';
import './css/App.css';
import Home from './pages/Home';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Header from './components/Header/index';
import NoMatch from './pages/NoMatch';
import Walker from './pages/Walker';
import Owner from './pages/Owner';
// npm install --save-dev @iconify/react @iconify-icons/ant-design
import homeOutlined from '@iconify-icons/ant-design/home-outlined';
// npm install --save-dev @iconify/react @iconify-icons/ic
import loginOutlined from '@iconify-icons/ant-design/login-outlined';
import personAdd from '@iconify-icons/akar-icons/person-add';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {

  const [links] = useState([
    // {
    //   name: 'Home',
    //   href: '/',
    //   icon: homeOutlined
    // },
    {
      name: 'About Us',
      href: '/about',
      icon: loginOutlined
    },
    {
      name: 'Owner',
      href: '/owner',
      icon: loginOutlined
    },
    {
      name: 'Walker',
      href: '/walker',
      icon: personAdd
    }
  ])

  const [currentLink, setCurrentLink] = useState(links[0])

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="page">
          <div>
            <Header 
            links={links}
            currentLink={currentLink}
            setCurrentLink={setCurrentLink}
            />
          </div>
          <div>
            <Switch>
              <Route exact path="/" component={Owner} />
              <Route exact path="/about" component ={About} />
              {/* <Route exact path="/Owner" component={Owner} /> */}
              <Route exact path="/walker" component={Walker} />
              <Route component={NoMatch} />
            </Switch>

          </div>
          <div>
            <Footer />
          </div>
        </div>
      </Router>

        <div>
          <Footer />
        </div>
    </ApolloProvider>
  );
}

export default App;

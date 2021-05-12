import React, {useState} from 'react';
import './css/App.css';
import Home from './pages/Home';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Header from './components/Header/index';
import NoMatch from './pages/NoMatch';
// npm install --save-dev @iconify/react @iconify-icons/ant-design
import homeOutlined from '@iconify-icons/ant-design/home-outlined';
// npm install --save-dev @iconify/react @iconify-icons/ic
import loginOutlined from '@iconify-icons/ant-design/login-outlined';
import personAdd from '@iconify-icons/akar-icons/person-add';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

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
    {
      name: 'Home',
      href: '/',
      icon: homeOutlined
    },
    {
      name: 'About Us',
      href: '/about',
      icon: loginOutlined
    },
    {
      name: 'Log in',
      href: '/login',
      icon: loginOutlined
    },
    {
      name: 'Sign up',
      href: '/signup',
      icon: personAdd
    }
  ])

  const [currentLink, setCurrentLink] = useState(links[0])

  return (
    <ApolloProvider client={client}>
<<<<<<< HEAD
      <Router>
        <body className="page">
          <div>
            <Header 
            links={links}
            currentLink={currentLink}
            setCurrentLink={setCurrentLink}
            />
          </div>
          <div>
            <Switch>
              {currentLink.name === links[0].name && (
                <Home />
              )}
              {currentLink.name === links[1].name && (
                <About />
              )}
              {currentLink.name === links[2].name && (
                <Login />
              )}
              {currentLink.name === links[3].name && (
                <Signup />
              )}
              <Router component={NoMatch} />
            </Switch>
          </div>
          <div>
            <Footer />
          </div>
        </body>
      </Router>
=======
      <body className="page">
        <div>
          <Header 
          links={links}
          currentLink={currentLink}
          setCurrentLink={setCurrentLink}
          />
        </div>
          <Router>

          <div>
            <Switch>
              <Route exact path="/" component ={Home} />
              <Route exact path="/about" component ={About} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route component={NoMatch} />
            </Switch>

          </div>
      </Router>

        <div>
          <Footer />
        </div>
      </body>
>>>>>>> 983732b0847cf6c2a6034c55a118098497314957
    </ApolloProvider>
  );
}

export default App;

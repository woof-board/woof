import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './css/App.css';
import Footer from './components/Footer';
import About from './pages/About';
import Header from './components/Header';
import Walkers from './pages/Walkers'
import NoMatch from './pages/NoMatch';
import Walker from './pages/Walker';
import Owner from './pages/Owner';
import Auth from './utils/auth';
import WalkerSchedule from './pages/WalkerSchedule';

// import WalkerHeader from './components/Header/WalkerHeader.js';
// import OwnerHeader from './components/Header/OwnerHeader.js';
import OwnerProfile from './pages/OwnerProfile.js';
import WalkerProfile from './pages/WalkerProfile.js';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

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
        
    const [headerLinks] = useState([
        {
            name: 'Owner',
            href: '/owner',
        },
        {
            name: 'Walker',
            href: '/walker',
        }
    ])


        const [walkerLinks] = useState([
            {
                name: 'Walker Profile',
                href: '/walkerprofile'
            },
        ])


    const [ownerLinks] = useState([
        {
            name: 'Owner Profile',
            href: '/ownerprofile'
        }
    ])

    const footerLinks = [
        {
            name: 'About',
            href: '/about'
        }
    ]
    
    const result = Auth.getProfileType();
    console.log(result);

    const [currentHeaderLink, setHeaderCurrentLink] = useState(headerLinks[0])
    const [currentWalkerLink, setWalkerLink] = useState(walkerLinks[0]);
	const [currentOwnerLink, setOwnerLink] = useState(ownerLinks[0])

    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="page">
                        <div className="page">
                        <Header
                            headerLinks={headerLinks}
                            currentHeaderLink={currentHeaderLink}
                            setHeaderCurrentLink={setHeaderCurrentLink}
                            walkerLinks={walkerLinks}
                            setWalkerLink={setWalkerLink}
                            currentWalkerLink={currentWalkerLink}
                            ownerLinks={ownerLinks}
                            currentOwnerLink={currentOwnerLink}
                            setOwnerLink={setOwnerLink}
                            result={result}
                        />
                        
                        <Switch>
                            <PublicRoute exact path='/' component={Owner} />
                            <PublicRoute exact path="/owner" component={Owner} />         
                            <PublicRoute exact path="/walker" component={Walker} />
                            <PublicRoute exact path="/walkerschedule" component={WalkerSchedule} />

                            <Route exact path="/about" component={About} />
                            <PrivateRoute exact path="/ownerprofile" usertype="owner" component={OwnerProfile}/> 
                            <PrivateRoute exact path="/adminprofile" usertype="admin" component={OwnerProfile}/>
                            <PrivateRoute exact path="/walkerprofile" usertype="walker" component={WalkerProfile} />
                            {/* <PrivateRoute exact path="/walkerschedule" usertype="walker" component={WalkerSchedule} /> */}

                            <Route component={NoMatch} />
                        </Switch>
                            
                        </div>
                </div>
                <Footer 
            	footerLinks={footerLinks}
                />
            </Router>
        </ApolloProvider>
    );
}

export default App;

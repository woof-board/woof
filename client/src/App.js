import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './css/App.css';
import Footer from './components/Footer';
import About from './pages/About';
import Header from './components/Header/index';
import NoMatch from './pages/NoMatch';
import Walker from './pages/Walker';
import Owner from './pages/Owner';
import Auth from './utils/auth';
import WalkerHeader from './components/Header/WalkerHeader.js';
import OwnerHeader from './components/Header/OwnerHeader.js';
import OwnerProfile from './pages/OwnerProfile.js';
import WalkerProfile from './pages/WalkerProfile.js';

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
            }
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

    const [currentLink, setCurrentLink] = useState(links[0])
    const [currentWalkerLink, setWalkerLink] = useState(walkerLinks[0]);
	const [currentOwnerLink, setOwnerLink] = useState(ownerLinks[0])

    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="page">
                    {Auth.loggedIn() ? (
                        <>
                        {Auth.getProfile() ? (
                            <>
								<OwnerHeader 
									ownerLinks={ownerLinks}
									currentOwnerLink={currentOwnerLink}
									setOwnerLink={setOwnerLink}
								/>
								<Switch>
									<Route exact path="/about" component={About} />
									<Route exact path="/" component={OwnerProfile} />
									<Route exact path="/ownerprofile" component={OwnerProfile} />
									<Route component={NoMatch} />
								</Switch>
                            </>
                        ) : (
                            <>
                                <WalkerHeader 
                                    walkerLinks={walkerLinks}
                                    currentWalkerLink={currentWalkerLink}
                                    setWalkerLink={setWalkerLink}
                                />
								<Switch>
									<Route exact path="/about" component={About} />
									<Route exact path="/" component={WalkerProfile} />
									<Route exact path="/walkerprofile" component={WalkerProfile} />
									<Route component={NoMatch} />
								</Switch>
                            </>
                        )}
                        </>
                    ) : (
                        <>
                            <Header
                                links={links}
                                currentLink={currentLink}
                                setCurrentLink={setCurrentLink}
                            />
                            <Switch>
                                <Route exact path="/" component={Owner} />
                                <Route exact path="/about" component={About} />
                                <Route exact path="/owner" component={Owner} />
                                <Route exact path="/walker" component={Walker} />
                                <Route component={NoMatch} />
                            </Switch>
                        </>
                    )}

                </div>
            </Router>
            <Footer 
            	footerLinks={footerLinks}
            />
        </ApolloProvider>
    );
}

export default App;

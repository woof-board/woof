import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './css/App.css';
import Footer from './components/Footer';
import About from './pages/About';
import Header from './components/Header';
import NoMatch from './pages/NoMatch';
// import Auth from './utils/auth';
import PaymentScreen from './pages/PaymentScreen';
import Success from "./pages/Success";
import WalkerSchedule from './pages/WalkerSchedule';

import OwnerProfile from './pages/OwnerProfile.js';
import WalkerProfile from './pages/WalkerProfile.js';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { StoreProvider } from "./utils/GlobalState";
import HomeMock from './pages/HomeMock';


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
    
    //     const [walkerLinks] = useState([
    //         {
    //             name: 'Walker Profile',
    //             href: '/walkerprofile'
    //         },
    //     ])


    // const [ownerLinks] = useState([
    //     {
    //         name: 'Owner Profile',
    //         href: '/ownerprofile'
    //     }
    // ])

    const footerLinks = [
        {
            name: 'About',
            href: '/about'
        }
    ]
    
    // const result = Auth.getProfileType();
    // console.log(result);

    // const [currentWalkerLink, setWalkerLink] = useState(walkerLinks[0]);
	// const [currentOwnerLink, setOwnerLink] = useState(ownerLinks[0])

    return (
        <ApolloProvider client={client}>
            <Router>
                <StoreProvider>
                <div className="page">
                        <div className="page">
                        {/* {result === 'admin' && (
                            <Header 
                                result={result}
                            />
                        )}

                        {result === 'owner' && (
                            <Header
                                ownerLinks={ownerLinks}
                                currentOwnerLink={currentOwnerLink}
                                setOwnerLink={setOwnerLink}
                                result={result}
                            />
                        )}
                        {result === 'walker' && (
                            <Header
                                walkerLinks={walkerLinks}
                                setWalkerLink={setWalkerLink}
                                currentWalkerLink={currentWalkerLink}
                                result={result}
                            />
                        )} */}
                        <Header />
                        <Switch>
                            <PublicRoute exact path='/' component={HomeMock} />

                            <Route exact path="/about" component={About} />
                            <PrivateRoute exact path="/paymentScreen" component={PaymentScreen} />
                            <PrivateRoute exact path="/Success" component={Success} />
                            <PrivateRoute exact path="/ownerprofile" usertype="owner" component={OwnerProfile}/> 
                            <PrivateRoute exact path="/adminprofile" usertype="admin" component={OwnerProfile}/>
                            <PrivateRoute exact path="/walkerprofile" usertype="walker" component={WalkerProfile} />
                            <PrivateRoute exact path="/walkerschedule" usertype="walker" component={WalkerSchedule} />

                            <Route component={NoMatch} />
                        </Switch>
                            
                        </div>
                </div>
                <Footer 
            	    footerLinks={footerLinks}
                />
                </StoreProvider>
            </Router>
        </ApolloProvider>
    );
}

export default App;

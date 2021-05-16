import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './css/App.css';
import Footer from './components/Footer';
import About from './pages/About';
import Header from './components/Header';
import NoMatch from './pages/NoMatch';
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
    const footerLinks = [
        {
            name: 'About',
            href: '/about'
        }
    ]

    return (
        <ApolloProvider client={client}>
            <Router>
                <StoreProvider>
                <div className="page">
                        <div className="page">
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
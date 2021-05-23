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
import OwnerTrackOrder from './pages/OwnerTrackOrder';
import OwnerLiveMap from './pages/OwnerLiveMap';
import OwnerBookWalk from './pages/OwnerBookWalk';
import WalkerProfile from './pages/WalkerProfile.js';
import WalkerTrackWalks from './pages/WalkerTrackWalks.js';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { StoreProvider } from "./utils/GlobalState";
import Home from './pages/Home';
import Map from './components/OwnerTrackOrder/Map'
import TestMap from './components/OwnerTrackOrder/TestMap'
import OwnerWalkDetails from './components/OwnerWalkerForm/OwnerWalkDetails';
import AdminPage from './pages/Admin';

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
                        <Header />
                        <Switch>
                            <PublicRoute exact path='/' component={Home} />
                            <Route exact path="/about" component={About} />

                            <PrivateRoute exact path="/paymentScreen" usertype="owner" component={PaymentScreen} />
                            <PrivateRoute exact path="/Success" usertype="owner" component={Success} />
                            
                            <PrivateRoute exact path="/ownerprofile" usertype="owner" component={OwnerProfile}/> 
                            <PrivateRoute exact path="/ownertrackorder" usertype="owner" component={OwnerTrackOrder}/> 
                            <PrivateRoute exact path="/ownerlivemap" usertype="owner" component={OwnerLiveMap}/> 
                            <PrivateRoute exact path="/bookwalk" usertype="owner" component={OwnerWalkDetails}/> 
                             
                            <PrivateRoute exact path="/dashboard" usertype="admin" component={AdminPage}/>
                            {/* <PrivateRoute exact path="/map" usertype="owner" component={Map}/>
                            <Route exact path="/testmap" usertype="owner" component={TestMap}/>  */}
                            {/* <PrivateRoute exact path="/adminprofile" usertype="admin" component={OwnerProfile}/> */}
                            
                            
                            <PrivateRoute exact path="/walkerprofile" usertype="walker" component={WalkerProfile} />
                            <PrivateRoute exact path="/walkerschedule" usertype="walker" component={WalkerSchedule} />
                            <PrivateRoute exact path="/walkertrackwalks" usertype="walker" component={WalkerTrackWalks} />

                            <Route component={NoMatch} />
                        </Switch>
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
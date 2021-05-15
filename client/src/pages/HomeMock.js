import React from 'react';
import '../css/HomeMock.css';
import { ApolloProvider } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Walker from '../pages/Walker';
import Owner from '../pages/Owner';

const client = new ApolloProvider({
})

function HomeMock() {

    function walker() {
        window.location.assign('/walker');
    }

    function owner() {
        window.location.assign('/owner');
    }

    return (
        <ApolloProvider client={client}>
            <>
            <div className="home-new"></div>
            <div className="center-page-vh">
                <div className="home-title">
                    WOOF
                </div>
                <div className="home-font-small">
                    WHERE DOGS GET THEIR PERFECT WALK
                </div>
                <Router>
                    <div className="home-links">
                        <Link className="home-button" onClick={walker} to="/walker">WALKER</Link>
                        <Link className="home-button" onClick={owner}to="/owner">OWNER</Link>
                    </div>
                </Router>
            </div>
            </>
        </ApolloProvider>
    )
}

export default HomeMock;
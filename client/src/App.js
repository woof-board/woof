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
import loginOutlined from '@iconify-icons/ant-design/login-outlined';
import personAdd from '@iconify-icons/akar-icons/person-add';
import Auth from './utils/auth';

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
                icon: loginOutlined
            },
            {
                name: 'Walker',
                href: '/walker',
                icon: personAdd
            }
        ])

        const [footerLinks] = useState([
            {
                name: 'About',
                href: '/about'
            }
        ])

    const [currentLink, setCurrentLink] = useState(links[0])

    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="page">
                    <Header
                        links={links}
                        currentLink={currentLink}
                        setCurrentLink={setCurrentLink}
                    />
                    <Switch>
                        {Auth.loggedIn() ? (
                            <>
                                <Route exact path="/walker" component={Walker} />
                                <Route exact path="/owner" component={Owner} />
                                <Route component={NoMatch} />
                            </>
                        ) : (
                            <>
                                <Route exact path="/" component={Owner} />
                                <Route exact path="/about" component={About} />
                                <Route exact path="/owner" component={Owner} />
                                <Route exact path="/walker" component={Walker} />
                                <Route component={NoMatch} />
                            </>
                        )}
                    </Switch>
                </div>
            </Router>
            <Footer 
            footerLinks={footerLinks}
            />
        </ApolloProvider>
    );
}

export default App;

const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET||'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    authMiddleware: function ({ req }) {
        // allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {
            token = token
                .split(' ')
                .pop()
                .trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            
            // if the data object includes "admin" field, then return data as "owner", otherwise as "walker"  
            if (Object.keys(data).includes("admin")) {
                req.owner = data;
            } else {
                req.walker = data;
            }
            
        }
        catch {
            console.log('Invalid token');
        }

        return req;
    },
    signTokenOwner: function ({ firstName, lastName, email, _id, admin }) {
        const payload = { firstName, lastName, email, _id, admin };

        return jwt.sign(
            { data: payload },
            secret,
            { expiresIn: expiration }
        );
    },
    signTokenWalker: function ({ firstName, lastName, email, _id }) {
        const payload = { firstName, lastName, email, _id };

        return jwt.sign(
            { data: payload },
            secret,
            { expiresIn: expiration }
        );
    }
};
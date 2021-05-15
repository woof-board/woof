const db = require('./connection');
const { Owner, Walker, Order } = require('../models');

db.once('open', async () => {
    console.log('opened');

    await Owner.deleteMany();

    await Owner.insertMany([
        {
            firstName: 'Eric',
            lastName: 'Normann',
            email: 'eric.n@me.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            admin: true,
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'west toronto',
                province: 'ontario',
                postalCode: 'AAA AAA'
            },
            phone: '111 111 1111',
            dogs: [],
            status: "ACTIVE"
        },
        {
            firstName: 'Samiul',
            lastName: 'Choudhury',
            email: 'sc@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            admin: true,
            address: {
                street: '1st Street NW',
                city: 'calgary',
                neighbourhood: '',
                province: 'alberta',
                postalCode: 'AAA AAA'
            },
            phone: '111 111 1111',
            dogs: [],
            status: "ACTIVE"
        },
        {
            firstName: 'Nathan',
            lastName: 'Chow',
            email: 'nc@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            admin: true,
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'south toronto',
                province: 'ontario',
                postalCode: 'AAA AAA'
            },
            phone: '111 111 1111',
            dogs: [],
            status: "ACTIVE"
        },
        {
            firstName: 'Shamim',
            lastName: 'Imtiaz',
            email: 'si@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            admin: false,
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'east toronto',
                province: 'ontario',
                postalCode: 'AAA AAA'
            },
            phone: '111 111 1111',
            dogs: [
                {
                    name: 'Mylo',
                    breed: 'Husky',
                    weight: 70,
                    treats: true,
                    avatar: "/images/user-default.png"
                },
                {
                    name: 'Monty',
                    breed: 'AusiSheppard',
                    weight: 90,
                    treats: true,
                    avatar: "/images/user-default.png"
                }
            ],
            status: "ACTIVE"
        },
        {
            firstName: 'Mike',
            lastName: 'Smith',
            email: 'ms@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            admin: false,
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'east toronto',
                province: 'ontario',
                postalCode: 'AAA AAA'
            },
            phone: '111 111 1111',
            dogs: [
                {
                    name: 'Rex',
                    breed: 'Doberman',
                    weight: 70,
                    treats: false,
                    avatar: "/images/user-default.png"
                }
            ],
            status: "PENDING_INFORMATION"
        },
        {
            firstName: 'Jim',
            lastName: 'Anderson',
            email: 'ja@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            admin: false,
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'east toronto',
                province: 'ontario',
                postalCode: 'AAA AAA'
            },
            phone: '111 111 1111',
            dogs: [
                {
                    name: 'Bruen',
                    breed: 'Poodle',
                    weight: 70,
                    treats: true,
                    avatar: "/images/user-default.png"
                }
            ],
            status: "SUSPENDED"
        }
    ]);

    console.log('owners seeded');

    const owners = await Owner.find({});
    const ownerIds = owners.map(owner => owner._id);

    await Walker.deleteMany();

    await Walker.insertMany([
        {
            firstName: 'Pamela',
            lastName: 'Washington',
            email: 'pw@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            neighbourhoods: ['east toronto', 'south toronto'],
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'east toronto',
                province: 'ontario',
                postalCode: 'AAA AAA'
            },
            reviews: [],
            earnings: 0.0,
            availability: [
                {
                    date: '2021-05-20',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: false,
                    slot7pm: false,
                    slot9pm: false
                },
                {
                    date: '2021-05-21',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-22',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: false,
                    slot7pm: false,
                    slot9pm: false
                }
            ],
            status: "PENDING_INFORMATION"
        },
        {
            firstName: 'Elijah',
            lastName: 'Holt',
            email: 'eh@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            neighbourhoods: ['north toronto', 'west toronto'],
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'east toronto',
                province: 'ontario',
                postalCode: 'AAA AAA'
            },
            reviews: [],
            earnings: 0.0,
            availability: [
                {
                    date: '2021-05-20',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: false,
                    slot7pm: false,
                    slot9pm: false
                },
                {
                    date: '2021-05-21',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: false,
                    slot7pm: false,
                    slot9pm: false
                },
                {
                    date: '2021-05-22',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: false,
                    slot7pm: false,
                    slot9pm: false
                }
            ],
            status: "PENDING_APPROVAL"
        },
        {
            firstName: 'Karen',
            lastName: 'Nuvoski',
            email: 'kn@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            neighbourhoods: ['north toronto', 'west toronto'],
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'east toronto',
                province: 'ontario',
                postalCode: 'AAA AAA'
            },
            reviews: [
                {
                    owner_id: ownerIds[0],
                    rating: 4,
                    reviewText: "keep up good work"
                },
                {
                    owner_id: ownerIds[4],
                    rating: 1,
                    reviewText: "bad!!!"
                },
                {
                    owner_id: ownerIds[1],
                    rating: 3,
                    reviewText: "not so bad"
                }
            ],
            earnings: 1000.0,
            availability: [
                {
                    date: '2021-05-20',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: false,
                    slot7pm: false,
                    slot9pm: false
                },
                {
                    date: '2021-05-21',
                    slot9am: false,
                    slot11am: false,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-22',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: false,
                    slot7pm: false,
                    slot9pm: false
                }
            ],
            status: "ACTIVE"
        },
        {
            firstName: 'Ryan',
            lastName: 'Turnbull',
            email: 'rt@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            neighbourhoods: ['north toronto', 'west toronto'],
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'east toronto',
                province: 'ontario',
                postalCode: 'AAA AAA'
            },
            reviews: [
                {
                    owner_id: ownerIds[4],
                    rating: 1,
                    reviewText: "pretty bad service!"
                },
                {
                    owner_id: ownerIds[1],
                    rating: 2,
                    reviewText: "not recommended"
                },
                {
                    owner_id: ownerIds[2],
                    rating: 3,
                    reviewText: "not so bad"
                }
            ],
            earnings: 800.0,
            availability: [
                {
                    date: '2021-05-20',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-21',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: false,
                    slot9pm: false
                },
                {
                    date: '2021-05-22',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: false
                }
            ],
            status: "ACTIVE"
        },
        {
            firstName: 'Mark',
            lastName: 'Spencer',
            email: 'ms@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            neighbourhoods: ['north toronto', 'west toronto'],
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'east toronto',
                province: 'ontario',
                postalCode: 'AAA AAA'
            },
            reviews: [
                {
                    owner_id: ownerIds[5],
                    rating: 4,
                    reviewText: "keep up good work"
                },
                {
                    owner_id: ownerIds[4],
                    rating: 2,
                    reviewText: "not recommended"
                },
                {
                    owner_id: ownerIds[1],
                    rating: 3,
                    reviewText: "not so bad"
                }
            ],
            earnings: 1000.0,
            availability: [
                {
                    date: '2021-05-20',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: false,
                    slot7pm: false,
                    slot9pm: false
                },
                {
                    date: '2021-05-21',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: false,
                    slot7pm: false,
                    slot9pm: false
                },
                {
                    date: '2021-05-22',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: false,
                    slot7pm: false,
                    slot9pm: false
                }
            ],
            status: "SUSPENDED"
        }
    ]);

    console.log('walker seeded');




    
    process.exit();

});
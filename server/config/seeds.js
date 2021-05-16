const db = require('./connection');
const { Owner, Walker, Order } = require('../models');

db.once('open', async () => {
    console.log('opened');

    await Owner.deleteMany();

    await Owner.create(
        {
            first_name: 'Eric',
            last_name: 'Normann',
            email: 'eric.n@me.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            admin: true,
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'west toronto',
                province: 'ontario',
                postal_code: 'AAA AAA'
            },
            phone: '111 111 1111',
            dogs: [],
            status: "ACTIVE"
        }
    );

    await Owner.create(
        {
            first_name: 'Samiul',
            last_name: 'Choudhury',
            email: 'sc@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            admin: true,
            address: {
                street: '1st Street NW',
                city: 'calgary',
                neighbourhood: '',
                province: 'alberta',
                postal_code: 'AAA AAA'
            },
            phone: '111 111 1111',
            dogs: [],
            status: "ACTIVE"
        }
    );

    await Owner.create(
        {
            first_name: 'Nathan',
            last_name: 'Chow',
            email: 'nc@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            admin: true,
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'south toronto',
                province: 'ontario',
                postal_code: 'AAA AAA'
            },
            phone: '111 111 1111',
            dogs: [],
            status: "ACTIVE"
        }
    );

    await Owner.create(
        {
            first_name: 'Shamim',
            last_name: 'Imtiaz',
            email: 'si@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            admin: false,
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'east toronto',
                province: 'ontario',
                postal_code: 'AAA AAA'
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
        }
    );

    await Owner.create(
        {
            first_name: 'Mike',
            last_name: 'Smith',
            email: 'ms@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            admin: false,
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'east toronto',
                province: 'ontario',
                postal_code: 'AAA AAA'
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
        }
    );

    await Owner.create(
        {
            first_name: 'Jim',
            last_name: 'Anderson',
            email: 'ja@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            admin: false,
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'east toronto',
                province: 'ontario',
                postal_code: 'AAA AAA'
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
    );

    console.log('owners seeded');

    const owners = await Owner.find({});
    const ownerIds = owners.map(owner => owner._id);

    await Walker.deleteMany();

    await Walker.create(
        {
            first_name: 'Pamela',
            last_name: 'Washington',
            email: 'pw@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            neighbourhoods: ['east toronto', 'south toronto'],
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'east toronto',
                province: 'ontario',
                postal_code: 'AAA AAA'
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
        }
    );

    await Walker.create(
        {
            first_name: 'Elijah',
            last_name: 'Holt',
            email: 'eh@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            neighbourhoods: ['north toronto', 'west toronto'],
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'east toronto',
                province: 'ontario',
                postal_code: 'AAA AAA'
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
        }
    );

    await Walker.create(
        {
            first_name: 'Karen',
            last_name: 'Nuvoski',
            email: 'kn@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            neighbourhoods: ['north toronto', 'west toronto'],
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'east toronto',
                province: 'ontario',
                postal_code: 'AAA AAA'
            },
            reviews: [
                {
                    owner_id: ownerIds[0],
                    rating: 4,
                    review_text: "keep up good work"
                },
                {
                    owner_id: ownerIds[4],
                    rating: 1,
                    review_text: "bad!!!"
                },
                {
                    owner_id: ownerIds[1],
                    rating: 3,
                    review_text: "not so bad"
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
        }
    );

    await Walker.create(
        {
            first_name: 'Ryan',
            last_name: 'Turnbull',
            email: 'rt@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            neighbourhoods: ['north toronto', 'west toronto'],
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'east toronto',
                province: 'ontario',
                postal_code: 'AAA AAA'
            },
            reviews: [
                {
                    owner_id: ownerIds[4],
                    rating: 1,
                    review_text: "pretty bad service!"
                },
                {
                    owner_id: ownerIds[1],
                    rating: 2,
                    review_text: "not recommended"
                },
                {
                    owner_id: ownerIds[2],
                    rating: 3,
                    review_text: "not so bad"
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
        }
    );

    await Walker.create(
        {
            first_name: 'Mark',
            last_name: 'Spencer',
            email: 'ms@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            neighbourhoods: ['north toronto', 'west toronto'],
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'east toronto',
                province: 'ontario',
                postal_code: 'AAA AAA'
            },
            reviews: [
                {
                    owner_id: ownerIds[5],
                    rating: 4,
                    review_text: "keep up good work"
                },
                {
                    owner_id: ownerIds[4],
                    rating: 2,
                    review_text: "not recommended"
                },
                {
                    owner_id: ownerIds[1],
                    rating: 3,
                    review_text: "not so bad"
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
    );

    console.log('walker seeded');


    await Order.deleteMany();

    await Order.insertMany([
      
      {
        service_date:'2021-05-21',
        service_time: '9am',
        status: 'PENDING_WALKER',
        owner: '60a073419ae33509302ac06c',
        walker: '60a073419ae33509302ac085',
        dogs: ['60a073419ae33509302ac06e']
      },
      {
        service_date:'2021-05-20',
        service_time: '9am',
        status: 'PENDING_WALKER',
        owner: '60a073419ae33509302ac06f',
        walker: '60a073419ae33509302ac08a',
        dogs: ['60a073419ae33509302ac071']
      },
      {
        service_date:'2021-05-20',
        service_time: '11am',
        status: 'PENDING_WALKER',
        owner: '60a073419ae33509302ac072',
        walker: '60a073419ae33509302ac08a',
        dogs: ['60a073419ae33509302ac074']
      },
      {
        service_date:'2021-05-20',
        service_time: '1pm',
        status: 'PENDING_PROGRESS',
        owner: '60a073419ae33509302ac075',
        walker: '60a073419ae33509302ac08f',
        dogs: [
          '60a073419ae33509302ac077',
          '60a073419ae33509302ac078'
        ]
      },
      {
        service_date:'2021-05-21',
        service_time: '11am',
        status: 'PENDING_WALKER',
        owner: '60a073419ae33509302ac079',
        walker: '60a073419ae33509302ac097',
        dogs: ['60a073419ae33509302ac07b']
      },
      {
        service_date:'2021-05-21',
        service_time: '3pm',
        status: 'PENDING_WALKER',
        owner: '60a073419ae33509302ac07c',
        walker: '60a073419ae33509302ac09f',
        dogs: ['60a073419ae33509302ac07e']
      },
      {
        service_date:'2021-05-20',
        service_time: '5pm',
        status: 'PENDING_WALKER',
        owner: '60a073419ae33509302ac07c',
        walker: '60a073419ae33509302ac09f',
        dogs: ['60a073419ae33509302ac07e']
      },
      {
        service_date:'2021-05-21',
        service_time: '7pm',
        status: 'PENDING_PROGRESS',
        owner: '60a073419ae33509302ac075',
        walker: '60a073419ae33509302ac08f',
        dogs: [
          '60a073419ae33509302ac077',
          '60a073419ae33509302ac078'
        ]
      },
      
    ]);

    console.log('order seeded');

    
    process.exit();

});
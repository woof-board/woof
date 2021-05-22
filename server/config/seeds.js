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
            avatar: "/images/eric.jpg",
            admin: false,
            address: {
                street: '2325 Yolanda Dr',
                city: 'oakville',
                neighbourhood: 'oakville',
                province: 'ontario',
                postal_code: 'L6l 2H9'
            },
            phone: '111 111 1111',
            dogs: [
                {
                    name: 'Pixel',
                    breed: 'Shorky',
                    weight: 12,
                    treats: true,
                    avatar: "https://scontent-yyz1-1.xx.fbcdn.net/v/t31.18172-8/11222714_10153601420096151_2425722709037660111_o.jpg?_nc_cat=100&ccb=1-3&_nc_sid=730e14&_nc_ohc=46e6WoeQaLEAX-axWzR&_nc_ht=scontent-yyz1-1.xx&oh=b06232133fc570217fb90dc75dfbcef0&oe=60CC4892"
                },
                {
                    name: 'Pudding',
                    breed: 'Shi-zu mix',
                    weight: 15,
                    treats: true,
                    avatar: "https://scontent-yyz1-1.xx.fbcdn.net/v/t1.6435-9/39257859_10158104653536151_4978567789913571328_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=730e14&_nc_ohc=CKtX-w_SiOUAX-6SYVi&_nc_ht=scontent-yyz1-1.xx&oh=0885e71ab8514745b2f93ea3b0c2e5d0&oe=60C96238"
                }
            ],
            status: "ACTIVE"
        }
    );

    await Owner.create(
        {
            first_name: 'Samiul',
            last_name: 'Choudhury',
            email: 'sc@gmail.com',
            password: 'passs',
            avatar: "/images/eric.jpg",
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
                    avatar: "/images/mylo.jpg"
                },
                {
                    name: 'Monty',
                    breed: 'AusiSheppard',
                    weight: 90,
                    treats: true,
                    avatar: "/images/monty.jpg"
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
                    avatar: "https://scontent-yyz1-1.xx.fbcdn.net/v/t1.6435-9/87142813_3275290815826955_9075443982971961344_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=n7nY1OkFTDgAX9aUiMu&_nc_oc=AQlwkKBkBHKDIbwHP0jv7Vt_1n0jdL65W0-fxR0fkeKYDhhmJXMg7fqjU7bYIyzIY3E&_nc_ht=scontent-yyz1-1.xx&oh=fd13fa42abfb06c1f6469558ce3ba71c&oe=60CA1595"
                }
            ],
            status: "ACTIVE"
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
    const dogIds = owners.map(owner => {
        return owner.dogs.map(dog => dog._id);
    });
    
    await Walker.deleteMany();

    await Walker.create(
        {
            first_name: 'Pamela',
            last_name: 'Washington',
            email: 'pw@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            neighbourhoods: ['East York', 'North York'],
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
            status: "ACTIVE"
        }
    );

    await Walker.create(
        {
            first_name: 'Elijah',
            last_name: 'Holt',
            email: 'eh@gmail.com',
            password: 'passs',
            avatar: "/images/user-default.png",
            neighbourhoods: ['North York', 'Scarborough'],
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
            status: "ACTIVE"
        }
    );

    await Walker.create(
        {
            first_name: 'Karen',
            last_name: 'Nuvoski',
            email: 'kn@gmail.com',
            password: 'passs',
            avatar: "https://i2.wp.com/www.hadviser.com/wp-content/uploads/2019/04/5-choppy-cut-for-a-square-face-CF4Tf1tMDJu.jpg?resize=1078%2C1078&ssl=1",
            neighbourhoods: ['Downtown', 'Etobicoke'],
            address: {
                street: '1st Street NW',
                city: 'toronto',
                neighbourhood: 'east toronto',
                province: 'ontario',
                postal_code: 'AAA AAA'
            },
            reviews: [
                {
                    owner_id: ownerIds[2],
                    rating: 5,
                    review_text: "My dogs love her!"
                },
                {
                    owner_id: ownerIds[3],
                    rating: 5,
                    review_text: "Thanks for taking care of my babies."
                },
                {
                    owner_id: ownerIds[0],
                    rating: 4,
                    review_text: "keep up good work"
                },
                {
                    owner_id: ownerIds[4],
                    rating: 2,
                    review_text: "bad!!!"
                },
                {
                    owner_id: ownerIds[1],
                    rating: 3,
                    review_text: "not so bad"
                }
            ],
            earnings: 672.0,
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
            neighbourhoods: ['North York', 'East York'],
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
                    rating: 5,
                    review_text: "Great job!"
                },
                {
                    owner_id: ownerIds[1],
                    rating: 4,
                    review_text: ""
                },
                {
                    owner_id: ownerIds[2],
                    rating: 5,
                    review_text: "Thanks! My dog loves you!"
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
            neighbourhoods: ['Dwontown', 'York'],
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
            status: "PENDING_INFORMATION"
        }
    );

    console.log('walker seeded');
    const walkers = await Walker.find({});
    const walkerIds = walkers.map(walker => walker._id);

    await Order.deleteMany();

    await Order.insertMany([
      
      {
        service_date:'2021-05-21',
        service_time: '9am',
        status: 'PENDING_PROGRESS',
        owner: ownerIds[0],
        walker: walkerIds[2],
        dogs: [dogIds[0][0], dogIds[0][1]]
      },
      {
        service_date:'2021-05-20',
        service_time: '9am',
        status: 'PENDING_PROGRESS',
        owner: ownerIds[3],
        walker: walkerIds[2],
        dogs: [dogIds[3][0]]
      },
      {
        service_date:'2021-05-20',
        service_time: '11am',
        status: 'PENDING_PROGRESS',
        owner: ownerIds[4],
        walker: walkerIds[2],
        dogs: [dogIds[4][0]]
      },
      {
        service_date:'2021-05-20',
        service_time: '1pm',
        status: 'PENDING_PROGRESS',
        owner: ownerIds[5],
        walker: walkerIds[2],
        dogs: [dogIds[5][0]]
      },
      {
        service_date:'2021-05-21',
        service_time: '11am',
        status: 'PENDING_PROGRESS',
        owner: ownerIds[0],
        walker: walkerIds[2],
        dogs: [dogIds[0][0]]
      },
      {
        service_date:'2021-05-21',
        service_time: '3pm',
        status: 'PENDING_PROGRESS',
        owner: ownerIds[0],
        walker: walkerIds[2],
        dogs: [dogIds[0][0], dogIds[0][1]]
      },
      {
        service_date:'2021-05-20',
        service_time: '5pm',
        status: 'PENDING_PROGRESS',
        owner: ownerIds[3],
        walker: walkerIds[2],
        dogs: [dogIds[3][0]]
      },
      {
        service_date:'2021-05-21',
        service_time: '7pm',
        status: 'FULLFILLED',
        owner: ownerIds[3],
        walker: walkerIds[2],
        dogs: [dogIds[3][0]]
      },
      {
        service_date:'2021-05-21',
        service_time: '7pm',
        status: 'DENIED',
        owner: ownerIds[3],
        walker: walkerIds[2],
        dogs: [dogIds[3][1]]
      },
      
    ]);

    console.log('order seeded');

    
    process.exit();

});
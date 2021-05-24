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
            avatar: "Avatar/fph5dcgapirzaajhdopi",
            admin: false,
            address: {
                street: '2325 Yolanda Dr',
                city: 'Oakville',
                neighbourhood: 'Oakville',
                province: 'Ontario',
                postal_code: 'L6l 2H9'
            },
            phone: '111 111 1111',
            dogs: [
                {
                    name: 'Pixel',
                    breed: 'Shorky',
                    weight: 12,
                    treats: true,
                    avatar: "Avatar/cdlcsvirw6is8dqvsow7"
                },
                {
                    name: 'Pudding',
                    breed: 'Shi-zu mix',
                    weight: 15,
                    treats: true,
                    avatar: "Avatar/xnlpc8qmyss6vabwbfwv"
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
            avatar: "Avatar/c5eaous5xg8yvybfpduh",
            admin: true,
            address: {
                street: '1st Street NW',
                city: 'Brampton',
                neighbourhood: 'Brampton',
                province: 'Ontario',
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
                city: 'Toronto',
                neighbourhood: 'Downtown',
                province: 'Ontario',
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
            avatar: "Avatar/jpho9qelncqgse4qdi94",
            admin: false,
            address: {
                street: '1st Street NW',
                city: 'Toronto',
                neighbourhood: 'East York',
                province: 'Ontario',
                postal_code: 'AAA AAA'
            },
            phone: '111 111 1111',
            dogs: [
                {
                    name: 'Mylo',
                    breed: 'Husky',
                    weight: 70,
                    treats: true,
                    avatar: "Avatar/sxx1eh60qbxrtzqfowat"
                },
                {
                    name: 'Monty',
                    breed: 'AusiSheppard',
                    weight: 90,
                    treats: true,
                    avatar: "Avatar/sxx1eh60qbxrtzqfowat"
                }
            ],
            status: "ACTIVE"
        }
    );

    await Owner.create(
        {
            first_name: 'Benn',
            last_name: 'Asabir',
            email: 'ba@gmail.com',
            password: 'passs',
            avatar: "Avatar/yogw0sg0or4zgojmixug",
            admin: false,
            address: {
                street: '1st Street NW',
                city: 'Toronto',
                neighbourhood: 'Etobicoke',
                province: 'Ontario',
                postal_code: 'AAA AAA'
            },
            phone: '111 111 1111',
            dogs: [
                {
                    name: 'Rex',
                    breed: 'Doberman',
                    weight: 70,
                    treats: false,
                    avatar: "Avatar/sxx1eh60qbxrtzqfowat"
                }
            ],
            status: "ACTIVE"
        }
    );

    await Owner.create(
        {
            first_name: 'Alex',
            last_name: 'Chung',
            email: 'ac@gmail.com',
            password: 'passs',
            avatar: "Avatar/cgfhllh4ggu3wnrjsvoe",
            admin: true,
            address: {
                street: '1st Street NW',
                city: 'Toronto',
                neighbourhood: 'North York',
                province: 'Ontario',
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
            status: "ACTIVE"
        }
    );
    await Owner.create(
        {
            first_name: 'Joe',
            last_name: 'Anderson',
            email: 'ja@gmail.com',
            password: 'passs',
            avatar: "Avatar/cgfhllh4ggu3wnrjsvoe",
            admin: false,
            address: {
                street: '1st Street NW',
                city: 'Toronto',
                neighbourhood: 'North York',
                province: 'Ontario',
                postal_code: 'AAA AAA'
            },
            phone: '111 111 1111',
            dogs: [
                {
                    name: 'Bruen',
                    breed: 'Poodle',
                    weight: 70,
                    treats: true,
                    avatar: "Avatar/sxx1eh60qbxrtzqfowat"
                }
            ],
            status: "ACTIVE"
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
            avatar: "Avatar/pxkrwzzo0pzmdotbt1bo",
            neighbourhoods: ['Downtown', 'Etobicoke', 'York'],
            address: {
                street: '1st Street NW',
                city: 'Toronto',
                neighbourhood: 'Scarborough',
                province: 'Ontario',
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
                    rating: 2,
                    review_text: "bad!!!"
                }
            ],
            earnings: 575,
            availability: [
                {
                    date: '2021-05-22',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-23',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-24',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: false
                },
                {
                    date: '2021-05-25',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: false
                },
                {
                    date: '2021-05-26',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: false
                },
                {
                    date: '2021-05-28',
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
            first_name: 'Elijah',
            last_name: 'Holt',
            email: 'eh@gmail.com',
            password: 'passs',
            avatar: "Avatar/pxkrwzzo0pzmdotbt1bo",
            neighbourhoods: ['North York', 'East York', 'Scarborough'],
            address: {
                street: '1st Street NW',
                city: 'Toronto',
                neighbourhood: 'North York',
                province: 'Ontario',
                postal_code: 'AAA AAA'
            },
            reviews: [
                {
                owner_id: ownerIds[3],
                rating: 5,
                review_text: "Thanks for taking care of my babies."
                },
                {
                owner_id: ownerIds[0],
                rating: 4,
                review_text: "keep up good work"
                }
            ],
            earnings: 0.0,
            availability: [
                {
                    date: '2021-05-25',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-27',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-28',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-30',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
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
            avatar: "Avatar/pxkrwzzo0pzmdotbt1bo",
            neighbourhoods: ['Whitchurch-Stouffville', 'Newmarket', 'Aurora'],
            address: {
                street: '1st Street NW',
                city: 'Brampton',
                neighbourhood: 'Brampton',
                province: 'Ontario',
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
            earnings: 700,
            availability: [
                {
                    date: '2021-05-23',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-24',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-25',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-28',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-29',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-31',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
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
            avatar: "Avatar/lztkswrqptaotv5vioe6",
            neighbourhoods: ['Vaughan', 'Richmond Hill', 'King'],
            address: {
                street: '1st Street NW',
                city: 'Richmond Hill',
                neighbourhood: 'Richmond Hill',
                province: 'Ontario',
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
                    date: '2021-05-24',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-26',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-28',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: false
                },
                {
                    date: '2021-05-30',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-31',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                }
            ],
            status: "ACTIVE"
        }
    );

    await Walker.create(
        {
            first_name: 'Rodny',
            last_name: 'Hofman',
            email: 'rh@gmail.com',
            password: 'passs',
            avatar: "Avatar/sxx1eh60qbxrtzqfowat",
            neighbourhoods: ['Ajax', 'Pickering', 'whitby', 'Scugog'],
            address: {
                street: '655 Lyndebrook road',
                city: 'Whitby',
                neighbourhood: 'Whitby',
                province: 'Ontario',
                postal_code: 'L1P 2A2'
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
            earnings: 800.0,
            availability: [
                {
                    date: '2021-05-23',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-24',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-25',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-26',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-28',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-31',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                }
            ],
            status: "ACTIVE"
        }
    );
    await Walker.create(
        {
            first_name: 'Douglas',
            last_name: 'Costa',
            email: 'dc@gmail.com',
            password: 'passs',
            avatar: "Avatar/sxx1eh60qbxrtzqfowat",
            neighbourhoods: ['East Gwillimbury', 'Newmarket', 'Aurora', 'Georgina', 'Bradford West Gwillimbury', 'New Tecumseth' ],
            address: {
                street: '1st Street NW',
                city: 'East Gwillimbury',
                neighbourhood: 'East Gwillimbury',
                province: 'Ontario',
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
                    rating: 5,
                    review_text: "Thanks for taking care of my babies."
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
                    date: '2021-05-22',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-23',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-24',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-25',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-28',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-31',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                }
            ],
            status: "ACTIVE"
        }
    );
    await Walker.create(
        {
            first_name: 'Neil',
            last_name: 'MacArthurr',
            email: 'nm@gmail.com',
            password: 'passs',
            avatar: "Avatar/sxx1eh60qbxrtzqfowat",
            neighbourhoods: ['Brampton', 'Caledon', 'Mississauga'],
            address: {
                street: '1st Street NW',
                city: 'Mississauga',
                neighbourhood: 'Mississauga',
                province: 'Ontario',
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
                    rating: 4,
                    review_text: "keep up good work"
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
                    date: '2021-05-23',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-24',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-26',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-28',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-30',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                }
            ],
            status: "ACTIVE"
        }
    );
    await Walker.create(
        {
            first_name: 'Chris',
            last_name: 'Evan',
            email: 'ce@gmail.com',
            password: 'passs',
            avatar: "Avatar/pxkrwzzo0pzmdotbt1bo",
            neighbourhoods: ['Halton Hills', 'Milton', 'Oakville', 'Burlington'],
            address: {
                street: '1st Street NW',
                city: 'Milton',
                neighbourhood: 'Milton',
                province: 'Ontario',
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
                    date: '2021-05-23',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-24',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-26',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-28',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-30',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                }
            ],
            status: "ACTIVE"
        }
    );
    await Walker.create(
        {
            first_name: 'Crista',
            last_name: 'Galli',
            email: 'cg@gmail.com',
            password: 'passs',
            avatar: "Avatar/pxkrwzzo0pzmdotbt1bo",
            neighbourhoods: ['Mono', 'Orangeville', 'Shelburne'],
            address: {
                street: '1st Street NW',
                city: 'Orangeville',
                neighbourhood: 'Orangeville',
                province: 'Ontario',
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
                    rating: 3,
                    review_text: "not so bad"
                },
                {
                    owner_id: ownerIds[1],
                    rating: 5,
                    review_text: "Thanks for taking care of my babies."
                }
            ],
            earnings: 955.0,
            availability: [
                {
                    date: '2021-05-22',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-23',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-25',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-27',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                },
                {
                    date: '2021-05-30',
                    slot9am: true,
                    slot11am: true,
                    slot1pm: true,
                    slot3pm: true,
                    slot5pm: true,
                    slot7pm: true,
                    slot9pm: true
                }
            ],
            status: "ACTIVE"
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
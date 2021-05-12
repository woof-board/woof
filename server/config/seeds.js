const db = require('./connection');
const { Owner, Walker, Dog } = require('../models');

db.once('open', async () => {   

    await Dog.deleteMany();
    const dogs = await Dog.insertMany([
        {
           name: 'Mylo',
           breed: 'Husky',
           weight: '70lb'
        },
        {
            name: 'Monty',
            breed: 'AusiSheppard',
            weight: '90lb'
        },
        {
            name: 'Rex',
            breed: 'Doberman',
            weight: '70lb'
        },
        {
            name: 'Bruen',
            breed: 'Poodle',
            weight: '70lb'
        }
    ]);


  await Walker.deleteMany();

  await Walker.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    neighbourhoods: 'East Toronto',
    avatar: "/images/user-default.png"
  });

  await Walker.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
    neighbourhoods: 'West Toronto',
    avatar: "/images/user-default.png"
  });

  await Walker.create({
    firstName: 'Karen',
    lastName: 'Nuvoski',
    email: 'karen@testmail.com',
    password: 'password12345',
    neighbourhoods: 'North Toronto',
    avatar: "/images/user-default.png"
  });

  await Walker.create({
    firstName: 'Ryan',
    lastName: 'Turnbull',
    email: 'Ryan@testmail.com',
    password: 'password12345',
    neighbourhoods: 'South Toronto',
    avatar: "/images/user-default.png"
  });

  await Walker.create({
    firstName: 'Mark',
    lastName: 'Spencer',
    email: 'Ryan@testmail.com',
    password: 'password12345',
    neighbourhoods: 'Etobicoke',
    avatar: "/images/user-default.png"
  });

  await Walker.create({
    firstName: 'Alexander',
    lastName: 'Slater',
    email: 'Ryan@testmail.com',
    password: 'password12345',
    neighbourhoods: 'Hamilton',
    avatar: "/images/user-default.png"
  });

  await Walker.create({
    firstName: 'Joe',
    lastName: 'Smith',
    email: 'Ryan@testmail.com',
    password: 'password12345',
    neighbourhoods: 'Ajax',
    avatar: "/images/user-default.png"
  });

console.log('walker seeded');


await Owner.deleteMany();

  await Owner.create({
    first_name: 'Eric',
    last_name: 'Normann',
    email: 'eric.n@me.com',
    password: 'password12345',
    admin:true
  });

  await Owner.create({
    first_name: 'Samiul',
    last_name: 'Choudhury',
    email: 'samiulhaydereee@gmail.com',
    password: 'password12345',
    admin:true
  });

  await Owner.create({
    first_name: 'Nathan',
    last_name: 'Chow',
    email: 'emailme@nathanchow.ca',
    password: 'password12345',
    admin:true,
  });

  await Owner.create({
    first_name: 'Shamim',
    last_name: 'Imtiaz',
    email: 'km_si@ymail.com',
    password: 'password12345',
    admin:true,
  });
  await Owner.create({
    first_name: 'Benjamin',
    last_name: 'Asabir',
    email: 'benasabir@gmail.com',
    password: 'password12345',
    admin:true,
  });

  await Owner.create({
    firstName: 'Rose',
    lastName: 'Francis',
    email: 'rose@testmail.com',
    password: 'password12345',
    admin:true,
    orders: [
        {
          dog: [dog[0]._id, dog[1]._id]
        }
      ]
  });
  await Owner.create({
    firstName: 'Alex',
    lastName: 'Chung',
    email: 'alex@testmail.com',
    password: 'password12345',
    admin:true,
    orders: [
        {
          dog: [dog[0]._id, dog[1]._id, dog[2]._id]
        }
      ]
  });
  await Owner.create({
    firstName: 'Brian',
    lastName: 'Wang',
    email: 'alex@testmail.com',
    password: 'password12345',
    admin:true,
    orders: [
        {
          dog: [dog[0]._id, dog[1]._id]
        }
      ]
  });

  console.log('users seeded');

  process.exit();

});


# <img src="client/public/images/woof-logo.svg" height="90" alt="Woof" title="Woof">


You need a break. So do your dogs. We will help both! Woof connects dog owners with dog walkers who’ll treat your dog like family. You can trust us to keep your pet happy, healthy, and sweet as ever!

## Table Of Content
* [Contributors](#contributors)
* [General Info](#general-info)
* [Technologies](#technologies)
* [Installation](#installation)
* [Usage](#usage)
* [Wireframe](#wireframe)
* [Future Development](#future-development)
* [Screenshot](#screenshot)
* [License](#license)
* [Questions](#questions)

## Contributors
|Eric Normann|Samiul Choudhury|Benn Asabir|Nathan Chow|Shamim Imtiaz|Alex Chung|Rose Franis|Brian Wang|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|![myImage](https://ca.slack-edge.com/T01EXTZCZ44-U01FFJX35EH-8853f39f557f-512)|![myImage](https://avatars.githubusercontent.com/u/3344833?s=460&u=46efd9bd90904237b452dbaefdb03a57156ef84b&v=4)|![myImage](https://ca.slack-edge.com/T01EXTZCZ44-U01FR9XTTN0-9995038c9f3b-512)|![myImage](https://ca.slack-edge.com/T01EXTZCZ44-U01FGC3DAN7-41377ad60b24-512)|![myImage](https://ca.slack-edge.com/T01EXTZCZ44-U01F9AY18T0-ad94549a1f86-512)|![myImage](https://ca.slack-edge.com/T01EXTZCZ44-U01FX6ZRAD7-390208b29630-512)|![myImage](https://avatars.githubusercontent.com/u/32376285?v=4)|![myImage](https://ca.slack-edge.com/T01EXTZCZ44-U01FNARJKGU-eb0d40e6e9f7-512)
|<a href="https://github.com/e-p-n" target="_blank">Eric's Github</a>| <a href="https://github.com/samiul1988"> Samiul's Github</a>|<a href="https://github.com/BennAsabir">Benn's Github</a>|<a href="https://github.com/nchow18">Nathan's Github</a>|<a href="https://github.com/shamimimtiaz">Shamim's Github|<a href="https://github.com/AChung92">Alex's Github|<a href="https://github.com/rosefrancis-tech">Rose's Github|<a href="https://github.com/BrianCKWang">Brian's Github|""|


## General Info
The application follows the MERN paradigm in its architectural structure, using React as the templating language and the JSON web token for authentication.
[Presentation](client/public/images/Woof.pdf)

## Technologies
Project is created with 
* [Javascript](https://www.javascript.com/)
* [Css](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [GraphQL](https://graphql.org/)
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
* [React](https://reactjs.org/)
* [React Router](https://reactrouter.com/)
* [React Datepicker](https://www.npmjs.com/package/react-datepicker)
* [React modal](https://www.npmjs.com/package/react-modal)
* [Concurrently](https://www.npmjs.com/package/concurrently)
* [if-env](https://www.npmjs.com/package/if-env)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
* [jwt-decode"](https://jwt.io/)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [mapbox-gl](https://www.mapbox.com/mapbox-gljs)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [stripe](https://stripe.com/)

## Installation
To get started clone this repository using 
```terminal
git clone git@github.com:woof-board/woof.git
```
Install dependencies 
```terminal
npm install
```
to start running application simply input 
```terminal
npm start
```
Once all that is done, navigate to - http://localhost:3000 to begin!


## Usage
This application is deployed on Heroku at https://woof-2021.herokuapp.com/

There are three types of access:
* **Owner access**
* **Walker access**
* **Administrator access**

**Owner access** allows one to 
* Submit a Signup form for create profile then signin in order to get access. 
* Edit their profile as well as dog profile as needed.
* Able to request a walk, select a available walker and see the progress on their order.
* Able to track their dogs when walker is taking them for a walk-through GPS map.
* Able to rate the walker.
* Able to pay through a secured payment method.
* Able to post comment and rate the walkers.


**Walker access** allows one to 
* Submit a Signup form for create profile then signin in order to get employed. 
* Able to mark their availability in the schedule calender for next two weeks.
* Able to see their confirmed schedule for next 14 days.
* Able to get payout through a secured payment method.


**Administrator access** 
* Has both Owner and Walker Access
* Able to approve pending walkers waiting approval.
* Able to suspend walker and delete comments.

## Wireframe
[wireframe.pdf](https://github.com/woof-board/woof/files/6524517/wireframe.pdf)

## Future Development
Upcoming features:
* Ability for owners to pick favorite walkers
* Owners can purchase pet related items and have it delivered by the walkers
* Expansion into wider geographical locations


## Screenshot
<a href="https://woof-2021.herokuapp.com/"> <img src="https://user-images.githubusercontent.com/75001492/119274358-79c43380-bbdd-11eb-8f54-9f1eeb1952e8.JPG"></a>

## License
This repository is licensed under the MIT license.

## Questions
Questions about this repository? Please contact us at [woof.board.2021@gmail.com](mailto:woof.board.2021@gmail.com). View more of our work in GitHub at [woof](https://github.com/woof-board/woof) 
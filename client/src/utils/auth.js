import decode from 'jwt-decode';

class AuthService {
  getProfileType() {
    if (this.loggedIn()) {
        const { data } = decode(this.getToken());
        return data?.admin === undefined ? "walker" : (data?.admin ? "admin" : "owner");
    } else {
        return "guest";
    }

    // if (this.loggedIn() === true) {
    //   console.log('logged In')
    //   const data = decode(this.getToken());
    //   const admin = data.data['admin']
    //   if (admin === false) {return 'owner'}
    //   else {return 'walker'}
    // } else {
    //   console.log('not logged in')
    //   return 'guest';
    // }
  
  }

  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

//   OwnerloggedIn() {
//     // Checks if there is a saved token and it's still valid
//     const token = this.getToken();
//     return !!token && !this.isTokenExpired(token);
//   }  

//   WalkerloggedIn() {
//     // Checks if there is a saved token and it's still valid
//     const token = this.getToken();
//     return !!token && !this.isTokenExpired(token);
//   }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);

    if (this.getProfileType() === 'owner' || this.getProfileType() === 'admin') {
      window.location.assign('/ownerprofile');
    } else {
      window.location.assign('/walkerprofile');
    }
    // window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();

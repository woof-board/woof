import decode from 'jwt-decode';

class AuthService {
    // returns user type
    getProfileType() {
        if (this.loggedIn()) {
            const { data } = decode(this.getToken());
            return data?.admin === undefined ? "walker" : (data?.admin ? "admin" : "owner");
        } else {
            return "guest";
        }

    }

    // returns user profile
    getProfile() {
        return decode(this.getToken());
    }

    // Checks if there is a saved token and it's still valid
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    // checks token validity
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

    // Retrieves the user token from localStorage
    getToken() {
        return localStorage.getItem('id_token');
    }

    // Saves user token to localStorage and performs login
    login(idToken) {
        localStorage.setItem('id_token', idToken);

        if (this.getProfileType() === 'owner' || this.getProfileType() === 'admin') {
            window.location.assign('/ownerprofile');
        } else if (this.getProfileType() === 'walker') {
            window.location.assign('/walkerschedule');
        }
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }
}

export default new AuthService();

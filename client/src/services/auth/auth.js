const auth = {
  isLoggedIn: false,
  isAuthenticated() {
    return this.isLoggedIn;
  },
  login() {
    this.isLoggedIn = true;
  },
  logout() {
    this.isLoggedIn = false;
  },
};

export default auth;

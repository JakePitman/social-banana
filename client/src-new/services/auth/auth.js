const auth = {
  isAuthenticated() {
    let result = false;
    if (localStorage.getItem('loggedIn')) {
      result = true;
    }
    return result;
  },
  login() {
    localStorage.setItem('loggedIn', true);
  },
  logout() {
    localStorage.removeItem('loggedIn');
  },
};

export default auth;

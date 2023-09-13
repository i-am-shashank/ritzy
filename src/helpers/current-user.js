import cookie from "js-cookie";

class User {
    set = (data) => {
    const { token, userInfo } = data;
    cookie.set("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  };

  get = () => {
    const user = localStorage.getItem("userInfo");
    if (user != null) {
      return JSON.parse(user);
    } else {
      return {};
    }
  };

  update = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data));
  };


  token = () => {
    return cookie.get("token");
  };

  loggedin() {
    return this.token() != null;
  }

  logout() {
    window.localStorage.clear();
  }
}

export default new User();

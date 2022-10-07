class Cookies {
  constructor() {}
  static set(name, value, expireDays) {
    const d = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires = `expires=` + d.toUTCString();
    document.cookie =
      name + `=` + value + `;` + expires + `;path=/`;
  }
  static get(name) {
    let cname = name + `=`;
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(`;`);
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ` `) {
        c = c.substring(1);
      }
      if (c.indexOf(cname) == 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return ``;
  }
  static check() {
    let username = this.get(`username`);
    if (username != ``) {
      alert(`Welcome again ` + username);
    } else {
      username = prompt(`Please enter your name:`, ``);
      if (username != `` && username != null) {
        this.set(`username`, username, 365);
      }
    }
  }
}

export default Cookies;
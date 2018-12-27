//本地缓存

export default {
  set(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  },
  get(name) {
    let data = localStorage.getItem(name);
    if (data !== "undefined" && data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  },
  del(name) {
    localStorage.removeItem(name);
  },
  clear() {
    localStorage.clear();
  }
};

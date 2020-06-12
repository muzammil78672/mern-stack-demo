const getItem = (key) => JSON.parse(localStorage.getItem(key));

const setItem = (key, obj) => localStorage.setItem(key, JSON.stringify(obj));

const clear = () => localStorage.clear();

export { getItem, setItem, clear };

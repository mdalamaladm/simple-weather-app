export default function ({ $config }, inject) {
  function set (key, value, ttl = 12 * 60 * 60 * 1000) {
    const now = new Date();

    // TODO: solve localStorage without ttl
    const item = {
      value,
      timeLimit: now.getTime() + ttl
    };

    localStorage.setItem(`${$config.SCHOOLPRO_STATE_NAME}._${key}`, JSON.stringify(item));
  }

  function get (key) {
    // TODO: solve get localStorage with subKey
    // const [mainKey, subKey] = key.split('.');

    const itemStr = localStorage.getItem(`${$config.SCHOOLPRO_STATE_NAME}._${key}`);

    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.timeLimit) {
      localStorage.removeItem(`${$config.SCHOOLPRO_STATE_NAME}._${key}`);
      return null;
    }

    return item.value;
  }

  function remove (key) {
    localStorage.removeItem(`${$config.SCHOOLPRO_STATE_NAME}._${key}`);
  }

  inject('localStorage', {
    get,
    set,
    remove
  });
}

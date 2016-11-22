/**
 * 生成包装后的localStorage或者sessionStorage
 * @param {localStorage|sessionStorage} storage
 */
function generateStorage(storage) {
  return {
    length: storage.length,

    /**
     * 返回指定index的值
     * @param {string} n
     */
    key(n) {
      return storage.key(n);
    },

    /**
     * 返回storage所有的key
     */
    keys() {
      return Object.keys(storage);
    },

    /**
     * 获取相应key的值
     * @param {string} key
     */
    getItem(key) {
      return JSON.parse(storage.getItem(key));
    },

    /**
     * 向storage添加新值
     * @param {string} key
     * @param {any} value
     */
    setItem(key, value) {
      if (storage.hasOwnProperty(key)) {
        throw new Error('此记录已经存在，如果您确认需要修改此记录，请用updateItem(key)修改！');
      } else {
        try {
          storage.setItem(key, JSON.stringify(value));
        } catch (error) {
          throw error;
        }
      }
    },

    /**
     * 更新storage里指定的key的值
     * @param {string} key
     * @param {any} value
     */
    updateItem(key, value) {
      if (storage.hasOwnProperty(key)) {
        this.setItem(key, value);
      } else {
        throw new Error('不存在此记录');
      }
    },

    /**
     * 移除storage里指定的key
     * @param {string} key
     */
    removeItem(key) {
      storage.removeItem(key);
    },

    /**
     * 清空storage里所有的key
     */
    clear() {
      storage.clear();
    }
  }
}

export const localStorage = generateStorage(window.localStorage);
export const sessionStorage = generateStorage(window.sessionStorage);
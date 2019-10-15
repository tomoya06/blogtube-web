import axios from 'axios';

const client = axios.create({
  baseURL: 'http://10.5.182.1:9600',
});

export const dialogue = {
  fetchRandomBatch(count = 10, type = 0) {
    return client.get(`/dialogue/public/random/batch?count=${count}&type=${type}`);
  },

  bravo(content, targetId) {
    return client.post('/dialogue/public/bravo', {
      content, targetId,
    });
  },

  allBravos() {
    return client.get('/dialogue/public/allbravos');
  },
};

export const user = {
  login(username, password) {
    return client.post('/user/login', {
      username, password,
    });
  },

  register(username, password, email) {
    return client.post('/user/register', {
      username, password, email,
    });
  },
};

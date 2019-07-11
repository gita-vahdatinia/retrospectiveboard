import axios from 'axios';

const instance = axios.create({
  baseURL: "http://0.0.0.0:5000/"
})

export const fetchTeams = () => {
      return instance.get('/teams')
        .then(resp => resp.data)
}

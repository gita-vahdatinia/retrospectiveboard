import axios from 'axios';

const instance = axios.create({
  baseURL: "http://0.0.0.0:5000/"
})

//Return as set so removes duplicates
export const fetchTeams = () => {
      return instance.get(`/teams`)
        .then(resp => [...new Set(resp.data)])
}
export const fetchSprint = (team) => {
      return instance.get(`/${team}/sprint`)
        .then(resp => [...new Set(resp.data)])
}

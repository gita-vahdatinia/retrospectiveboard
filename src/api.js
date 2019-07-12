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
export const fetchWell = (team, sprint) => {
  return instance.get(`/${team}/${sprint}/well`)
    .then(resp => [...new Set(resp.data)])
}
export const fetchBad = (team, sprint) => {
  return instance.get(`/${team}/${sprint}/bad`)
    .then(resp => [...new Set(resp.data)])
}
export const fetchAction = (team, sprint) => {
  return instance.get(`/${team}/${sprint}/action`)
    .then(resp => [...new Set(resp.data)])
}

export const postDescription = (team, sprint, type, description) =>{
  return instance.post(`/post/${team}/${sprint}/${type}/${description}`)
    .then(resp => resp)
}

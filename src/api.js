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
export const fetchItems = (team, sprint, retro_type) => {
  return instance.get(`/${team}/${sprint}/${retro_type}`)
    .then(resp => resp.data)
}
export const fetchBad = (team, sprint) => {
  return instance.get(`/${team}/${sprint}/bad`)
    .then(resp => [...new Set(resp.data)])
}
export const fetchAction = (team, sprint) => {
  return instance.get(`/${team}/${sprint}/todo`)
    .then(resp => [...new Set(resp.data)])
}

export const postDescription = (team, sprint, type, description) =>{
  return instance.get(`/post/${team}/${sprint}/${type}/${description}`)
    .then(resp => resp)
}

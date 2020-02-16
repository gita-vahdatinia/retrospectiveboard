import axios from 'axios';

const instance = axios.create({
  baseURL: "http://backend:5000/"
})

//Return as set so removes duplicates
export const fetchTeams = () => {
      return instance.get(`/teams`)
        .then(resp => resp.data)
}

export const fetchItems = (team, sprint) => {
  return instance.get(`/${team}/${sprint}`)
    .then(resp => resp.data)
}

export const fetchSprint = (team) => {
      return instance.get(`/${team}/sprint`)
        .then(resp => [...new Set(resp.data)])
}

export const postDescription = (team, sprint, type, description) =>{
  return instance.get(`/post/${team}/${sprint}/${type}/${description}`)
    .then(resp => resp)
}

export const upVote = (team, sprint, type, description) => {
  return instance.get(`/${team}/${sprint}/${type}/${description}`)
  .then(resp => resp)
}

export const createTeam = (team, sprint) => {
  return instance.get(`/post/${team}/${sprint}`)
  .then(resp => resp)
}

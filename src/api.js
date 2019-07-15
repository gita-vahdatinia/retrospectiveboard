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
export const fetchItems = (team, sprint, type) => {
  return instance.get(`/${team}/${sprint}/${type}`)
    .then(resp => resp.data)
}

export const postDescription = (team, sprint, type, description) =>{
  return instance.get(`/post/${team}/${sprint}/${type}/${description}`)
    .then(resp => resp)
}

export const upVote = (team, sprint, type, description) => {
  return instance.get(`/${team}/${sprint}/${type}/${description}`)
  .then(resp => resp)
}

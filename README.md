Retrospective Board
====================

An interactive web based dashboard for making Sprint retrospective easier to view.
Frontend is done in React.
Backend is  done in Flask.
Setup with webpack, babel, hosted on AWS and deployed with docker.
##### TO DO LIST:
###### BackEnd:
- [ ] Set up routing so there is no need to autorefresh
-[ ] Create login so public can not post  

###### FrontEnd:
- [ ] Update splash page photo
- [ ] Change thumbs up icon
- [ ] http://ec2-54-236-82-8.compute-1.amazonaws.com:8080/
- [ ] Change splash page buttons to be aligned in center after deployed w no data 

###### Infrastructure:
- [x] Create docker network with docker compose
- [ ] AWS
- [ ] Create jenkins pipeline w github webhook so auto deploys w newest code
- [ ] Create load balancer and set up w Route 53
- [ ] Sign up for public domain


#### Installation for local use

- git clone repo
- npm i
- npm start
- npm run dev
- cd server
- copy AWS credentials (backend is dynamo db)
- python Server.py

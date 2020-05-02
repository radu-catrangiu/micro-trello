#!/bin/bash

docker build -t microtrello-frontend ./frontend
docker build -t microtrello-backend ./backend
docker build -t microtrello-auth-service ./auth-service

docker stack deploy -c docker-compose.yaml idp
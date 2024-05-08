# Requirement

- Docker
- Docker Compose

# How to use

1. `git clone https://github.com/wils446/c4234003-0093-41ea-a708-b133e17b4222 <folder name>`
2. `cd <folder name>`
3. make sure to set the end of line of file `build.sh` in frontend folder to LF
4. `docker compose up -d`
5. wait until the build finish (you can see from `docker logs frontend`)
6. access `localhost` for website, and `localhost/api/api` for backend documentation


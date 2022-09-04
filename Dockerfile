FROM node:18

#RUN apk add --no-cache git openssh
#RUN apk add g++ make py3-pip python3

RUN ln -s /usr/bin/python3 /usr/bin/python

WORKDIR /usr/src
RUN mkdir react-zero-to-hero

# copy xplorer service and install dependencies
WORKDIR /usr/src/react-zero-to-hero
COPY . .

RUN yarn
RUN yarn build


WORKDIR /usr/src/react-zero-to-hero/client
RUN echo "GENERATE_SOURCEMAP=false" > ./.env


# React env vars
ARG REACT_APP_GOOGLE_CLIENT_ID
ARG REACT_APP_GITHUB_CLIENT_ID
ARG REACT_APP_DISCORD_INVITE_URL

ENV REACT_APP_GOOGLE_CLIENT_ID=$REACT_APP_GOOGLE_CLIENT_ID
ENV REACT_APP_GITHUB_CLIENT_ID=$REACT_APP_GITHUB_CLIENT_ID
ENV REACT_APP_DISCORD_INVITE_URL=$REACT_APP_DISCORD_INVITE_URL


RUN yarn install --production=true

RUN yarn build

WORKDIR /usr/src/react-zero-to-hero

# start services
CMD ["yarn", "start"]

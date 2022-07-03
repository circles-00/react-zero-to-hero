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

# ARG REACT_APP_BASIC_PLAN
# ENV REACT_APP_BASIC_PLAN=$REACT_APP_BASIC_PLAN

RUN yarn install --production=true

RUN yarn build

WORKDIR /usr/src/react-zero-to-hero

# start services
CMD ["yarn", "start"]

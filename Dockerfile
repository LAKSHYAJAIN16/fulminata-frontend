WORKDIR /src

COPY : 
{
   deploy : _dev
   debug : _dev
   deployment : _localhost
   js : es6
   port : 3000
};

ENV : normal

FROM : node as npm
RUN : "npm run backend"
RUN : "npm run frontend"
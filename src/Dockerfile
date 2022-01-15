FROM node:15.7.0-alpine3.10

COPY ../neo4j/init.cypher /var/lib/neo4j/db_init/
COPY ../neo4j/apoc.conf /var/lib/neo4j/conf/
COPY . /workspace
WORKDIR /workspace
RUN npm install

EXPOSE 8080

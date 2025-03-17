# Build Angular
FROM node:23 AS ng-build

WORKDIR /src

# Install angular cli
RUN npm i -g @angular/cli

COPY client/src src
# copy all json files
COPY client/*.json .

# Clean Install node_modules then build angular
RUN npm ci
RUN ng build

# Build Spring Boot Java
FROM openjdk:23-jdk AS j-build

WORKDIR /src

COPY .mvn .mvn
COPY src src
COPY mvnw .
COPY pom.xml .

# Copy angular files over to static directory
COPY --from=ng-build /src/dist/client-side/browser/ src/main/resources/static
# Run and compile
RUN chmod a+x mvnw && ./mvnw package -Dmaven.test.skip=true

# Copy the JAR file over to the final container
FROM openjdk:23-jdk

WORKDIR /app
COPY --from=j-build /src/target/ecommerce-0.0.1-SNAPSHOT.jar app.jar

ENV SERVER_PORT=8080
# mySQL
ENV SPRING_DATASOURCE_URL="" SPRING_DATASOURCE_USERNAME="" SPRING_DATASOURCE_PASSWORD=""
# mongoDB
ENV SPRING_DATA_MONGODB_URI="" SPRING_DATA_MONGODB_DATABASE=""

EXPOSE ${PORT}

SHELL ["/bin/sh","-c"]
ENTRYPOINT SERVER_PORT=${PORT} java -jar app.jar
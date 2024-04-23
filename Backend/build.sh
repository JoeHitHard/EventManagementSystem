#!/bin/sh

cd ./ems || exit
./gradlew clean build publishToMavenLocal
cd ..


cd ./as || exit
./gradlew clean build
cd ..

cd ./es || exit
./gradlew clean build
cd ..

docker-compose down --rmi all --volumes --remove-orphans es as
docker-compose build
docker-compose up -d

#!/bin/bash
if [[ $1 = "true" ]];
then
    echo "Clearing node modules"
    cd server && rm -rf node_modules && cd ..
    cd ui && rm -rf node_modules && cd ..
fi

docker compose --profile dev up
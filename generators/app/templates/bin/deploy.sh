#!/usr/bin/env bash

cat docker-compose.yml | \
docker run \
--privileged \
--network=host \
--rm \
-i \
-e EXEC=$1 \
-e HOST=$2 \
-e PROJECT=$3 \
-e KEY=$4 \
-e SECRET=$5 \
redpandaci/rancher-compose:1.0.0
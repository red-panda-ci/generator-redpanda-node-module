#!/usr/bin/env bash

docker run \
--privileged \
--rm \
-e NPM_COMMAND=test \
-e NODE=8 \
-v `pwd`:/workspace \
redpandaci/npm-command-runner:1.2.0

docker run --rm -v `pwd`:/home ubuntu chown -R --reference=/home/Jenkinsfile /home # try to restore permissions
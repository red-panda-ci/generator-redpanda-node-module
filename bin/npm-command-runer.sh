#!/usr/bin/env bash

docker run \
--privileged \
-e TOKEN='' \
-e USER=red-panda-ci \
-e REPO=generator-redpanda-node-module \
-e BRANCH=develop \
-e NPM_COMMAND='run make:publish' \
-e PACKAGE_VERSION=0.0.8 \
-e NPM_TOKEN='' \
-e UPDATE_GIT_BRANCHES=true \
redpandaci/npm-command-runner:latest

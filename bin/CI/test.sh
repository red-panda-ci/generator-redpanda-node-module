#!/usr/bin/env bash

GIT_USER=$1
GIT_REPO=$2
GIT_BRANCH=$3
GIT_TOKEN=$4

docker run \
--rm \
--privileged \
-e FORCE_COLOR=1 \
-e USER=$GIT_USER \
-e REPO=$GIT_REPO \
-e BRANCH=$GIT_BRANCH \
-e TOKEN=$GIT_TOKEN \
-e NPM_COMMAND='test' \
redpandaci/npm-command-runner:1.0.0

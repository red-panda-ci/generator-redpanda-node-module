#!/usr/bin/env bash

GIT_USER=$1
GIT_REPO=$2
GIT_BRANCH=$3
GIT_TOKEN=$4
NPM_TOKEN=$5
PACKAGE_VERSION=$6

docker run \
--rm \
--privileged \
-e FORCE_COLOR=1 \
-e USER=$GIT_USER \
-e REPO=$GIT_REPO \
-e BRANCH=$GIT_BRANCH \
-e TOKEN=$GIT_TOKEN \
-e NPM_COMMAND='run make:publish' \
-e PACKAGE_VERSION=$PACKAGE_VERSION \
-e NPM_TOKEN=$NPM_TOKEN \
-e UPDATE_GIT_BRANCHES=true \
redpandaci/npm-command-runner:1.0.0

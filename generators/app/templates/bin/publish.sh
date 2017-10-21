#!/usr/bin/env bash

set -xe

cond() {
    if [ "$1" ] ; then
        echo "$2"
    else
        echo "$3"
    fi
}

# env: PACKAGE_VERSION, NPM_TOKEN, UPDATE_GIT_BRANCHES
# npm $1(version) ,$2(update branches)

VERSION=$(cond "$PACKAGE_VERSION" "$PACKAGE_VERSION" "$1")
UPDATE_BRANCHES=$(cond "$UPDATE_GIT_BRANCHES" "$UPDATE_GIT_BRANCHES" "$2")
TAG=v$VERSION
COMMIT_MSG="New: Release to version $TAG"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ ! -e ~/.npmrc ]; then
    echo $NPM_TOKEN > .npmrc
fi

npm version --no-git-tag-version $VERSION
npm run changelog
git add CHANGELOG.md package.json
git commit -m "$COMMIT_MSG"
git tag -a $TAG -m "$COMMIT_MSG"

if [ $UPDATE_BRANCHES = "true" ]; then
  git checkout develop
  git merge $CURRENT_BRANCH
  git checkout master
  git merge $CURRENT_BRANCH

  git push origin develop
  git push origin master
fi

git push --tags
npm publish
git checkout develop

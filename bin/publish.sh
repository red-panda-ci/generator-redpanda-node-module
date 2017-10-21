#!/usr/bin/env bash

set -xe

cond() {
    if [ "$1" ] ; then
        echo "$2"
    else
        echo "$3"
    fi
}

VERSION=$(cond "$PACKAGE_VERSION" "$PACKAGE_VERSION" "$1")
UPDATE_BRANCHES=$(cond "$UPDATE_GIT_BRANCHES" "$UPDATE_GIT_BRANCHES" "$2")
TAG=v$VERSION
COMMIT_MSG="Update: Update to version $TAG"
CURRNT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo $CURRNT_BRANCH $VERSION $TAG

if [ ! -e ~/.npmrc ]; then
    echo $NPM_TOKEN > .npmrc
fi

npm version --no-git-tag-version $VERSION
npm run changelog
git add CHANGELOG.md package.json
git commit -m $COMMIT_MSG
git tag -a $TAG -m $COMMIT_MSG


if [ $UPDATE_BRANCHES = "true" ]; then
  git checkout develop
  git merge $CURRNT_BRANCH
  git checkout master
  git merge $CURRNT_BRANCH

  git push origin develop
  git push origin master
fi

npm publish
git push --tags

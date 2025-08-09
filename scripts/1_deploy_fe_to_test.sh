#!/bin/sh

# rm -f /usr/share/nginx/html_test/*
# cp dist/gbook-frontend/browser/* /usr/share/nginx/html_test/

# echo "Deployed FE to test."

BRANCH=test
REMOTE=ross@gbook.lol
REMOTE_DIR=/usr/share/nginx/html_test

npm run build:test
git add .
git commit -m "chore: build for test"
git push origin $BRANCH

ssh $REMOTE "
  cd path/to/repo &&
  git checkout $BRANCH &&
  git pull &&
  rm -rf $REMOTE_DIR/*
  cp -r dist/gbook-frontend/browser/* $REMOTE_DIR/
"

echo "Deployed FE to test."

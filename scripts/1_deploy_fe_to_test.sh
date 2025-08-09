#!/bin/sh

# rm -f /usr/share/nginx/html_test/*
# cp dist/gbook-frontend/browser/* /usr/share/nginx/html_test/

# echo "Deployed FE to test."

BRANCH=test
REMOTE=ross@gbook.lol
REMOTE_PUBLIC_DIR=/usr/share/nginx/html_test
REMOTE_REPO_DIR=/home/ross/code/test_fe_gbook

npm run build:test
git add .
git commit -m "chore: build for test"
git push origin $BRANCH

ssh $REMOTE "
  cd $REMOTE_REPO_DIR &&
  git checkout $BRANCH &&
  git pull &&
  doas rm -rf $REMOTE_PUBLIC_DIR/*
  doas cp -r dist/gbook-frontend/browser/* $REMOTE_PUBLIC_DIR/
"

echo "Deployed FE to test."

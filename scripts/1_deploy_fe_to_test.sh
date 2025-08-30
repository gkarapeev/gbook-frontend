#!/bin/sh

rm -f /usr/share/nginx/html_test/*
cp dist/gbook-frontend/browser/* /usr/share/nginx/html_test/
echo "Deployment done."

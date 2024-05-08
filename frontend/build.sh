#!/bin/sh
echo "Build App"

echo "Clearing dist directory"
if [ -d "/var/dist" ]; then
    rm -r /var/dist/*
fi

echo "Installing pnpm"
npm i -g pnpm --loglevel error

echo "Installing dependencies"
pnpm i

echo "Building"
pnpm run build

mkdir -p /var/dist
cp -r out/* /var/dist
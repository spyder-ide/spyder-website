#!/bin/bash -ex

npm install
mkdir -p ~/.fonts/silka
cp -r static/assets/fonts/silka/* ~/.fonts/silka/
fc-cache -f -v

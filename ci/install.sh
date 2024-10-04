#!/bin/bash -ex

npm install
mkdir -p ~/.fonts/silka
cp -r static/assets/fonts/silka/desktop/* ~/.fonts/silka/
fc-cache -fv
echo $REVIEW_ID

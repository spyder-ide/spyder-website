#!/bin/bash -ex

npm install
mkdir -p ~/.fonts/silka
cp -r static/assets/fonts/silka/silka-black* ~/.fonts/silka/
cp -r static/assets/fonts/silka/silka-regular* ~/.fonts/silka/
fc-cache -fv

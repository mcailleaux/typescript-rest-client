#!/bin/bash

# Build
sh ./build.sh

# Publish dist
cd dist
npm publish --access public

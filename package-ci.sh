#!/bin/bash
set -e

# Prepare Npm package
cp ./package.json ./dist/
cp ./README.md ./dist/
cp ./LICENSE ./dist/

# Publish dist
cd dist
npm publish --access public

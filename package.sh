#!/bin/bash
set -e

# Build
sh ./build.sh

# Publish dist
npm publish --access public

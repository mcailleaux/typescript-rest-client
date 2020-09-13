#!/bin/bash
set -e

# Publish dist
cd dist
npm publish --access public

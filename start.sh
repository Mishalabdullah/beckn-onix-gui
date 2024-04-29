#!/bin/bash

# Change into the onix-gui directory
cd onix-gui

# Build and start the Next.js app
npx next build && npx next start -p 3005 &

# Install localtunnel globally
npm install -g localtunnel

# Expose the 3005 port
lt --port 3005

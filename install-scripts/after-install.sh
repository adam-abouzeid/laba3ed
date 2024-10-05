#!/bin/bash
export PATH=$PATH:/usr/local/node/bin
rm -rf /home/ubuntu/laba3ed/node_modules
npm install --prefix /home/ubuntu/laba3ed --legacy-peer-deps
sudo chown -R ubuntu:ubuntu /home/ubuntu/laba3ed
sudo chmod -R 755 /home/ubuntu/laba3ed
sudo systemctl restart laba3ed
sudo systemctl restart nginx

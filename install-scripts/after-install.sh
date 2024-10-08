#!/bin/bash
export PATH=$PATH:/usr/local/node/bin
sudo chown -R ubuntu:ubuntu /home/ubuntu/laba3ed
sudo chmod -R 755 /home/ubuntu/laba3ed
sudo systemctl restart laba3ed
sudo systemctl restart nginx

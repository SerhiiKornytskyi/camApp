#!/bin/bash

echo "Webhook started: $(date '+%Y-%m-%d_%H-%M-%S')" >> /home/protectr/motionCamAppBe/motion-events.txt

curl -v -X POST http://127.0.0.1:3000/api/trigger >> /home/protectr/motionCamAppBe/motion-events.txt 2>&1

echo "Webhook finished: $(date '+%Y-%m-%d_%H-%M-%S')" >> /home/protectr/motionCamAppBe/motion-events.txt

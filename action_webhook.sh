#!/bin/bash

echo "test_$(date '+%Y-%m-%d_%H-%M-%S')"
curl -X POST http://localhost:3000/api/trigger

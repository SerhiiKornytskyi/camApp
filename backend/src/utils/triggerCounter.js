let counter = 0;

function incrementTriggerCounter() {
  counter += 1;
  if (counter > 5000) {
    counter = 0; 
  }
  return counter;
}

function getTriggerCounter() {
  return counter;
}

module.exports = { incrementTriggerCounter, getTriggerCounter };

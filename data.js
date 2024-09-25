const STATUS_ON_DECK = {
  id: 1,
  name: "Ready to start",
  color: "blue.400"

};

const STATUS_IN_PROGRESS = {
  id: 2,
  name: "In Progress",
  color: "yellow.400"
};
const STATUS_STOPPED = {
  id: 5,
  name: "Stopped",
  color: "red.400"
};

const STATUS_TESTING = {
  id: 3,
  name: "Waiting for review",
  color: "orange.400"
};

const STATUS_DEPLOYED = {
  id: 4,
  name: "Deployed",
  color: "green.400"
};

export const STATUSES = [
  STATUS_ON_DECK,
  STATUS_IN_PROGRESS,
  STATUS_TESTING,
  STATUS_DEPLOYED,
  STATUS_STOPPED
];



const DATA = [
  {},
  {}
];



const PRIORITY_CRITICAL = {
  id: 1,
  name: "Critical",
  color: "red.500"
};

const PRIORITY_HIGH = {
  id: 2,
  name: "High",
  color: "orange.400"
};

const PRIORITY_MEDIUM = {
  id: 3,
  name: "Medium",
  color: "yellow.400"
};

const PRIORITY_LOW = {
  id: 4,
  name: "Low",
  color: "green.400"
};

export const PRIORITIES = [
  PRIORITY_CRITICAL,
  PRIORITY_HIGH,
  PRIORITY_MEDIUM,
  PRIORITY_LOW,
];


export default DATA;
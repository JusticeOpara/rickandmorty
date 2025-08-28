const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "alive", label: "Alive" },
  { value: "dead", label: "Dead" },
  { value: "unknown", label: "Unknown" },
];

const genderOptions = [
  { value: "all", label: "All Genders" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "genderless", label: "Genderless" },
  { value: "unknown", label: "Unknown" },
];

const speciesOptions = [
  { value: "all", label: "All Species" },
  { value: "human", label: "Human" },
  { value: "alien", label: "Alien" },
  // { value: "animal", label: "Animal" },
  // { value: "disease", label: "Disease" },
  // { value: "robot", label: "Robot" },
  // { value: "planet", label: "Planet" },
  // { value: "cronenberg", label: "Cronenberg" },
  { value: "unknown", label: "Unknown" },
];

export { statusOptions, genderOptions, speciesOptions };

export type SchemaTypes = {
  users: {
    userId: "string";
    email: "string";
  };
  exercises: {
    id: "string";
    exerciseKey: "string";
    name: "string";
    force: "string";
    level: "string";
    mechanic: "string";
    equipment: "string";
    category: "string";
    instructions: "string";
  };
  exerciseCategory: {
    id: "string";
    category: "string";
  };
  exerciseMuscles: {
    id: "string";
    muscle: "string";
    type: "string";
    muscleTypeKey: "string";
  };
  exerciseImages: {
    id: "string";
    imagePath: "string";
  };
  workoutRoutines: {
    id: "string";
    name: "string";
    description: "string";
    createdAt: "string";
    updatedAt: "string";
  };
  workoutSessions: {
    id: "string";
    name: "string";
    description: "string";
    createdAt: "string";
    updatedAt: "string";
  };
  workoutExercises: {
    id: "string";
    createdAt: "string";
    updatedAt: "string";
  };
  workoutSets: {
    id: "string";
    weight: "number";
    repetitions: "number";
    createdAt: "string";
    updatedAt: "string";
  };
};

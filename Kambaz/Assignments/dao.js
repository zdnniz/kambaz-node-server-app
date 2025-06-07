import Database from "../Database/index.js";

export function createAssignment(assignment) {
  Database.assignments.push(assignment);
  return assignment;
}

export function findAssignments() {
  return Database.assignments;
}

export function findAssignmentById(assignmentId) {
  return Database.assignments.find((a) => a._id === assignmentId);
}

export function findAssignmentsForCourse(courseId) {
  return Database.assignments.filter((a) => a.course === courseId);
}

export function updateAssignment(assignmentId, updates) {
  const assignment = Database.assignments.find((a) => a._id === assignmentId);
  if (assignment) {
    Object.assign(assignment, updates);
  }
  return assignment;
}

export function deleteAssignment(assignmentId) {
  const index = Database.assignments.findIndex((a) => a._id === assignmentId);
  if (index !== -1) {
    Database.assignments.splice(index, 1);
    return true;
  }
  return false;
}

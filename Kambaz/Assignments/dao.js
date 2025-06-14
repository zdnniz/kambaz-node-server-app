import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4()}
  return model.create(newAssignment);
}

export function findAssignments() {
  return model.find();
}

export function findAssignmentById(assignmentId) {
  return AssignmentModel.findById(assignmentId);
  //return Database.assignments.find((a) => a._id === assignmentId);
}

export function findAssignmentsForCourse(courseId) {
  return AssignmentModel.find({ course: courseId });
  //return Database.assignments.filter((a) => a.course === courseId);
}

export function updateAssignment(assignmentId, updates) {
  /*const assignment = Database.assignments.find((a) => a._id === assignmentId);
  if (assignment) {
    Object.assign(assignment, updates);
  }
  return assignment;*/
  return model.findByIdAndUpdate(assignmentId, updates, { new: true });
}

export function deleteAssignment(assignmentId) {
  const index = Database.assignments.findIndex((a) => a._id === assignmentId);
  if (index !== -1) {
    Database.assignments.splice(index, 1);
    return true;
  }
  return false;
}

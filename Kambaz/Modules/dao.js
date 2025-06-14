import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import * as modulesDao from "./dao.js";
import model from "./model.js";

export function findModulesForCourse(courseId) {
 return model.find({ course: courseId });
 // const { modules } = Database;
 // return modules.filter((module) => module.course === courseId);
}

export function createModule(module) {
    //const newModule = { ...module, _id: uuidv4() };
    //Database.modules = [...Database.modules, newModule];
    const newModule = { ...module, _id: uuidv4() };
    return model.create(newModule);
}

export function updateModule(moduleId, moduleUpdates) {
   //const { modules } = Database;
    //const module = modules.find((module) => module._id === moduleId);
    //Object.assign(module, moduleUpdates);
    //return module;
    return model.updateOne({ _id: moduleId }, moduleUpdates);
}

export function deleteModule(moduleId) {
    //const { modules } = Database;
    //Database.modules = modules.filter((module) => module._id !== moduleId);
    return model.deleteOne({ _id: moduleId });
}

import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

let { users } = db;

export const createUser = (user) => (users = [...users, { ...user, _id: uuidv4() }]);
export const findUserByUsername = (username) => users.find((user) => user.username === username);
export const findAllUsers = () => users;
export const findUserById = (userId) => users.find((user) => user._id === userId);
export const findUserByCredentials = (username, password) =>
    users.find((user) => user.username === username && user.password === password);
export const updateUser = (userId, user) => (users = users.map((u) => (u._id === userId ? user : u)));
export const deleteUser = (userId) => (users = users.filter((u) => u._id !== userId));


import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.post("/api/assignments", (req, res) => {
    const assignment = dao.createAssignment(req.body);
    res.status(201).json(assignment);
  });

  app.get("/api/assignments", (req, res) => {
    res.json(dao.findAssignments());
  });

  app.get("/api/courses/:cid/assignments", (req, res) => {
    res.json(dao.findAssignmentsForCourse(req.params.cid));
  });

  app.get("/api/assignments/:aid", (req, res) => {
    const assignment = dao.findAssignmentById(req.params.aid);
    assignment ? res.json(assignment) : res.status(404).send("Not found");
  });

  app.put("/api/assignments/:aid", (req, res) => {
    const assignment = dao.updateAssignment(req.params.aid, req.body);
    assignment ? res.json(assignment) : res.status(404).send("Not found");
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    const success = dao.deleteAssignment(req.params.aid);
    success ? res.sendStatus(204) : res.status(404).send("Not found");
  });
}

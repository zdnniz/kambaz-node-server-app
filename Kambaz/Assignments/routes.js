import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.post("/api/assignments", async (req, res) => {
    const assignment = await dao.createAssignment(req.body);
    res.status(201).json(assignment);
  });

  app.get("/api/assignments", async (req, res) => {
    const assignments = await dao.findAssignments();
    res.json(assignments);
  });

  app.get("/api/courses/:cid/assignments", async (req, res) => {
    const assignments = await dao.findAssignmentsForCourse(req.params.cid);
    res.json(assignments);
  });

  app.get("/api/assignments/:aid",async (req, res) => {
    const assignment = await dao.findAssignmentById(req.params.aid);
    assignment ? res.json(assignment) : res.status(404).send("Not found");
  });

  app.put("/api/assignments/:aid", async (req, res) => {
    const assignment = await dao.updateAssignment(req.params.aid, req.body);
    assignment ? res.json(assignment) : res.status(404).send("Not found");
  });

  app.delete("/api/assignments/:aid", async (req, res) => {
    const success = await dao.deleteAssignment(req.params.aid);
    success ? res.sendStatus(204) : res.status(404).send("Not found");
  });
}

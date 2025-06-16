import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.post("/api/enrollments", async (req, res) => {
    const { userId, courseId } = req.body;
    await dao.enrollUserInCourse(userId, courseId);
    res.json({ status: "enrolled" });
  });

  app.delete("/api/enrollments", async (req, res) => {
    const { userId, courseId } = req.body;
    await dao.unenrollUserFromCourse(userId, courseId);
    res.json({ status: "unenrolled" });
  });

  app.get("/api/enrollments", async (req, res) => {
    const { enrollments } = await dao.default.find();
    res.json(enrollments);
  });
}

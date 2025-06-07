import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.post("/api/enrollments", (req, res) => {
    const { userId, courseId } = req.body;
    dao.enrollUserInCourse(userId, courseId);
    res.json({ status: "enrolled" });
  });

  app.delete("/api/enrollments", (req, res) => {
    const { userId, courseId } = req.body;
    dao.unenrollUserFromCourse(userId, courseId);
    res.json({ status: "unenrolled" });
  });

  app.get("/api/enrollments", (req, res) => {
    const { enrollments } = dao.default;
    res.json(enrollments);
  });
}

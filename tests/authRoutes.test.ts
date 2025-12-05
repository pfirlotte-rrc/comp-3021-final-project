import request from "supertest";
import app from "../src/app";
import { auth } from "../config/firebaseConfig";

jest.mock("../config/firebaseConfig");

describe("POST /api/v1/loans - Authentication and Authorization Integration", () => {
    it("should return 401 with proper error format when no token provided", async () => {
        // Act
        const response: request.Response = await request(app)
            .post("/api/v1/loans/")

        // Assert
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            status: "error",
            error: {
                message: "Unauthorized: No token provided",
                code: "TOKEN_NOT_FOUND",
            },
            timestamp: expect.any(String),
        });
    });

    it("should return 403 with proper error format when user lacks role", async () => {
        // Arrange
        // User role, but route requires admin/manager
        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: "user123",
            role: "admin",
        });

        // Act
        const response: request.Response = await request(app)
            .post("/api/v1/loans/")
            .set("Authorization", "Bearer valid-token")

        // Assert
        expect(response.status).toBe(403);
        expect(response.body).toMatchObject({
            status: "error",
            error: {
                message: "Forbidden: Insufficient role",
                code: "INSUFFICIENT_ROLE",
            },
            timestamp: expect.any(String),
        });
    });
});

describe("POST /api/v1/loans/:id/review - Authentication and Authorization Integration", () => {
    it("should return 401 with proper error format when no token provided", async () => {
        // Act
        const response: request.Response = await request(app)
            .put("/api/v1/loans/:id/review")

        // Assert
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            status: "error",
            error: {
                message: "Unauthorized: No token provided",
                code: "TOKEN_NOT_FOUND",
            },
            timestamp: expect.any(String),
        });
    });

    it("should return 403 with proper error format when user lacks role", async () => {
        // Arrange
        // User role, but route requires admin/manager
        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: "user123",
            role: "admin",
        });

        // Act
        const response: request.Response = await request(app)
            .post("/api/v1/loans/")
            .set("Authorization", "Bearer valid-token")

        // Assert
        expect(response.status).toBe(403);
        expect(response.body).toMatchObject({
            status: "error",
            error: {
                message: "Forbidden: Insufficient role",
                code: "INSUFFICIENT_ROLE",
            },
            timestamp: expect.any(String),
        });
    });
});

describe("POST /api/v1/loans/ - Authentication and Authorization Integration", () => {
    it("should return 401 with proper error format when no token provided", async () => {
        // Act
        const response: request.Response = await request(app)
            .get("/api/v1/loans/")

        // Assert
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            status: "error",
            error: {
                message: "Unauthorized: No token provided",
                code: "TOKEN_NOT_FOUND",
            },
            timestamp: expect.any(String),
        });
    });

    it("should return 403 with proper error format when user lacks role", async () => {
        // Arrange
        // User role, but route requires admin/manager
        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: "user123",
            role: "admin",
        });

        // Act
        const response: request.Response = await request(app)
            .post("/api/v1/loans/")
            .set("Authorization", "Bearer valid-token")

        // Assert
        expect(response.status).toBe(403);
        expect(response.body).toMatchObject({
            status: "error",
            error: {
                message: "Forbidden: Insufficient role",
                code: "INSUFFICIENT_ROLE",
            },
            timestamp: expect.any(String),
        });
    });
});

describe("POST /api/v1/loans/:id/approve - Authentication and Authorization Integration", () => {
    it("should return 401 with proper error format when no token provided", async () => {
        // Act
        const response: request.Response = await request(app)
            .put("/api/v1/loans/:id/approve")

        // Assert
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            status: "error",
            error: {
                message: "Unauthorized: No token provided",
                code: "TOKEN_NOT_FOUND",
            },
            timestamp: expect.any(String),
        });
    });

    it("should return 403 with proper error format when user lacks role", async () => {
        // Arrange
        // User role, but route requires admin/manager
        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: "user123",
            role: "admin",
        });

        // Act
        const response: request.Response = await request(app)
            .post("/api/v1/loans/")
            .set("Authorization", "Bearer valid-token")

        // Assert
        expect(response.status).toBe(403);
        expect(response.body).toMatchObject({
            status: "error",
            error: {
                message: "Forbidden: Insufficient role",
                code: "INSUFFICIENT_ROLE",
            },
            timestamp: expect.any(String),
        });
    });
});

describe("POST /api/v1/loans/:id - Authentication and Authorization Integration", () => {
    it("should return 401 with proper error format when no token provided", async () => {
        // Act
        const response: request.Response = await request(app)
            .delete("/api/v1/loans/:id")

        // Assert
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            status: "error",
            error: {
                message: "Unauthorized: No token provided",
                code: "TOKEN_NOT_FOUND",
            },
            timestamp: expect.any(String),
        });
    });

    it("should return 403 with proper error format when user lacks role", async () => {
        // Arrange
        // User role, but route requires admin/manager
        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: "user123",
            role: "admin",
        });

        // Act
        const response: request.Response = await request(app)
            .post("/api/v1/loans/")
            .set("Authorization", "Bearer valid-token")

        // Assert
        expect(response.status).toBe(403);
        expect(response.body).toMatchObject({
            status: "error",
            error: {
                message: "Forbidden: Insufficient role",
                code: "INSUFFICIENT_ROLE",
            },
            timestamp: expect.any(String),
        });
    });
});
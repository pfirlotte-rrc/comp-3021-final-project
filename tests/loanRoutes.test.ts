import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";
import * as loanController from "../src/api/v1/controllers/loanController";
import { HTTP_STATUS } from "../src/constants/httpConstants";

jest.mock("../src/api/v1/controllers/loanController", () => ({
    createLoan: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.CREATED).send()
    ),
    reviewLoan: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.OK).send()
    ),
    getAllLoans: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.OK).send()
    ),
    approveLoan: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.OK).send()
    ),
    deleteLoan: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.OK).send()
    ),
}));

jest.mock("../src/api/v1/middleware/authenticate", () => {
    return jest.fn((_req: Request, _res: Response, next: NextFunction) =>
        next()
    );
});

jest.mock("../src/api/v1/middleware/authorize", () => {
    return jest.fn(
        (_mockOptions) => (_req: Request, _res: Response, next: NextFunction) =>
            next()
    );
});

describe("Loan Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });


    describe("POST /api/v1/loans/", () => {
        it("should call createLoan controller with valid data", async () => {
            const mockLoan: {
                name: string;
                description: string;
            } = {
                name: "Test Loan",
                description: "Test description",
            };

            await request(app)
                .post("/api/v1/loans/")
                .set("Authorization", "Bearer mockedToken")
                .send(mockLoan);
            expect(loanController.createLoan).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/loans/", () => {
        it("should call getAllLoans controller", async () => {
            await request(app).get("/api/v1/loans/");
            expect(loanController.getAllLoans).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/loans/:id", () => {
        it("should call updateLoan controller with valid data", async () => {
            const mockLoan: {
                name: string;
                description: string;
            } = {
                name: "Updated Loan",
                description: "Updated description",
            };

            await request(app)
                .put("/api/v1/loans/testId/approve")
                .set("Authorization", "Bearer mockedToken")
                .send(mockLoan);
            expect(loanController.approveLoan).toHaveBeenCalled();
        });
    });
    
    describe("DELETE /api/v1/loans/:id", () => {
        it("should call deleteLoan controller with valid data", async () => {
            await request(app)
                .delete("/api/v1/loans/testId")
                .set("Authorization", "Bearer mockedToken");
            expect(loanController.deleteLoan).toHaveBeenCalled();
        });
    });
});

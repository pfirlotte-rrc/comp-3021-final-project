import { Request, Response, NextFunction } from "express";
import * as loanController from "../src/api/v1/controllers/loanController";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { successResponse } from "../src/api/v1/models/responseModel";

jest.mock("../src/api/v1/models/responseModel");

describe("Loan Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    describe("createLoan", () => {
        it("should handle successful operation", () => {
            (successResponse as jest.Mock).mockReturnValue({
                message: "Loan application submitted successfully",
                status: "success",
                data: {
                    id: "001",
                    applicant: "Pippin Took",
                    amount: 75000,
                    status: "pending",
                },
            });

            loanController.createLoan(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Loan application submitted successfully",
                status: "success",
                data: {
                    id: "001",
                    applicant: "Pippin Took",
                    amount: 75000,
                    status: "pending",
                },
            });
        });
    });

    describe("getAllLoans", () => {
        it("should handle successful operation", () => {
            const mockLoans: {
                id: string;
                applicant: string;
                amount: number;
                status: string;
            }[] = [
                { id: "001", applicant: "Frodo Baggins", amount: 75000, status: "pending" },
                { id: "002", applicant: "Samwise Gamgee", amount: 90000, status: "approved" },
                { id: "003", applicant: "Biblo Baggins", amount: 100000, status: "approved" },
            ];

            (successResponse as jest.Mock).mockReturnValue({
                message: "All loan applications retrieved successfully",
                status: "success",
                data: mockLoans,
            });

            loanController.getAllLoans(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "All loan applications retrieved successfully",
                status: "success",
                data: mockLoans,
            });
        });
    });

    describe("reviewLoan", () => {
        it("should handle successful operation", () => {
            mockReq.params = { id: "004" };

            (successResponse as jest.Mock).mockReturnValue({
                message: `Reviewing Loan 004`,
                status: "success",
                data: {
                    id: "004",
                    applicant: "Merry Took",
                    amount: 65000,
                    status: "pending",
                },
            });

            loanController.reviewLoan(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Reviewing Loan 004",
                status: "success",
                data: {
                    id: "004",
                    applicant: "Merry Took",
                    amount: 65000,
                    status: "pending",
                },
            });
        });
    });

    describe("approveLoan", () => {
        it("should handle successful operation", () => {
            mockReq.params = { id: "005" };

            (successResponse as jest.Mock).mockReturnValue({
                message: `Approved Loan 005`,
                status: "success",
                data: {
                    id: "005",
                    applicant: "Gandalf",
                    amount: 100000,
                    status: "approved",
                },
            });

            loanController.approveLoan(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Approved Loan 005",
                status: "success",
                data: {
                    id: "005",
                    applicant: "Gandalf",
                    amount: 100000,
                    status: "approved",
                },
            });
        });
    });

    describe("deleteLoan", () => {
        it("should handle successful operation", () => {
            mockReq.params = { id: "006" };

            (successResponse as jest.Mock).mockReturnValue({
                message: `Deleted Loan 006`,
                status: "success",
                data: {
                    id: "006",
                    applicant: "Gollum",
                    amount: 1000,
                    status: "deleted",
                },
            });

            loanController.deleteLoan(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Deleted Loan 006",
                status: "success",
                data: {
                    id: "006",
                    applicant: "Gollum",
                    amount: 1000,
                    status: "deleted",
                },
            });
        });
    });
});
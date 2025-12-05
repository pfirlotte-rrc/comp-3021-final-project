import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

/**
 * Manages create loan requests through POST /api/v1/loans User route
 * @param req - The express Request
 * @param res  - The express Response
 */
export const createLoan = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
  try {
    const message: string = "Loan application submitted successfully";
    const loan: { id: string; applicant: string; amount: number; status: string } = {
      id: "001",
      applicant: "Pippin Took",
      amount: 75000,
      status: "pending",
    };

    res.status(HTTP_STATUS.CREATED).json(
      successResponse(loan, message)
    );
  } catch (error: unknown) {
      next(error);
  }
};

/**
 * Manages get all loan requests through GET /api/v1/loans Officer & Manager Route
 * @param req - The express Request
 * @param res  - The express Response
 */
export const getAllLoans = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
  try {
    const message: string = "All loan applications retrieved successfully";
    const loans: Array<{ id: string; applicant: string; amount: number; status: string }> = [
      { id: "001", applicant: "Frodo Baggins", amount: 75000, status: "pending" },
      { id: "002", applicant: "Samwise Gamgee", amount: 90000, status: "approved" },
      { id: "003", applicant: "Biblo Baggins", amount: 100000, status: "approved" },
    ];

    res.status(HTTP_STATUS.OK).json(
      successResponse(loans, message)
    );
  } catch (error: unknown) {
      next(error);
  }
};

/**
 * Manages a review loan request through PUT /api/v1/loans/:id/review Officer route
 * @param req - The express Request
 * @param res  - The express Response
 */
export const reviewLoan = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
  try {
    const { id } = req.params;
    
    const message: string = `Reviewing Loan ${id}`;
    const loan: { id: string; applicant: string; amount: number; status: string } = {
      id: "004",
      applicant: "Merry Took",
      amount: 65000,
      status: "pending",
    };

    res.status(HTTP_STATUS.OK).json(
      successResponse(loan, message)    
    );
  } catch (error: unknown) {
      next(error);
  }
};

/**
 * Manages loan approval request through PUT /api/v1/loans/:id/approve Manager route
 * @param req - The express Request
 * @param res  - The express Response
 */
export const approveLoan = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
  try {
    const { id } = req.params;
    
    const message: string = `Approved Loan ${id}`;
    const loan: { id: string; applicant: string; amount: number; status: string } = {
      id: "005",
      applicant: "Gandalf",
      amount: 100000,
      status: "approved",
    };

    res.status(HTTP_STATUS.OK).json(
      successResponse(loan, message)
    );
  } catch (error: unknown) {
      next(error);
  }
};

/**
 * Manages loan delete request through PUT /api/v1/loans/:id Manager route
 * @param req - The express Request
 * @param res  - The express Response
 */
export const deleteLoan = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
  try {
    const { id } = req.params;
    
    const message: string = `Deleted Loan ${id}`;
    const loan: { id: string; applicant: string; amount: number; status: string } = {
      id: "006",
      applicant: "Gollum",
      amount: 1000,
      status: "deleted",
    };

    res.status(HTTP_STATUS.OK).json(
      successResponse(loan, message)
    );
  } catch (error: unknown) {
      next(error);
  }
};

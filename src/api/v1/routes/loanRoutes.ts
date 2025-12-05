import express, { Router } from "express";
import * as loanController from "../controllers/loanController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

// User Routes
router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["user"] }),
    loanController.createLoan
);

// Officer Routes
router.put(
    "/:id/review",
    authenticate,
    isAuthorized({ hasRole: ["officer"] }),
    loanController.reviewLoan
);

// Officer & Manager Route
router.get(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["officer", "manager"] }),
    loanController.getAllLoans
);

// Manager Route
router.put(
    "/:id/approve",
    authenticate,
    isAuthorized({ hasRole: ["manager"] }),
    loanController.approveLoan
);

router.delete(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["manager"] }),
    loanController.deleteLoan
);
export default router;

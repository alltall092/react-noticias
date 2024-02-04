const { Router } = require("express");
const { userRegister, getAllUser,postUserRoles,updatePassword,deleteUser} = require("../controllers");
const authenticate = require("../middlewares/authMiddlewares");

const router = Router();

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                    
 *                   items:
 *                     $ref: "#/components/schemas/Users"
 *
 */
 /**
 * @openapi
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                    
 *                   items:
 *                     $ref: "#/components/schemas/Users"
 *
 */
 
router.post("/users", userRegister);
router.post("/roles", postUserRoles);
router.get("/users", getAllUser);
router.put("/users/:id",updatePassword);
router.delete("/users/:id",deleteUser);

module.exports = router;

const { Router } = require("express");
const { userLogin } = require("../controllers");

const router = Router();
/**
 * @openapi
 * /api/v1/login:
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
router.post("/login", userLogin);

module.exports = router;
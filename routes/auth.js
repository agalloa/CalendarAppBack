/*  Routes User /Auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");


const router = Router();



router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password es obligatorio y debe ser de 6 caracteres"
    ).isLength({ min: 6 }),
    validarCampos
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password es obligatorio y debe ser de 6 caracteres"
    ).isLength({ min: 6 }),
    validarCampos
  ],
  loginUsuario
);

router.get("/renew", validarJwt, revalidarToken);

module.exports = router;

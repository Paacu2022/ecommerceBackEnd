import { Router } from "express";
const usuariosrouter = Router();
import {registracion, login} from "../usuarios/usuariosControlador.js"

usuariosrouter.post ("/registracion", registracion)
usuariosrouter.post ("/login", login)


export default usuariosrouter;
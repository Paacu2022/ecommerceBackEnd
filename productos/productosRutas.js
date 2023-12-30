import { Router } from "express";
const productosrouter = Router();
import {productos, cargar, formularioCargaProductos, tabla, eliminarProducto, modalModificacion, eliminarFoto1, eliminarFoto2, eliminarFoto3, eliminarFoto4, modificarProducto, producto} from "../productos/productosControlador.js"

productosrouter.get ("/", productos)
productosrouter.get ("/uno/:_id", producto)
productosrouter.get ("/formCarga", formularioCargaProductos)
productosrouter.post ("/cargar", cargar)
productosrouter.get ("/tabla", tabla)
productosrouter.get ("/eliminarProducto/:_id", eliminarProducto)
productosrouter.get ("/modalModificacion/:_id", modalModificacion)
productosrouter.get ("/eliminarFoto1/:_id", eliminarFoto1)
productosrouter.get ("/eliminarFoto2/:_id", eliminarFoto2)
productosrouter.get ("/eliminarFoto3/:_id", eliminarFoto3)
productosrouter.get ("/eliminarFoto4/:_id", eliminarFoto4)
productosrouter.post ("/modificarProducto", modificarProducto)

export default productosrouter;
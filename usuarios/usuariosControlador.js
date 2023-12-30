import Usuarios from "../usuarios/usuariosModelo.js"
import Productos from "../productos/productosModelo.js"
import {encriptar, desencriptar} from "../utils/contra.js"
import Swal from 'sweetalert2'


export const registracion= async(req, res)=>{
  const Contraseña= await encriptar(req.body.Contraseña)
  const {Email}= req.body
     try {
    const newUsuario = new Usuarios({
    Email,
    Contraseña
    });

    const nuevoUsuario = await newUsuario.save();
    return res.json(newUsuario);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const login = async (req, res)=>{
  const usuario= await Usuarios.find().where({Email: req.body.Email})
  if (!usuario.length){
    
     const datosIncorrectos=true
    res.render("home",{datosIncorrectos})
    
  
    }else{
    const contraseñacifrada= usuario[0].Contraseña
    const ok=await desencriptar(req.body.Contraseña, contraseñacifrada)
    if(!ok){
    const datosIncorrectos=true
    res.render("home",{datosIncorrectos})
       }else{
    res.render("formularioCargaProductos")
    }
}}






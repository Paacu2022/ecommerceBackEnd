import bcrypt from "bcrypt";
const saltRounds = 10;

 export async function encriptar (contraseña){
  return await bcrypt.hash(contraseña, saltRounds);
};

export async function desencriptar (contraseña, contraseñaEncriptada){
  return await bcrypt.compare(contraseña, contraseñaEncriptada);
};




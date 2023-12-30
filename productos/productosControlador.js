import Productos from "../productos/productosModelo.js"
import {uploadImage, deleteImage} from '../utils/cloudinary.js'
import fs from 'fs-extra'



export const productos= async (req, res)=>{
  try {
    const products = await Productos.find();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const producto= async (req, res)=>{
  try {
    const producto = await Productos.findById(req.params._id).lean()
return res.json (producto)

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const formularioCargaProductos=(req, res)=>{
  res.render ("formularioCargaProductos")
}



export const cargar= async (req, res)=>{
  const {Producto, Descripcion, Precio}= req.body
  try {
    const newProducto = new Productos({
      Producto,
      Descripcion,
      Precio
    });

    if (req.files?.Foto1) {
      const result = await uploadImage(req.files.Foto1.tempFilePath)
      newProducto.Foto1 = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }
      await fs.unlink(req.files.Foto1.tempFilePath)
    }

    if (req.files?.Foto2) {
      const result = await uploadImage(req.files.Foto2.tempFilePath)
      newProducto.Foto2 = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }
      await fs.unlink(req.files.Foto2.tempFilePath)
    }

    if (req.files?.Foto3) {
      const result = await uploadImage(req.files.Foto3.tempFilePath)
      newProducto.Foto3 = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }
      await fs.unlink(req.files.Foto3.tempFilePath)
    }

    if (req.files?.Foto4) {
      const result = await uploadImage(req.files.Foto4.tempFilePath)
      newProducto.Foto4 = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }
      await fs.unlink(req.files.Foto4.tempFilePath)
    }
    
    const savedProduct = await newProducto.save();
    const ok=true
    res.render("formularioCargaProductos", {ok})
  } catch (error) {
    if (req.files?.Foto1) {
      await fs.unlink(req.files.Foto.tempFilePath)
    }
    console.log(error);
    const nc=true
    res.render("formularioCargaProductos", {nc})
  }
}

  export const tabla= async (req, res)=>{
  const tabla= await Productos.find().lean()
  res.render ("tabla", {tabla})
}

export const eliminarProducto= async (req,res)=>{
  try{
    const deletedProduct = await 
    Productos.findByIdAndDelete(req.params._id);
 if (deletedProduct.Foto1.public_id){
    await deleteImage (deletedProduct.Foto1.public_id)}

  if (deletedProduct.Foto2.public_id){
    await deleteImage (deletedProduct.Foto2.public_id)}

  if (deletedProduct.Foto3.public_id){
    await deleteImage (deletedProduct.Foto3.public_id)}

  if (deletedProduct.Foto4.public_id){
    await deleteImage (deletedProduct.Foto4.public_id)}

  const tabla= await Productos.find().lean()
  res.render ("tabla", {tabla})
  }catch (error){
    res.send (error)
  }  
}


export const modalModificacion= async (req,res)=>{
  req.app.locals.id = req.params._id
  const produModificar = await Productos.findById(req.params._id).lean()
res.render("modalModificacion", {produModificar})
}

export const eliminarFoto1=async (req, res)=>{
  const nvaruta=" "
  const produ = await Productos.findById(req.params._id)
  await deleteImage (produ.Foto1.public_id)
  await Productos.findByIdAndUpdate(produ._id, {Foto1: nvaruta})
  const string = encodeURIComponent(produ._id);
   res.redirect ('/productos/modalModificacion/' + string,)
}

export const eliminarFoto2=async (req, res)=>{
  const nvaruta=" "
  const produ = await Productos.findById(req.params._id)
  await deleteImage (produ.Foto2.public_id)
  await Productos.findByIdAndUpdate(produ._id, {Foto2: nvaruta})
  const string = encodeURIComponent(produ._id);
   res.redirect ('/productos/modalModificacion/' + string,)
}

export const eliminarFoto3=async (req, res)=>{
  const nvaruta=" "
  const produ = await Productos.findById(req.params._id)
  await deleteImage (produ.Foto3.public_id)
  await Productos.findByIdAndUpdate(produ._id, {Foto3: nvaruta})
  const string = encodeURIComponent(produ._id);
   res.redirect ('/productos/modalModificacion/' + string,)
}

export const eliminarFoto4=async (req, res)=>{
  const nvaruta=" "
  const produ = await Productos.findById(req.params._id)
  await deleteImage (produ.Foto4.public_id)
  await Productos.findByIdAndUpdate(produ._id, {Foto4: nvaruta})
  const string = encodeURIComponent(produ._id);
   res.redirect ('/productos/modalModificacion/' + string,)
}

export const modificarProducto = async (req, res)=>{
 try{
if (req.files) {
  if(req.files.Foto1){
  const result = await uploadImage(req.files.Foto1.tempFilePath)
      result.Foto1 = {
        public_id: result.public_id,
        secure_url: result.secure_url}
   await fs.unlink(req.files.Foto1.tempFilePath)
    await Productos.findByIdAndUpdate(req.app.locals.id, 
  {Foto1:result.Foto1 })
  }

  if(req.files.Foto2){
  const result = await uploadImage(req.files.Foto2.tempFilePath)
      result.Foto2 = {
        public_id: result.public_id,
        secure_url: result.secure_url}
   await fs.unlink(req.files.Foto2.tempFilePath)
    await Productos.findByIdAndUpdate(req.app.locals.id, 
  {Foto2:result.Foto2 })
  }

  if(req.files.Foto3){
  const result = await uploadImage(req.files.Foto3.tempFilePath)
      result.Foto3 = {
        public_id: result.public_id,
        secure_url: result.secure_url}
   await fs.unlink(req.files.Foto3.tempFilePath)
    await Productos.findByIdAndUpdate(req.app.locals.id, 
  {Foto3:result.Foto3 })
  }

  if(req.files.Foto4){
  const result = await uploadImage(req.files.Foto4.tempFilePath)
      result.Foto4 = {
        public_id: result.public_id,
        secure_url: result.secure_url}
   await fs.unlink(req.files.Foto4.tempFilePath)
    await Productos.findByIdAndUpdate(req.app.locals.id, 
  {Foto4:result.Foto4 })
  }
}
        await Productos.findByIdAndUpdate(req.app.locals.id, 
  {Producto: req.body.Producto, 
  Descripcion: req.body.Descripcion, 
  Precio: req.body.Precio})
    
    const produModificar = await Productos.findById(req.app.locals.id).lean()
res.render("modalModificacion", {produModificar})
 }catch(error) {
   if (req.files?.Foto1) {
      await fs.unlink(req.files.Foto1.tempFilePath)
    }
   if (req.files?.Foto2) {
      await fs.unlink(req.files.Foto2.tempFilePath)
    }
   if (req.files?.Foto3) {
      await fs.unlink(req.files.Foto3.tempFilePath)
    }
   if (req.files?.Foto4) {
      await fs.unlink(req.files.Foto4.tempFilePath)
    }
   const nc=true
    const produModificar = await Productos.findById(req.app.locals.id).lean()
res.render("modalModificacion", {produModificar, nc})
  
 }

}
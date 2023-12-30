import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
   Email: {
      type:String,
      required: true,
      trim: true,
    },
   Contraseña: {
      type:String,
      trim: true,
    }
    },
    {
    timestamps: true
  },
  )

export default mongoose.model("Usuarios", usuarioSchema);
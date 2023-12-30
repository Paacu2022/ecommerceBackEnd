import express from "express";
import 'dotenv/config'
import cors from "cors"
import expresshbs from "express-handlebars"
const app = express();
const PORT = process.env["PORT"] || 3000;
import { connectToDB } from "./config/mongoose.js";
import usuariosrouter from "../Tienda/usuarios/usuariosRutas.js"
import productosrouter from "../Tienda/productos/productosRutas.js"
import fileUpload from "express-fileupload";
import mercadopago from "mercadopago";




  connectToDB();
  app.listen(PORT, (err) => {
    !err
    ? console.log(`Servidor corriendo en puerto: ${PORT}`)
    : console.log(`Servidor caido por error: ${err}`);
    });
  



app.use(express.static(`public`));
app.use (cors ());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));



mercadopago.configure({
	access_token: "TEST-3856204696772465-052113-52520f4e003a030f7a77f500a4c55b3a-1374937094",
  });

app.locals.id

app.use( fileUpload({
 useTempFiles: true,
tempFileDir: "./uploads",
})
);

app.engine (`.hbs`, expresshbs.engine ({ extname: `hbs` }))
app.set(`view engine`, `hbs`)
app.set (`views`, `./views`)

app.post("/create_preference",  (req, res)  => {
 
	let preference = {
		items: [
			{
				title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:5173/",
			"failure": "http://localhost:5173/",
			"pending": "http://localhost:5173/"
		},
		auto_return: "approved",
	};

	 mercadopago.preferences.create(preference)
		.then(function (response){
			
      res.json ({
		
        response

      })
    }) 
 
        .catch(function (error) {
			console.log(error);
		});

});






app.use("/productos", productosrouter)
app.use("/usuarios", usuariosrouter)

app.use("/", (req, res)=>{
  res.render ("home")})


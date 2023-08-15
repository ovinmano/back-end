const express = require("express");
const userRouter = require("./routes/userRoute");
const app = express();
const cors = require('cors');
const productRoutes = require("./routes/productRoutes");

const dbConfig = require("./db");

app.use(cors());
app.use(express.json());
app.use("/", userRouter);

app.use("/", productRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Node server started using nodemon"));
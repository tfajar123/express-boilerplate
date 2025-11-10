import config from "./config/config";
import app from "./config/express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

app.use(cors())
app.use(helmet())
app.use(compression())

console.log(`project running on ${config.port}`)
app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`)
})

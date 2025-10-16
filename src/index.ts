import config from "./config/config";
import app from "./config/express";


console.log(`project running on ${config.port}`)
app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`)
})

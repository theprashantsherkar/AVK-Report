import { app } from './index.js';
import colors from 'colors';
import { DBconnect } from "./database/db.js";

DBconnect();

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`.black.bgMagenta)
})
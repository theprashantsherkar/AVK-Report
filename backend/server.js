import {app} from './index.js';
import { DBconnect } from "./database/db.js";

DBconnect();

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`)
})
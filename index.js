import { connectToDatabase } from "./db/db.js";
import { start } from "./inquirer.js";

(async function startApp() {
    try {
        const connection = await connectToDatabase();
        console.log("Connected to the CMS Employee database.");
        await start(connection);
    } catch (error) {
        console.log("There was an error connecting to the database. Please contact your System's Administrator with the error information.\n", error);
    }
})();

// export-database.js
import mysqldump from 'mysqldump';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dumpFilePath = path.join(__dirname, 'exported_database.sql'); // Path where the SQL file will be saved

try {
  await mysqldump({
    connection: {
      host: 'localhost',
      user: 'root', // Replace with your MySQL username
      password: '', // Replace with your MySQL password
      database: 'hotel_management', // Replace with your database name
    },
    dumpToFile: dumpFilePath,
  });
  console.log(`Database exported successfully to ${dumpFilePath}`);
} catch (err) {
  console.error(`Error exporting database: ${err}`);
}

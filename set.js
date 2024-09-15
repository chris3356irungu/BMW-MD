const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU1sM1MramU5bGx1aGx6T0pBbTBudDJxTldzOVJrTHZlL0JrU28zbDEwUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUtlMHRNeFRTNWF2M01sWTRBdDVVbnJVMXJCVXpad0JwcDcvc3ZlckxHND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrRForNlNrdlJOcUFibHhsSUJ4MW8vd1lWSWRVSkswek9WRkxpOE5WRjJjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4VElxaUtGQ0lFS3JIY0NvRE1SM3NxRVh3N0NpZks0RnRia0kzb2M0K2tVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtMNjZ3bGNmN2IzaTk3QlFtNEx2c2Y2TGZ6OFNFTkc4V1hmOTdLNmJEV009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitnUXR6dkI3Ry95S0FZOW9qS0hHcG9va0d1OFBhamduL0JKeWVrNjczUUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU5sWWxld05aMktMZTRIb0dMQXVyMVk4WERvVkFVSjJNR2czZ2F0N0tuUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiamorbFU5RDNJb1R5YzBra2RsbDh3ZmpCU2NqN0xWQ3o5R05pa3NQeTdpST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlcwMDUwUWxaTVdiYU5vV0J5WEhVRE45eGpVenBPSTQzNHNac251eEp1K3BLenVNamxleFpOY3JhUDdCZ0gxTUhOcmp0M1ZUUjl3SnFWWXRlUTBRRWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgyLCJhZHZTZWNyZXRLZXkiOiJOelZmMko1Z3VMN3ZZemEzbnVHZmw4d0JEaGJXeUNOUFZETkkxT2NuRUpVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJrbl9pN0RvQ1JPQ3BoTjQxOENwWDR3IiwicGhvbmVJZCI6IjZiNGEzNGM2LTk2MWUtNDA3My1iNDQ4LTE2ZWU3ZTU5MzkzZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5SXJWeERDM1kwYUlUNVR0TkUvV1NSK0Z1Vlk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiczViSzFKVG5DNmpRNWV1bUUvRUtBYUcrK2lRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlFFWVo3RFpMIiwibWUiOnsiaWQiOiIyNTQ3MTEyNDY2NDI6NzNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0l2cGlNMEZFTnFkemJZR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImVCLytydzEwd1BUZGx1Q2xRa1JvejhYZTVxRDF4YS9IMzBjQ1dXQ2ZFVk09IiwiYWNjb3VudFNpZ25hdHVyZSI6InZmb1BHYUlLM2dOTGh0bmE1RU1nZ2hiWmE1N0RYNGZxQ0NQZkRiVnVLVVpYa0tQNldaWFJoS1dOVUsxMlMvQTl4azhrS3pqUTVzVlc1VnhDcmF3K0RRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJwc1ZIeTVORVRTU0E0eTJxQ09DWmRoTEdRcWRPOU54WWxwZTFSVTMxZFdLZ3ZFbEVGVk1jZzNwUmhEaUIzYXo1MkN6eTl1WXYwLy80aG1STm9oVkZnZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcxMTI0NjY0Mjo3M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYZ2YvcThOZE1EMDNaYmdwVUpFYU0vRjN1YWc5Y1d2eDk5SEFsbGdueEZUIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI1MTI0MzI3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU0wMSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BMW MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/071f797dda6aef5ae3877.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


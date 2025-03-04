import admin from 'firebase-admin';
import serviceAccount from './coffee-export-43344-firebase-adminsdk-fbsvc-70e34f44e2.json' assert { type: "json" };

admin.initializeApp({ 
    credential: admin.credential.cert(serviceAccount), 
}); 

export default admin;

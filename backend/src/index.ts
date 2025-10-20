
import express, { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import cors from 'cors';

// Initialize Firebase Admin SDK
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API endpoint to get meter readings
app.get('/api/meter-readings', async (req: Request, res: Response) => {
  try {
    const meterReadingsCollection = db.collection('meterReadings');
    const snapshot = await meterReadingsCollection.get();
    const meterReadings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(meterReadings);
  } catch (error) {
    console.error('Error fetching meter readings:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to generate mock data
app.get('/api/generate-data', async (req: Request, res: Response) => {
  try {
    const meterReadingsCollection = db.collection('meterReadings');

    // Delete all existing documents in the collection
    const existingDocs = await meterReadingsCollection.get();
    const batch = db.batch();
    existingDocs.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Generate new mock data
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for (const month of months) {
      const usage = Math.floor(Math.random() * (5000 - 1000 + 1) + 1000);
      const cost = usage * 0.05;

      await meterReadingsCollection.add({
        month,
        usage,
        cost,
      });
    }

    res.status(200).send('Mock data generated successfully');
  } catch (error) {
    console.error('Error generating mock data:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

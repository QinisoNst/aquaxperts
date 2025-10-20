"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin = __importStar(require("firebase-admin"));
const cors_1 = __importDefault(require("cors"));
// Initialize Firebase Admin SDK
const serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API endpoint to get meter readings
app.get('/api/meter-readings', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meterReadingsCollection = db.collection('meterReadings');
        const snapshot = yield meterReadingsCollection.get();
        const meterReadings = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        res.json(meterReadings);
    }
    catch (error) {
        console.error('Error fetching meter readings:', error);
        res.status(500).send('Internal Server Error');
    }
}));
// API endpoint to generate mock data
app.get('/api/generate-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meterReadingsCollection = db.collection('meterReadings');
        // Delete all existing documents in the collection
        const existingDocs = yield meterReadingsCollection.get();
        const batch = db.batch();
        existingDocs.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        yield batch.commit();
        // Generate new mock data
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        for (const month of months) {
            const usage = Math.floor(Math.random() * (5000 - 1000 + 1) + 1000);
            const cost = usage * 0.05;
            yield meterReadingsCollection.add({
                month,
                usage,
                cost,
            });
        }
        res.status(200).send('Mock data generated successfully');
    }
    catch (error) {
        console.error('Error generating mock data:', error);
        res.status(500).send('Internal Server Error');
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import { app } from "./firebase"; // Assuming your firebase app initialization is in firebase.ts

const db = getFirestore(app);

const waterInfoCollection = collection(db, "waterinfo");

// Define the data structure for the waterinfo collection
interface WaterInfo {
  location: string;
  latitude: number;
  longitude: number;
  water_quality: {
    pH_level: number;
    turbidity: number;
    chlorine: number;
  };
  tank_level: {
    main_reservoir: number;
    north_tank: number;
    south_tank: number;
    daily_consumption: number;
  };
  water_leak: {
    current_flow_rate: number;
    average_flow_rate: number;
    leak_status: "No Leak" | "Leak Detected";
    leak_detected: boolean;
    weekly_water_usage: {
      current_week: {
        Mon: number;
        Tue: number;
        Wed: number;
        Thu: number;
        Fri: number;
        Sat: number;
        Sun: number;
      };
      last_week: {
        Mon: number;
        Tue: number;
        Wed: number;
        Thu: number;
        Fri: number;
        Sat: number;
        Sun: number;
      };
    };
  };
}

// Function to add a new document to the waterinfo collection
const addWaterInfo = (data: WaterInfo) => {
  return addDoc(waterInfoCollection, data);
};

export { db, addWaterInfo };

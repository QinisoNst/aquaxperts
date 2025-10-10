
import { db } from "../firebase"; // Your Firebase configuration
import { addWaterInfo } from "../firestore"; // The function you just created

// --- Create a new water info document ---
const createWaterInfo = async (data: any) => {
  try {
    const newDocRef = await addWaterInfo(data);
    console.log("New document created with ID:", newDocRef.id);
    return newDocRef;
  } catch (error) {
    console.error("Error creating new document:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export { createWaterInfo };

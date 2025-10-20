
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const submitReport = async (issue: string, otherIssue: string, description: string, location: string) => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('You must be logged in to submit a report.');
  }

  try {
    await addDoc(collection(db, 'reports'), {
      userId: currentUser.uid,
      username: currentUser.displayName,
      issue: issue === 'other' ? otherIssue : issue,
      description,
      location,
      createdAt: serverTimestamp(),
      status: 'submitted',
    });
  } catch (err) {
    console.error(err);
    throw new Error('Failed to submit report. Please try again.');
  }
};

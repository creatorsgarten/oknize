import {
  DocumentData,
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import firebaseApp from "./firebase";

const db = getFirestore(firebaseApp);

export function getScheduleRef(uid: string) {
  return doc(db, "schedule", uid);
}

export async function getSchedule(uid: string) {
  const scheduleRef = getScheduleRef(uid);
  const scheduleDoc = await getDoc(scheduleRef);
  if (scheduleDoc.exists()) {
    return scheduleDoc.data();
  } else {
    return null;
  }
}

export function subscribeSchedule(uid: string, callback: Function) {
  const scheduleRef = getScheduleRef(uid);
  return onSnapshot(scheduleRef, (doc) => {
    callback(doc.data());
  });
}

export async function setSchedule(uid: string, schedule: DocumentData) {
  const scheduleRef = getScheduleRef(uid);
  await setDoc(scheduleRef, schedule);
}

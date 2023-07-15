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

// add
export async function addTask(uid: string, task: DocumentData) {
  // sor ttask first then update
}

export async function deleteTask(uid: string, task: DocumentData) {
  //  filter task then update
}

// udpate
export async function setSchedule(uid: string, schedule: DocumentData) {
  const scheduleRef = getScheduleRef(uid);
  await setDoc(scheduleRef, schedule, { merge: true });
}

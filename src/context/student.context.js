import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../misc/firebase";

const StudentContext = createContext();
const userRef = firestore.collection("users");

export const StudentProvider = ({ children }) => {
  const [studentDocs, setStudentDocs] = useState({
    isLoading: true,
    data: null,
  });
  const user = auth.currentUser;

  useEffect(() => {
    let unSub = () => {};
    if (user) {
      unSub = userRef
        .where("student_of", "==", user.uid)
        .onSnapshot((studentDocsSnap) => {
          const data = studentDocsSnap.docs.map((student) => {
            return { uid: student.id, ...student.data() };
          });
          setStudentDocs({
            isLoading: false,
            data,
          });
        });
    }
    return () => unSub();
  }, [user]);

  return (
    <StudentContext.Provider value={{ studentDocs }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentDocs = () => useContext(StudentContext);

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../misc/firebase";
import { useProfile } from "./profile.context";

const StudentContext = createContext();
const userRef = firestore.collection("users");

export const StudentProvider = ({ children }) => {
	const [studentDocs, setStudentDocs] = useState({
		isLoading: true,
		data: [],
	});
	const [assignableStudentDocs, setAssignableStudentDocs] = useState({
		isLoading: true,
		data: [],
	});
	const { profile } = useProfile();
	const user = auth.currentUser;

	useEffect(() => {
		let unSubDocs = () => {};
		let unSubFreeStudents = () => {};
		
		if (user && !profile.student_of) {
			unSubDocs = userRef
				.where("student_of", "==", user.uid)
				.onSnapshot((studentDocsSnap) => {
					setStudentDocs({
						isLoading: false,
						data: studentDocsSnap.docs.map((student) => {
							return { uid: student.id, ...student.data() };
						}),
					});
				});

			unSubFreeStudents = userRef
				.where("student_of", "==", "not_assigned")
				.onSnapshot((studentDocsSnap) => {
					setAssignableStudentDocs({
						isLoading: false,
						data: studentDocsSnap.docs.map((student) => {
							return { uid: student.id, ...student.data() };
						}),
					});
				});
		}
		return () => {
			unSubDocs();
			unSubFreeStudents();
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<StudentContext.Provider value={{ studentDocs, assignableStudentDocs }}>
			{children}
		</StudentContext.Provider>
	);
};

export const useStudentDocs = () => useContext(StudentContext);

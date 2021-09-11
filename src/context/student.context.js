import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "rsuite";
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
	const [results, setResults] = useState({
		isLoading: true,
		data: [],
	});
	const { profile } = useProfile();
	const user = auth.currentUser;

	useEffect(() => {
		let unSubDocs = () => {};
		let unSubFreeStudents = () => {};
		let unSubResults = () => {};

		if (user && !profile.student_of) {
			unSubDocs = userRef
				.where("student_of", "==", user.uid)
				.onSnapshot((studentDocsSnap) => {
					try {
						const uids = [];

						// setting studentDocs data
						setStudentDocs({
							isLoading: false,
							data: studentDocsSnap.docs.map((student) => {
								uids.push(student.id);
								return { uid: student.id, ...student.data() };
							}),
						});

						// Setting result data
						if (uids.length > 0) {
							unSubResults = firestore
								.collection("results")
								.where("uid", "in", uids)
								.onSnapshot((resultSnap) => {
									setResults({
										isLoading: false,
										data: resultSnap.docs.map((result) => {
											return {
												results: result.data(),
												student: studentDocsSnap.docs
													.filter((student) => student.id === result.id)
													.map((student) => {
														return { ...student.data(), uid: student.id };
													})[0],
											};
										}),
									});
								});
						}
					} catch (error) {Alert.error(error.message, 4000)					}
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
			unSubResults();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<StudentContext.Provider
			value={{ studentDocs, assignableStudentDocs, results }}
		>
			{children}
		</StudentContext.Provider>
	);
};

export const useStudentDocs = () => useContext(StudentContext);

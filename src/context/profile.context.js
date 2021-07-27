import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "rsuite";
import { auth, firestore } from "../misc/firebase";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [profile, setProfile] = useState({});
	const [studentDocs, setStudentDocs] = useState({
		isLoading: true,
		data: null,
	});

	useEffect(() => {
		const getUserDoc = async () => {
			auth.onAuthStateChanged(async (authObj) => {
				if (authObj && auth.currentUser) {
					firestore
						.collection("users")
						.doc(authObj.uid)
						.get()
						.then((doc) => {
							if (doc.exists) {
								setProfile({
									...doc.data(),
									uid: doc.id,
								});

								if (doc.data().student_list) {
									const studentArray = [];
									doc.data().student_list.map(async (student) => {
										firestore
											.collection("users")
											.doc(student)
											.get()
											.then((studentDoc) =>
												studentArray.push(studentDoc.data())
											);
									});
									setStudentDocs({ isLoading: false, data: studentArray });
								}
							} else {
								setProfile(null);
							}
						})
						.catch((error) => Alert.error(error.message, 4000));
					setIsLoading(false);
				} else {
					setProfile(null);
					setIsLoading(false);
				}
			});
		};

		getUserDoc();
	}, []);

	return (
		<ProfileContext.Provider value={{ isLoading, profile, studentDocs }}>
			{children}
		</ProfileContext.Provider>
	);
};

export const useProfile = () => useContext(ProfileContext);

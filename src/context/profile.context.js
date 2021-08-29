import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../misc/firebase";

const ProfileContext = createContext();
const usersRef = firestore.collection("users");

export const ProfileProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [profile, setProfile] = useState({});
	const [studentDocs, setStudentDocs] = useState({
		isLoading: true,
		data: null,
	});

	useEffect(() => {
		let unSubUserDoc = () => {};
		let unSubStudentDoc = () => {};

		const unSubAuth = auth.onAuthStateChanged((authObj) => {
			if (authObj && auth.currentUser) {
				unSubUserDoc = usersRef.doc(authObj.uid).onSnapshot((docSnapshot) => {
					if (!docSnapshot.exists || !docSnapshot.data()) {
						setProfile(null);
					} else {
						const { ...docData } = docSnapshot.data();

						setProfile({ ...docData });

						if (!docData.student_of) {
							unSubStudentDoc = usersRef
								.where("student_of", "==", `${authObj.uid}`)
								.onSnapshot((studentDocSnapshot) => {
									const data = studentDocSnapshot.docs.map((student) =>
										student.data()
									);

									setStudentDocs({
										isLoading: false,
										data,
									});
								});
						}
					}
				});
				setIsLoading(false);
			} else {
				setProfile(null);
				setIsLoading(false);
			}
		});

		return () => {
			unSubAuth();
			unSubUserDoc();
			unSubStudentDoc();
		};
	}, []);

	return (
		<ProfileContext.Provider
			value={{ profile: { isLoading, profile }, studentDocs }}
		>
			{children}
		</ProfileContext.Provider>
	);
};

export const useProfile = () => useContext(ProfileContext);

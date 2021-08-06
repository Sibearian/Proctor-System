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
								const { profileURL: userAvatar, ...userData } = doc.data();
								setProfile({
									avatar: userAvatar,
									...userData,
								});

								const { student_list: studentList } = userData;

								if (studentList) {
									const studentArray = [];
									studentList.map(async (student) => {
										firestore
											.collection("users")
											.doc(student)
											.get()
											.then((studentDoc) => {
												const { profileURL: avatar, ...data } =
													studentDoc.data();
												studentArray.push({
													avatar,
													...data,
												});
											});
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
		<ProfileContext.Provider
			value={{ profile: { isLoading, profile }, studentDocs }}
		>
			{children}
		</ProfileContext.Provider>
	);
};

export const useProfile = () => useContext(ProfileContext);

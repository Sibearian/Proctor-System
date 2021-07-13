import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "rsuite";
import { auth, firestore } from "../misc/firebase";

const usersRef = firestore.collection("users");
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged(async (authObj) => {
			if (authObj) {
				await usersRef
					.where("uid", "==", authObj.uid)
					.get()
					.then((snapShot) => {
						snapShot.forEach((user) => {
							setProfile(user.data());
						});
					})
					.catch((error) => Alert.error(error.message, 4000));
			} else {
				setProfile(null);
			}
		});
	}, []);

	return (
		<ProfileContext.Provider value={false}>{children}</ProfileContext.Provider>
	);
};

export const useProfile = () => useContext(ProfileContext);

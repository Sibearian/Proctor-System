import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "rsuite";
import { auth, firestore } from "../misc/firebase";

const usersRef = firestore.collection("users");
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
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
          setIsLoading(false)
			} else {
				setProfile(null);
        setIsLoading(false)
			}
		});
	}, []);

	return (
		<ProfileContext.Provider value={{isLoading, profile}}>{children}</ProfileContext.Provider>
	);
};

export const useProfile = () => useContext(ProfileContext);

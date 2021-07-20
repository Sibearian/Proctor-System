import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "rsuite";
import { auth, firestore } from "../misc/firebase";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [profile, setProfile] = useState({});

	useEffect(() => {
		const getUserDoc = async () => {
			auth.onAuthStateChanged(async (authObj) => {
				if (authObj && auth.currentUser) {
					firestore
						.collection("users")
						.doc(authObj.uid)
						.get()
						.then((user) => {
							const data = {
								...user.data(),
								uid: user.id,
							};
							setProfile(data);
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
		<ProfileContext.Provider value={{ isLoading, profile }}>
			{children}
		</ProfileContext.Provider>
	);
};

export const useProfile = () => useContext(ProfileContext);

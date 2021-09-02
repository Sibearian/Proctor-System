import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../misc/firebase";

const ProfileContext = createContext();
const usersRef = firestore.collection("users");

export const ProfileProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [profile, setProfile] = useState({});

	useEffect(() => {
		let unSubUserDoc = () => {};

		const unSubAuth = auth.onAuthStateChanged((authObj) => {
			if (authObj && auth.currentUser) {
				unSubUserDoc = usersRef.doc(authObj.uid).onSnapshot((docSnapshot) => {
					if (!docSnapshot.exists || !docSnapshot.data()) {
						setProfile(null);
					} else {
						setProfile({ ...docSnapshot.data(), uid : auth.currentUser.uid });
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
		};
	}, []);

	return (
		<ProfileContext.Provider value={{ isLoading, profile }}>
			{children}
		</ProfileContext.Provider>
	);
};

export const useProfile = () => useContext(ProfileContext);

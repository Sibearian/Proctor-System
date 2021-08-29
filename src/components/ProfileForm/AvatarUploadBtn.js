import React, { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { Alert, Button, Modal } from "rsuite";
import { useModalState } from "../../misc/custom-hooks";
import { auth, firestore, storage } from "../../misc/firebase";

const fileInputTypes = ".png, .jpeg, .jpg";
const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];

const isValidFile = (file) => acceptedFileTypes.includes(file.type);

const getBlob = async (canvas) => {
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (blob) {
				resolve(blob);
			} else {
				reject(new Error("File process error"));
			}
		});
	});
};

const AvatarUploadBtn = () => {
	const avatarEditorRef = useRef();
	const [img, setImg] = useState(null);
	const { isOpen, open, close } = useModalState();
	const [isLoading, setIsLoading] = useState(false);

	const onFileInputChange = (ev) => {
		const currFiles = ev.target.files;

		if (currFiles.length === 1) {
			const file = currFiles[0];

			if (isValidFile(file) && file.size < 2 ** 20 * 5) {
				setImg(file);
				open();
			} else {
				Alert.warning(
					file.size > 2 ** 20 * 5
						? "Image limit execeds 5MB"
						: `Wrong file type ${file.type}`,
					4000
				);
			}
		}
	};

	const onUploadClick = async () => {
		const canvas = avatarEditorRef.current.getImageScaledToCanvas();

		setIsLoading(true);

		try {
			const UID = auth.currentUser.uid;
			const blob = await getBlob(canvas);

			const avatarFileRef = storage.ref(`/profile/${UID}`).child("avatar");

			const uploadAvatarResult = await avatarFileRef.put(blob, {
				cacheControl: `public, max-age=${3600 * 24 * 3}`,
			});

			const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

			firestore.collection("users").doc(UID).update({ avatar: downloadUrl });

			setIsLoading(false);
			Alert.info("Avatar has been uploaded", 4000);
		} catch (error) {
			setIsLoading(false);
			Alert.error(error.message, 4000);
		}
	};

	return (
		<>
			<label htmlFor="avatar-upload">
				Select new avatar
				<input
					accept={fileInputTypes}
					id="avatar-upload"
					type="file"
					onChange={onFileInputChange}
				/>
			</label>
			<Modal show={isOpen} onHide={close}>
				<Modal.Header>
					<Modal.Title>Change your avatar</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<>
						{img && (
							<AvatarEditor
								ref={avatarEditorRef}
								image={img}
								width={200}
								height={200}
								border={10}
								borderRadius={100}
								rotate={0}
							/>
						)}
					</>
				</Modal.Body>
				<Modal.Footer>
					<Button
						block
						appearance="ghost"
						onClick={onUploadClick}
						disabled={isLoading}
					>
						Upload new avatar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AvatarUploadBtn;

import React from "react";
import { Avatar, Modal, Panel } from "rsuite";

const StudentModal = ({ student, close }) => {
	return (
		<Modal show={!!student} onHide={close}>
			<Modal.Header>
				<Modal.Title>{student.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Panel>
					<Avatar src={student.avatar} />
					<p>
						<small>Age : </small> {student.age}
					</p>
					<p>
						<small>Blood Group : </small> {student.blood_group}
					</p>
					<p>
						<small>E-mail : </small> {student.email}
					</p>
					<p>
						<small>Registration Number : </small> {student.registration_number}
					</p>
					<p>
						<small>Semester : </small> {student.semester}
					</p>
				</Panel>
			</Modal.Body>
		</Modal>
	);
};

export default StudentModal;

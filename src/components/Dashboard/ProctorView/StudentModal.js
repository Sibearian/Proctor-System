import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Panel } from "rsuite";

const StudentModal = ({ student, close }) => {
	return (
		<Modal show={!!student} onHide={close}>
			<Modal.Header>
				<Modal.Title>
					<Button
						appearance="link"
						componentClass={Link}
						size="sm"
						to={`/student/${student.uid}`}
					>
						<h4>{student.name}</h4>
					</Button>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Panel shaded bordered bodyFill style={{ display: "inline-block" }}>
					<img
						alt={student.name}
						src={student.avatar}
						height={260}
						width={260}
					/>
					<Panel>
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
							<small>Registration Number : </small>{" "}
							{student.registration_number}
						</p>
						<p>
							<small>Semester : </small> {student.semester}
						</p>
					</Panel>
				</Panel>
			</Modal.Body>
		</Modal>
	);
};

export default StudentModal;

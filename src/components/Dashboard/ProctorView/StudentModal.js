import React from "react";
import { Link } from "react-router-dom";
import { Button, FlexboxGrid, Modal, Panel, PanelGroup } from "rsuite";

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
				<Panel>
					<img
						alt={student.name}
						src={student.avatar}
						height={260}
						width={260}
					/>
					<PanelGroup accordion bordered>
						<Panel header="Student Details" bodyFill bordered>
							<div className="mb-3 ml-3">
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
									<small>Registration Number : </small>
									{student.registration_number}
								</p>
								<p>
									<small>Semester : </small> {student.semester}
								</p>
							</div>
						</Panel>
						<Panel header="Additional Details" bodyFill bordered>
							<div className="ml-3 mb-3">
								<FlexboxGrid justify="space-around" className="mt-3">
									<FlexboxGrid.Item>
										<h6>Father</h6>
										<p>
											<small>Name : </small> {student.father_name}
										</p>
										<p>
											<small>Number : </small> {student.father_number}
										</p>
									</FlexboxGrid.Item>
									<FlexboxGrid.Item>
										<h6>Mother</h6>
										<p>
											<small>Name : </small> {student.mother_name}
										</p>
										<p>
											<small>Number : </small> {student.mother_number}
										</p>
									</FlexboxGrid.Item>
								</FlexboxGrid>
								<hr/>
								<p className="mt-3 ml-3">
									<small>Address : </small> {student.address}
								</p>
							</div>
						</Panel>
					</PanelGroup>
				</Panel>
			</Modal.Body>
		</Modal>
	);
};

export default StudentModal;

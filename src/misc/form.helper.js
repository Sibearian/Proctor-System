import { Schema } from "rsuite";

const { StringType, NumberType } = Schema.Types;

export const INITIAL_VALUE = {
	name: "",
	age: "",
	branch: "",
	blood_group: "",
	semester: "1",
	registration_number: "",
	father_name: "",
	mother_name: "",
	father_number: "",
	mother_number: "",
	address: "",
	number: "",
};

export const model = Schema.Model({
	name: StringType("Plese enter your name").isRequired("Required"),
	age: NumberType("Please enter a valid age")
		.isInteger()
		.range(13, 100)
		.isRequired("Required"),
	branch: StringType().isRequired("Required"),
	blood_group: StringType().isRequired("Required"),
	semester: NumberType().isRequired("Required").range(1, 6),
	registration_number: StringType()
		.isRequired("Required")
		.rangeLength(10, 10, "Registration number Should contain 10 characters"),
});

export const departments = [
	{
		label: "Computer Science",
		value: "CS",
	},
];

export const semesters = [
	{
		label: "1st Semester",
		value: 1,
	},
	{
		label: "2nd Semester",
		value: 2,
	},
	{
		label: "3rd Semester",
		value: 3,
	},
	{
		label: "4th Semester",
		value: 4,
	},
	{
		label: "5th Semester",
		value: 5,
	},
	{
		label: "6th Semester",
		value: 6,
	},
];

const theoryAssesment = {
	internals: {
		max: 20,
	},
	assignment: {
		max: 5,
	},
	finals: {
		max: 100,
	},
	isLab: false,
};

const practicalAssesment = {
	internals: {
		max: 10,
	},
	assignment: {
		max: 15,
	},
	finals: {
		max: 50,
	},
	isLab: true,
};

export const subjects = {
	CS: {
		1: {
			"Engineering Mathematics – I": theoryAssesment,
			"Applied Science": theoryAssesment,
			"Concepts of Electrical	And Electronics Engineering": theoryAssesment,
			"Applied Science Lab": practicalAssesment,
			"Basic Electronics Lab": practicalAssesment,
			"Basic Computer Skills Lab": practicalAssesment,
		},
		2: {
			"Engineering Mathematics – II": theoryAssesment,
			"Communication Skills in English": theoryAssesment,
			"Digital and Computer Fundamentals": theoryAssesment,
			"Digital Electronics Lab": practicalAssesment,
			"Basic Web Design Lab": practicalAssesment,
			"Multimedia Lab": practicalAssesment,
		},
		3: {
			"Programming with C": theoryAssesment,
			"Computer Organization": theoryAssesment,
			"Database Management Systems": theoryAssesment,
			"Computer Network": theoryAssesment,
			"Programming with C lab": practicalAssesment,
			"DBMS and GUI lab": practicalAssesment,
			"Network Administration lab": practicalAssesment,
			"Kannada - I": practicalAssesment,
		},
		4: {
			"Data Structures using C": theoryAssesment,
			"OOP With Java": theoryAssesment,
			"Operating System": theoryAssesment,
			"Professional Ethics & Indian Constitution": theoryAssesment,
			"Data Structures Lab": practicalAssesment,
			"OOP with Java Lab": practicalAssesment,
			"Linux Lab": practicalAssesment,
			"Kannada - II": practicalAssesment,
		},
		5: {
			"Software Engineering": theoryAssesment,
			"Web Programming": theoryAssesment,
			"Design and Analysis of Algorithms": theoryAssesment,
			"Green Computing": theoryAssesment,
			"Web Programming Lab": practicalAssesment,
			"Design and Analysis of Algorithms Lab": practicalAssesment,
			"Professional Practices": practicalAssesment,
			"Project Work Phase-I": practicalAssesment,
		},
		6: {
			"Software Testing": theoryAssesment,
			"Network Security & Management": theoryAssesment,
			"Elective": theoryAssesment,
			"Software Testing Lab": practicalAssesment,
			"Network Security Lab": practicalAssesment,
			"Inplant Training": practicalAssesment,
			"Project Work- II": practicalAssesment,
		},
	},
};

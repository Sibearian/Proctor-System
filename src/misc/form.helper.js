import { Schema } from "rsuite";

const { StringType, NumberType } = Schema.Types;

export const INITIAL_VALUE = {
	name: "",
	age: "",
	branch: "",
	blood_group: "",
	semester: 1,
	registration_number: "",
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
	{
		label: "Civil Engeneering",
		value: "CE",
	},
	{
		label: "Electrial & Electronic",
		value: "EE",
	},
	{
		label: "Electrical & Communications",
		value: "EC",
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

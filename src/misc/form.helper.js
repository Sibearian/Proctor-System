import { Schema } from "rsuite";

const { StringType, NumberType } = Schema.Types;

export const INITIAL_VALUE = {
	name: "",
	age: null,
	branch: "",
	blood_group: "",
	semester: 1,
	registration_number: "",
};

export const model = Schema.Model({
	name: StringType().isRequired("Required"),
	age: NumberType().isInteger().range(13, 100).isRequired("Required"),
	branch: StringType().isRequired("Required"),
	blood_group: StringType().isRequired("Required"),
	semester: NumberType().isRequired("Required").range(1, 6),
	registration_number: StringType().isRequired("Required"),
});

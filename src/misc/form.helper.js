import { Schema } from "rsuite";

const { StringType } = Schema.Types;

export const INITIAL_VALUE = {
	name: "",
	branch: "",
};

export const model = Schema.Model({
	name: StringType().isRequired("required"),
	branch: StringType().isRequired("tell me"),
});
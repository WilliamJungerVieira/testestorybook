import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik, useField } from "formik";
import * as Yup from "yup";
import "./App.css";
import Toast from "./components/toast/toast";
import Button from "./components/button/button";
import Badges from "./components/badges/badges";
import { InputGroupHorizontal, InputGroupVertical, MyCheckbox, InputSelect } from "./components/inputs/inputs";

const BUTTON_PROPS = [
	{
		id: 1,
		type: "success",
		className: "success",
		label: "Success",
	},
	{
		id: 2,
		type: "danger",
		className: "danger",
		label: "Danger",
	},
	{
		id: 3,
		type: "info",
		className: "info",
		label: "Info",
	},
	{
		id: 4,
		type: "warning",
		className: "warning",
		label: "Warning",
	},
];

const App = () => {
	const [list, setList] = useState([]);
	const [position, setPosition] = useState("Select Position");
	let [checkValue, setCheckValue] = useState(false);
	const [autoDeleteTime, setAutoDeleteTime] = useState(0);
	let toastProperties = null;

	const selectPosition = (e) => {
		setPosition(e.target.value);
		setList([]);
	};

	const showToast = (type) => {
		const id = Math.floor(Math.random() * 101 + 1);

		switch (type) {
			case "success":
				toastProperties = {
					id,
					title: "Success",
					description: "SUCCESS SUCCESS SUCCESS",
					color: "success",
					type: "flat",
					background: "highlight",
				};
				break;
			case "danger":
				toastProperties = {
					id,
					title: "Danger",
					description: "DANGER DANGER DANGER",
					color: "danger",
					type: "flat",
					background: "default",
				};
				break;
			case "info":
				toastProperties = {
					id,
					title: "Info",
					description: "INFO INFO INFO",
					color: "info",
					type: "toaster",
					background: "default",
				};
				break;
			case "warning":
				toastProperties = {
					id,
					title: "Warning",
					description: "WARNING WARNING WARNING",
					color: "warning",
					type: "toaster",
					background: "default",
				};
				break;

			default:
				setList([]);
		}

		setList([...list, toastProperties]);
	};

	const onCheckBoxChange = () => {
		checkValue = !checkValue;
		setCheckValue(checkValue);
		setList([]);
	};

	const onInputChange = (e) => {
		const time = parseInt(e.target.value, 10);
		setAutoDeleteTime(time);
	};

	const validationSchema = () => {
		return Yup.object({
			firstName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
			lastName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
			email: Yup.string().email("Invalid email address").required("Required"),
			acceptedTerms: Yup.boolean().required("Required").oneOf([true], "You must accept the terms and conditions."),
			jobType: Yup.string().oneOf(["designer", "development", "product", "other"], "Invalid Job Type").required("Required"),
		});
	};

	const initialValues = () => {
		return {
			firstName: "",
			lastName: "",
			email: "",
			acceptedTerms: false, // added for our checkbox
			jobType: "", // added for our select
		};
	};

	const onSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			alert(JSON.stringify(values, null, 2));
			setSubmitting(false);
		}, 400);
	};

	return (
		<div className="app">
			<div className="app-header">
				<h1>Badges</h1>
				<div>
					<Badges color="default">Status 1</Badges>
					<Badges color="success">Status 2</Badges>
					<Badges color="new">Status 3</Badges>
					<Badges color="danger">Status 4</Badges>
					<Badges color="warning">Status 5</Badges>
					<h1>Badges Disabled</h1>
					<Badges color="default" state="disabled">
						Status 1
					</Badges>
					<Badges color="success" state="disabled">
						Status 2
					</Badges>
					<Badges color="new" state="disabled">
						Status 3
					</Badges>
					<Badges color="danger" state="disabled">
						Status 4
					</Badges>
					<Badges color="warning" state="disabled">
						Status 5
					</Badges>
					<h1>Button</h1>
					<Badges color="default" type="times">
						Status 7
					</Badges>
					<Badges color="success" type="times">
						Status 8
					</Badges>
					<Badges color="new" type="times">
						Status 9
					</Badges>
					<Badges color="danger" type="times">
						Status 10
					</Badges>
					<Badges color="warning" type="times">
						Status 11
					</Badges>
					<h1>Button Disabled</h1>
					<Badges color="default" type="times" state="disabled">
						Status 7
					</Badges>
					<Badges color="success" type="times" state="disabled">
						Status 8
					</Badges>
					<Badges color="new" type="times" state="disabled">
						Status 9
					</Badges>
					<Badges color="danger" type="times" state="disabled">
						Status 10
					</Badges>
					<Badges color="warning" type="times" state="disabled">
						Status 11
					</Badges>
				</div>
				<h1>Toasts</h1>
				<div className="toast-buttons">
					{BUTTON_PROPS.map((e) => (
						<Button key={e.id} label={e.label} handleClick={() => showToast(e.type)} />
					))}
				</div>
				<div className="select">
					<input id="auto" type="checkbox" name="checkbox" value={checkValue} onChange={onCheckBoxChange} />
					<label htmlFor="auto">Auto Dismiss</label>
				</div>
				<div className="select">
					<input disabled={`${!checkValue ? true : ""}`} type="text" name="checkbox" autoComplete="false" onChange={onInputChange} />
				</div>
				<div className="select">
					<select name="position" value={position} onChange={selectPosition} className="position-select">
						<option>Select Position</option>
						<option value="top-right">Top Right</option>
						<option value="top-left">Top Left</option>
						<option value="bottom-left">Bottom Left</option>
						<option value="bottom-right">Bottom Right</option>
					</select>
				</div>
			</div>

			<Toast toastList={list} position={position} autoDelete={checkValue} autoDeleteTime={autoDeleteTime} />

			<h1>Form Groups</h1>

			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				<Form>
					<InputGroupHorizontal label="First Name" name="firstName" type="text" placeholder="Placeholder" size="sm" />
					{/* <InputGroupHorizontal label="Last Name" name="lastName" type="text" placeholder="Placeholder" size="sm" /> */}
					{/* <InputGroupHorizontal label="Email" name="email" type="email" placeholder="Placeholder" size="sm" /> */}
					<InputGroupVertical label="Email" name="email" type="email" placeholder="Placeholder" size="sm" />
					<InputGroupVertical label="Last Name teste" name="lastName" type="text" placeholder="Placeholder" size="sm" />

					<InputSelect label="Job Type" name="jobType" values={["Select a job type", "designer", "development", "product", "other"]} />

					<MyCheckbox name="acceptedTerms">I accept the terms and conditions</MyCheckbox>

					<button type="submit">Submit</button>
				</Form>
			</Formik>
		</div>
	);
};

export default App;

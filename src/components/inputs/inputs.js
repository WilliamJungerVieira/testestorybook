import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik, useField } from "formik";
import * as Yup from "yup";
import "./inputs.scss";

export const InputGroupHorizontal = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div className={`form__group--horizontal`}>
			<label className={`form__label`} htmlFor={props.id || props.name}>
				{label}
			</label>
			<input className={`form__input--default`} {...field} {...props} />
			{meta.touched && meta.error ? <small className="error">{meta.error}</small> : null}
		</div>
	);
};

export const InputGroupVertical = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div className={`form__group--vertical`}>
			<label className={`form__label--vertical`} htmlFor={props.id || props.name}>
				{label}
			</label>
			<div class={`form__input--error`}>
				<input className={`form__input--default`} {...field} {...props} />
				{meta.touched && meta.error ? <small className="error">{meta.error}</small> : null}
			</div>
		</div>
	);
};

export const InputSelect = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	console.log(props.values);
	return (
		<div className={`form__group`}>
			<label className={`form__label`} htmlFor={props.id || props.name}>
				{label}
			</label>
			<select className={`form__input--select`} {...field} {...props}>
				{props.values.map((item, index) => {
					return <option value={item}>{item}</option>;
				})}
			</select>
			{meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
		</div>
	);
};

export const MyCheckbox = ({ children, ...props }) => {
	const [field, meta] = useField({ ...props, type: "checkbox" });
	return (
		<div>
			<label className="checkbox-input">
				<input type="checkbox" {...field} {...props} />
				{children}
			</label>
			{meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
		</div>
	);
};

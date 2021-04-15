import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik, useField } from "formik";
import * as Yup from "yup";
import "./inputs.scss";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const InputGroup = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	var text = <input className={`form__input--default`} {...field} {...props} />;
	var radio = (
		<>
			<div>
				<input type="radio" value={props.data[0].value} className={`form__input--default`} {...field} {...props} />
				<label>{props.data[0].label}</label>
			</div>
			<div>
				<input type="radio" value={props.data[1].value} className={`form__input--default`} {...field} {...props} />
				<label>{props.data[1].label}</label>
			</div>
		</>
	);

	var select = (
		<div>
			<select className={`form__input--select`} {...field} {...props}>
				{props.data.map((item, index) => {
					return <option value={item.value}>{item.text}</option>;
				})}
			</select>
		</div>
	);

	return (
		<div className={`form__group--${props.direction}}`}>
			<label className={`form__label--${props.direction}`} htmlFor={props.id || props.name}>
				{label} {props.icon ? <FontAwesomeIcon icon={faTimes} /> : ""}
			</label>
			{props.direction === "vertical" ? (
				<div class={`form__input--error`}>
					{props.type === "text" ? text : select}
					{meta.touched && meta.error ? <small className="error">{meta.error}</small> : null}
				</div>
			) : (
				<>
					{props.type === "text" ? text : select}
					{meta.touched && meta.error ? <small className="error">{meta.error}</small> : null}
				</>
			)}
		</div>
	);
};

// export const InputGroupHorizontal = ({ label, ...props }) => {
// 	const [field, meta] = useField(props);
// 	return (
// 		<div className={`form__group--horizontal`}>
// 			<label className={`form__label`} htmlFor={props.id || props.name}>
// 				{label}
// 			</label>
// 			<input className={`form__input--default`} {...field} {...props} />
// 			{meta.touched && meta.error ? <small className="error">{meta.error}</small> : null}
// 		</div>
// 	);
// };

// export const InputGroupVertical = ({ label, ...props }) => {
// 	const [field, meta] = useField(props);
// 	return (
// 		<div className={`form__group--vertical`}>
// 			<label className={`form__label--vertical`} htmlFor={props.id || props.name}>
// 				{label}
// 			</label>
// 			<div class={`form__input--error`}>
// 				<input className={`form__input--default`} {...field} {...props} />
// 				{meta.touched && meta.error ? <small className="error">{meta.error}</small> : null}
// 			</div>
// 		</div>
// 	);
// };

// export const InputSelect = ({ label, ...props }) => {
// 	const [field, meta] = useField(props);
// 	console.log(props.values);
// 	return (
// 		<div className={`form__group`}>
// 			<label className={`form__label`} htmlFor={props.id || props.name}>
// 				{label}
// 			</label>
// 			<select className={`form__input--select`} {...field} {...props}>
// 				{props.values.map((item, index) => {
// 					return <option value={item}>{item}</option>;
// 				})}
// 			</select>
// 			{meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
// 		</div>
// 	);
// };

// export const MyCheckbox = ({ children, ...props }) => {
// 	const [field, meta] = useField({ ...props, type: "checkbox" });
// 	return (
// 		<div>
// 			<label className="checkbox-input">
// 				<input type="checkbox" {...field} {...props} />
// 				{children}
// 			</label>
// 			{meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
// 		</div>
// 	);
// };

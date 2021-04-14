import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./toast.scss";

const Toast = (props) => {
	const { toastList, position, autoDelete, autoDeleteTime } = props;
	const [list, setList] = useState(toastList);

	useEffect(() => {
		setList([...toastList]);
	}, [toastList]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (autoDelete && toastList.length && list.length) {
				deleteToast(toastList[0].id);
			}
		}, autoDeleteTime);

		return () => {
			clearInterval(interval);
		};
	}, [toastList, autoDelete, autoDeleteTime, list]);

	const deleteToast = (id) => {
		const listItemIndex = list.findIndex((e) => e.id === id);
		const toastListItem = toastList.findIndex((e) => e.id === id);
		list.splice(listItemIndex, 1);
		toastList.splice(toastListItem, 1);
		setList([...list]);
	};

	return (
		<div className={`notification__container ${position}`}>
			{list.map((toast, i) => (
				<div key={i} className={`notification--${toast.type} ${toast.background}  ${position}`}>
					<div className="notification__title">
						<h3 className={`notification__title--${toast.color}`}>{toast.title}</h3>
						<button onClick={() => deleteToast(toast.id)}>
							<FontAwesomeIcon icon={faTimes} />
						</button>
					</div>
					<p className="notification__message">{toast.description}</p>
				</div>
			))}
		</div>
	);
};

Toast.propTypes = {
	toastList: PropTypes.array.isRequired,
	position: PropTypes.string,
	autoDelete: PropTypes.bool,
	autoDeleteTime: PropTypes.number,
};

export default Toast;

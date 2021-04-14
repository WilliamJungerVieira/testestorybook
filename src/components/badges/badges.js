import React from "react";

import "./badges.scss";
import { faTimes, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Badges({ children, color, type, state }) {
	return (
		<div className={`badge ${state === 'disabled' ? `badge--${color}--disabled`:  `badge--${color}`}`} >
			{type === "times" ? (
				<button className={`btn  ${state === 'disabled' ? `btn--${color}--disabled`: `btn--${color}`}`}>
					<FontAwesomeIcon icon={faTimes} />
				</button>
			) : (
				<FontAwesomeIcon className={`icon  ${state === 'disabled' ? `icon--${color}--disabled` : `icon--${color}`} `} icon={faCircle} />
			)}
			{children}
		</div>
	);
}

export default Badges;

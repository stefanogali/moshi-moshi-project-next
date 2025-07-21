"use-client";

import styles from "./Spinner.module.scss";

export default function Spinner({isContactFormLoader}) {
	return (
		<div className={`${styles["spinner-container"]} ${isContactFormLoader ? ` ${styles["container-smaller"]}` : ""}`}>
			<div className={styles["loading-spinner"]}></div>
		</div>
	);
}

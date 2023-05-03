import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "./Navigation.module.scss";

export default function Navigation() {
	return (
		<Row>
			<Col>
				<nav>
					<ul className={styles["nav-list"]}>
						<li>Products</li>
						<li>About</li>
						<li>Contacts</li>
					</ul>
				</nav>
			</Col>
		</Row>
	);
}

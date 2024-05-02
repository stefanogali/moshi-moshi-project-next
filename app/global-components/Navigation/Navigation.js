import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ScrollTo from "../Scrollto/ScrollTo";

import styles from "./Navigation.module.scss";

export default function Navigation() {
	return (
		<Row>
			<Col>
				<nav>
					<ul className={styles["nav-list"]}>
						<ScrollTo toId="products" duration={500} className={styles["navigation-list"]}>
							Products
						</ScrollTo>
						<ScrollTo toId="about" duration={500} detractFromTop={0} className={styles["navigation-list"]}>
							About
						</ScrollTo>
						<ScrollTo toId="contacts" duration={500} className={styles["navigation-list"]}>
							Contacts
						</ScrollTo>
					</ul>
				</nav>
			</Col>
		</Row>
	);
}

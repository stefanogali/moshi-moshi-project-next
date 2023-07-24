"use client";

import {useState} from "react";
import {tshirtSpecs} from "@/helper-functions/tshirt-specs";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Card.module.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Card({id, name, productImage, productShowImage, index, description, availability, material, shortDescription, price, isActive}) {
	const [showModal, setShowModal] = useState(false);
	const [isImageExpanded, setIsImageExpanded] = useState(false);
	const [isTableVisible, setIsTableVisible] = useState(true);
	const [selectedSize, setSelectedSize] = useState(availability[availability.findIndex((element) => element.availability >= 1)]?.size);

	const productClickHandler = () => {
		setShowModal(true);
	};

	const handleClose = () => {
		setShowModal(false);
		setIsImageExpanded(false);
		setIsTableVisible(true);
	};

	return (
		<Col sm={6} md={4} className={styles["products-container"]}>
			<div className={styles["product-container"]}>
				<div className={styles["image-container"]}>
					<img className={styles["product-image"]} src={`./product-images/${productImage}`} onClick={productClickHandler} />
					<Modal show={showModal} fullscreen="sm-down" onHide={handleClose} className={styles["modal-products"]}>
						<Modal.Header closeButton>
							<Modal.Title>{name}</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Row>
								<Col
									lg={isImageExpanded ? 12 : 4}
									className={styles["expandable-column"]}
									onTransitionEnd={(e) => {
										if (e.propertyName === "width" && isImageExpanded) {
											setIsTableVisible(false);
										} else {
											setIsTableVisible(true);
										}
									}}
								>
									<div className={styles["modal-product-image-container"]}>
										<img className={styles["modal-product-image"]} src={`./product-images/${productShowImage}`} />
										<img className={styles["expand-reduce-image"]} src={`./${isImageExpanded ? "collapse-arrow.svg" : "expand-arrow.svg"}`} onClick={() => setIsImageExpanded((prev) => !prev)} />
									</div>
								</Col>
								{isTableVisible && !isImageExpanded && (
									<Col lg={8} className={styles["expandable-column"]}>
										<div className={styles["modal-table-container"]}>
											<table>
												<tbody>
													<tr>
														<th></th>
														<th className={styles["modal-table-header"]}>Chest Width</th>
														<th className={styles["modal-table-header"]}>Shirt Length</th>
														<th className={styles["modal-table-header"]}>Sleeve Length</th>
													</tr>
													<tr>
														<th>{tshirtSpecs[index].specs[0].size}</th>
														<td>{tshirtSpecs[index].specs[0].chestWidth}</td>
														<td>{tshirtSpecs[index].specs[0].shirtLength}</td>
														<td>{tshirtSpecs[index].specs[0].sleeveLength}</td>
													</tr>
													<tr>
														<th>{tshirtSpecs[index].specs[1].size}</th>
														<td>{tshirtSpecs[index].specs[1].chestWidth}</td>
														<td>{tshirtSpecs[index].specs[1].shirtLength}</td>
														<td>{tshirtSpecs[index].specs[1].sleeveLength}</td>
													</tr>
													<tr>
														<th>{tshirtSpecs[index].specs[2].size}</th>
														<td>{tshirtSpecs[index].specs[2].chestWidth}</td>
														<td>{tshirtSpecs[index].specs[2].shirtLength}</td>
														<td>{tshirtSpecs[index].specs[2].sleeveLength}</td>
													</tr>
												</tbody>
											</table>
										</div>
										<p className={styles["modal-product-definition"]}>
											<b>Material: </b>
											{material}
										</p>
									</Col>
								)}
							</Row>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
				<div className={styles["product-specs"]}>
					<h4 className={styles["product-name"]}>{name}</h4>
					<h5 className={styles["product-description"]}>{description}</h5>
					<p className={styles["product-definition"]}>
						{material} {shortDescription}
					</p>
					{isActive ? (
						<>
							<div className={styles["product-footer"]}>
								<div className={styles["select-container"]}>
									<Form.Select
										size="sm"
										aria-label="Select t-shirt size"
										onChange={(e) => {
											setSelectedSize(e.target.value);
										}}
										className={styles["size-select"]}
									>
										{availability.map((item, index) => {
											if (item.availability) {
												return (
													<option key={index} value={item.size}>
														{item.size}
													</option>
												);
											}
										})}
									</Form.Select>
								</div>
								<div className={styles["price"]}>
									<h4 className={styles["price-amount"]}>£{price}</h4>
								</div>
							</div>
						</>
					) : (
						<p className={styles["outstock-text"]}>Temporarily out stock...back soon!!</p>
					)}
					<AddToCartBtn isActive={isActive} productImage={productImage} id={id} selectedSize={selectedSize} price={price} name={name} />
				</div>
			</div>
		</Col>
	);
}

import ContactForm from "./ContactForm";

import "@testing-library/jest-dom";
import {render, screen, fireEvent} from "@testing-library/react";

let button, inputForName, inputForEmail, inputForTextarea;

describe("Contact form", () => {
	beforeEach(() => {
		// Mock the grecaptcha object
		global.grecaptcha = {
			ready: jest.fn((callback) => callback()),
			execute: jest.fn(() => Promise.resolve("recaptcha-token")),
		};
		render(<ContactForm />);

		button = screen.getByRole("button", {name: /Send it/});
		inputForName = screen.getByPlaceholderText("Your name");
		inputForEmail = screen.getByPlaceholderText("Your email");
		inputForTextarea = screen.getByPlaceholderText("Your message");
	});
	it("renders on page", () => {
		// check if all components are rendered

		expect(button).toBeInTheDocument();
		expect(inputForName.value).toBe("");
		expect(inputForEmail.value).toBe("");
		expect(inputForTextarea.value).toBe("");
	});
	it("display errors if inputs are not correct", () => {
		// check if all components are rendered
		expect(inputForName).toBeInTheDocument();
		expect(inputForEmail).toBeInTheDocument();
		expect(inputForTextarea).toBeInTheDocument();

		fireEvent.change(inputForName, {target: {value: "a"}});
		fireEvent.change(inputForEmail, {target: {value: "email"}});
		fireEvent.change(inputForTextarea, {target: {value: "rer"}});

		fireEvent.click(button);

		const errorMessageName = screen.getByText(/Invalid Name/);
		const errorMessageEmail = screen.getByText(/Invalid Email/);
		const errorMessageTextarea = screen.getByText(/Message must be between 4 and 600 characters/);

		expect(errorMessageName).toBeInTheDocument();
		expect(errorMessageEmail).toBeInTheDocument();
		expect(errorMessageTextarea).toBeInTheDocument();
	});
	it("display message after correctly submitted", async () => {
		// Mock the fetch function
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({status: 200}),
			}),
		);

		fireEvent.change(inputForName, {target: {value: "Name"}});
		fireEvent.change(inputForEmail, {target: {value: "email@test.com"}});
		fireEvent.change(inputForTextarea, {target: {value: "Some valid message"}});

		fireEvent.click(button);

		const successMessage = await screen.findByText(/Thanks for submitting/);
		await expect(successMessage).toBeInTheDocument();
		expect(inputForName.value).toBe("");
		expect(inputForEmail.value).toBe("");
		expect(inputForTextarea.value).toBe("");
	});
	it("display message after something went wrong", async () => {
		// Mock the fetch function
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({status: 500}),
			}),
		);

		fireEvent.change(inputForName, {target: {value: "Name"}});
		fireEvent.change(inputForEmail, {target: {value: "email@test.com"}});
		fireEvent.change(inputForTextarea, {target: {value: "Some valid message"}});

		fireEvent.click(button);

		const unSuccessMessage = await screen.findByText(/Something went wrong/i);
		await expect(unSuccessMessage).toBeInTheDocument();
	});
});

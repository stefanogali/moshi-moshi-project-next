import ScrollTo from "./ScrollTo";

import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

import * as ScrollToModule from "../../../helper-functions/scrollTo";
import {useRouter, usePathname} from "next/navigation";

jest.mock("../../../helper-functions/scrollTo", () => ({
	scrollTo: jest.fn(),
}));

// Mock useRouter:
jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
	usePathname: jest.fn(),
}));

const idToScroll = "about";

describe("ScrollTo component", () => {
	it("calls the scrollTo function if on index page", () => {
		usePathname.mockImplementation(() => {
			return "/";
		});
		render(
			<ScrollTo toId={idToScroll} duration={1000} className="">
				Link
			</ScrollTo>,
		);
		const listItem = screen.getByRole("listitem");
		fireEvent.click(listItem);

		expect(ScrollToModule.scrollTo).toHaveBeenCalledWith({
			id: idToScroll,
			ref: undefined,
			duration: 1000,
		});
	});
	it("sends user back on index page if on a different page", () => {
		const pushMock = jest.fn();
		useRouter.mockImplementation(() => ({
			pathname: "/",
			push: pushMock,
		}));

		usePathname.mockImplementation(() => {
			return "/someurl";
		});

		render(
			<ScrollTo toId={idToScroll} duration={1000} className="">
				Link
			</ScrollTo>,
		);

		const listItem = screen.getByRole("listitem");
		fireEvent.click(listItem);

		expect(pushMock).toHaveBeenCalledWith(`/#${idToScroll}`);
	});
});

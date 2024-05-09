import {sumTotal, setCookie, getCookie} from "./helpers";

describe("sumTotal", () => {
	it("calculates the total sum correctly", () => {
		const arr = [{price: 10}, {price: 20}, {price: 30}];
		const result = sumTotal(arr);

		expect(result).toBe(60);
	});

	it("returns 0 for an empty array", () => {
		const arr = [];
		const result = sumTotal(arr);

		expect(result).toBe(0);
	});
});

Object.defineProperty(document, "cookie", {
	writable: true,
	value: "",
});

const cookieName = "testCookie";
const cookieValue = "testValue";
const expireDays = 1;

describe("setCookie", () => {
	it("sets the cookie", () => {
		setCookie(cookieName, cookieValue, expireDays);

		const date = new Date();
		date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
		const expires = "expires=" + date.toUTCString();

		expect(document.cookie).toEqual(cookieName + "=" + cookieValue + ";" + expires + ";path=/");
	});
});

describe("getCookie", () => {
	it("gets the cookie", () => {
		setCookie(cookieName, cookieValue, expireDays);

		let result = getCookie(cookieName);
		expect(result).toBe("testValue");
	});
});

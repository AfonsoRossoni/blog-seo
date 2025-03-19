import { render, screen, fireEvent } from "@testing-library/react";
import FontSizeHandler from "./index";

describe("FontSizeHandler Component", () => {
	beforeEach(() => {
		const root = document.documentElement;
		root.style.setProperty("--body-1", "16px");
	});

	afterEach(() => {
		const root = document.documentElement;
		root.style.removeProperty("--body-1");
	});

	it("renders two buttons", () => {
		render(<FontSizeHandler />);
		const increaseButton = screen.getByLabelText("Aumentar tamanho da fonte");
		const decreaseButton = screen.getByLabelText("Diminuir tamanho da fonte");

		expect(increaseButton).toBeInTheDocument();
		expect(decreaseButton).toBeInTheDocument();
	});

	it("increases font size when 'A +' button is clicked", () => {
		render(<FontSizeHandler />);
		const increaseButton = screen.getByLabelText("Aumentar tamanho da fonte");

		fireEvent.click(increaseButton);

		const root = document.documentElement;
		const computedStyle = getComputedStyle(root);
		expect(computedStyle.getPropertyValue("--body-1")).toBe("18px");
	});

	it("decreases font size when 'A -' button is clicked", () => {
		render(<FontSizeHandler />);
		const decreaseButton = screen.getByLabelText("Diminuir tamanho da fonte");

		fireEvent.click(decreaseButton);

		const root = document.documentElement;
		const computedStyle = getComputedStyle(root);
		expect(computedStyle.getPropertyValue("--body-1")).toBe("14px");
	});
});

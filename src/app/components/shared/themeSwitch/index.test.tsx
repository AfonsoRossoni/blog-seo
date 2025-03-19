import { render, screen, fireEvent } from "@testing-library/react";
import ThemeSwitch from "./index";

jest.mock("next/image", () => ({
	__esModule: true,
	default: (props: any) => <img {...props} />,
}));

describe("ThemeSwitch", () => {
	beforeEach(() => {
		document.documentElement.removeAttribute("data-theme");
	});

	it("renders the theme switch button", () => {
		render(<ThemeSwitch />);
		const button = screen.getByRole("button", { name: /trocar tema/i });
		expect(button).toBeInTheDocument();
	});

	it("renders with light theme icon initially", () => {
		render(<ThemeSwitch />);
		const image = screen.getByRole("img", { name: /trocar tema/i });
		expect(image).toHaveAttribute("src", "/dark.svg");
	});

	it("toggles theme when clicked", () => {
		render(<ThemeSwitch />);
		const button = screen.getByRole("button", { name: /trocar tema/i });

		expect(document.documentElement.getAttribute("data-theme")).toBeNull();

		fireEvent.click(button);
		expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

		fireEvent.click(button);
		expect(document.documentElement.getAttribute("data-theme")).toBe("light");
	});

	it("changes icon when theme is toggled", () => {
		render(<ThemeSwitch />);
		const button = screen.getByRole("button", { name: /trocar tema/i });
		const image = screen.getByRole("img", { name: /trocar tema/i });

		expect(image).toHaveAttribute("src", "/dark.svg");

		fireEvent.click(button);
		expect(image).toHaveAttribute("src", "/light.svg");

		fireEvent.click(button);
		expect(image).toHaveAttribute("src", "/dark.svg");
	});
});

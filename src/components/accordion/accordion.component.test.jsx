import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Accordion from "./accordion.component";

describe("Accordion", () => {

    it("Отрисовка элемента", () => {
        render(<Accordion />);
        const element = screen.getByTestId("accordion");
        expect(element).toBeInTheDocument();
    });

    it("Отрисовка названия", () => {
        render(<Accordion title={"Title"} />);
        const element = screen.getByText("Title");
        expect(element).toBeInTheDocument();
    });

    it("Отрисовка вложенного текста", () => {
        render(<Accordion>Test</Accordion>);
        const linkElement = screen.getByText("Test");
        expect(linkElement).toBeInTheDocument();
    });

    it("Класс темы по умолчанию на элементе", () => {
        render(<Accordion />);
        const element = screen.getByTestId("accordion");
        expect(element).toHaveClass("accordion_theme_text");
    });

    it("Добавленный extraClass на элементе", () => {
        render(<Accordion extraClass={"extraClass"} />);
        const element = screen.getByTestId("accordion");
        expect(element).toHaveClass("extraClass");
    });

});
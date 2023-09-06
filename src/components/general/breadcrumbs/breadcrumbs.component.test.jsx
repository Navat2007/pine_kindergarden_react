import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Breadcrumbs from "./breadcrumbs.component";

describe("Breadcrumbs", () => {

    it("Отрисовка элемента", () => {
        render(<Breadcrumbs />);
        const element = screen.getByTestId("breadcrumbs");
        expect(element).toBeInTheDocument();
    });

    it("Отрисовка span если нет ссылки", () => {
        render(<Breadcrumbs items={[{url: "", title: "TitleWithoutLink"}]} />);
        const element = screen.getByText("TitleWithoutLink");
        expect(element.tagName === "SPAN").toBeTruthy();
    });

    it("Отрисовка текста если нет ссылки", () => {
        render(<Breadcrumbs items={[{url: "", title: "TitleWithoutLink"}]} />);
        const element = screen.getByText("TitleWithoutLink");
        expect(element).toBeInTheDocument();
    });

});
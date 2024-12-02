import MyFooter from "../Components/MyFooter/MyFooter.component";

import { render, screen } from "@testing-library/react";

test("Renders a footer with 'EpiBooks copyright 2024'", () => {

    render(<MyFooter />);
    const footerElement = screen.getByText(/EpiBooks copyright 2024/i);

    expect(footerElement).toBeInTheDocument();

})
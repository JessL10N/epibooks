import Welcome from "../Components/Welcome/Welcome.component";

import { render, screen } from "@testing-library/react";

test("Renders an alert with 'Registrati per conoscere tutti i vantaggi del nostro servizio!' and a title with 'Benvenuti in Epibooks'", () => {

    render(<Welcome />);
    const headerElement = screen.getByText(/Benvenuti in EpiBooks/i);


    expect(headerElement).toBeInTheDocument();

})


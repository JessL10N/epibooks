import AllTheBooks from "../Components/AllTheBooks/AllTheBooks.component";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";

import bookStore from "../assets/scifi.json";

import {
  BookContext,
  IdSelectedContext,
  ThemeContext,
} from "../Contexts/context";

test("Renders allTheBooks", () => {
  render(
    <BrowserRouter>
      <BookContext.Provider value={{ bookList: bookStore }}>
        <IdSelectedContext.Provider value={{ asinSelected: "" }}>
          <AllTheBooks />
        </IdSelectedContext.Provider>
      </BookContext.Provider>
    </BrowserRouter>
  );

  const singleBooks = screen.getAllByTestId("singleBook");
  expect(singleBooks.length).toBe(bookStore.length);
});

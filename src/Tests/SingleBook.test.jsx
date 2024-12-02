import SingleBook from "../Components/SingleBook/SingleBook.component";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { IdSelectedContext } from "../Contexts/context";

const sampleBook = {
  asin: "1250082757",
  title: "Born of Vengeance: The League: Nemesis Rising",
  img: "https://images-na.ssl-images-amazon.com/images/I/91J28bj3PYL.jpg",
  price: 26.09,
  category: "scifi",
};

test("Render SingleBook", () => {
  render(
    <BrowserRouter>
        <IdSelectedContext.Provider value={{ idSelected: "" }}>
          <SingleBook book={sampleBook} asin={sampleBook.asin} />
        </IdSelectedContext.Provider>
    </BrowserRouter>
  );

  const singleBookItem = screen.getByTestId("singleBook");
  expect(singleBookItem).toBeInTheDocument();
});



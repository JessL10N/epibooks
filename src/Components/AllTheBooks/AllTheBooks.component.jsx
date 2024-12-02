import React, { useContext } from "react";

//bootstrap imports
import { Container, Row, Col } from "react-bootstrap"

//component imports
import SingleBook from "../SingleBook/SingleBook.component";
import CommentArea from "../CommentArea/CommentArea.component";

//utils imports
import {
  allUpperCase,
} from "../../utils/utils";

//context import
import {
  ThemeContext,
  BookContext,
  IdSelectedContext,
} from "../../Contexts/context";


const AllTheBooks = () => {
  const theme = useContext(ThemeContext);
  const { bookList } = useContext(BookContext);
  const {idSelected, setIdSelected} = useContext(IdSelectedContext);

  return (
    <Container data-bs-theme={theme}>
      <Row className="g-2">
        <Col>
          <h3>{allUpperCase("Lista dei libri")}</h3>
        </Col>
      </Row>

      <Row className="g-2">
      <Col sm={9}>
      <Row className="g-2">
        {bookList.map(({ asin, ...book }) => (
          <SingleBook book={book} asin={asin} key={asin} />
        ))}
        </Row>
        </Col>
        <Col sm={3}>
        <Container fluid className="h-100">
        <Row className="sticky-top" style={{top: "16px", border: "2px solid gainsboro", borderRadius: "10px"}}>
          <CommentArea asin={idSelected} />
        </Row>
        </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AllTheBooks;
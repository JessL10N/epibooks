import React, { useContext } from "react";
import { useParams } from "react-router";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";

//context import

import { BookContext } from "../../Contexts/context";

//utils import
import { findBook } from "../../utils/utils";

const BookDetails = () => {
  let { bookList } = useContext(BookContext);
  let { asin } = useParams();

  const currentBook = findBook(asin, bookList);

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row>
        <Col className="p-0">
          <Card style={{width:"55%"}}>
            <Card.Img style={{height:"500px"}} variant="top" src={currentBook.img} />
          </Card>
        </Col>
        <Col>
        <h2>{currentBook.title}</h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetails;

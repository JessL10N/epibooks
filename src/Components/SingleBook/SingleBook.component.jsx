import { useContext } from "react";
import { Link } from "react-router";
import { Col, Card, Row, Container, Button } from "react-bootstrap";

//style imports
import "./SingleBook.style.css";

//context import
import { IdSelectedContext } from "../../Contexts/context";


const SingleBook = (props) => {
  const { idSelected, setIdSelected } = useContext(
    IdSelectedContext
  );

  const isSelected = () => {
    return idSelected === props.asin;
  };

  const handleClick = () => {
    if (isSelected()) {
      setIdSelected(123456789);
    } else {
      setIdSelected(props.asin);
    }
  };

  return (
    <Col sm={4}>
      <Container className="Card-Container" data-testid="singleBook">
        <Row>
          <Col className="p-0">
            <Card
              className={`SingleBook ${
                isSelected() && "selected"
              }`}
              onClick={() => {
                handleClick();
              }}
            >
              <Card.Img
                variant="top"
                src={props.book.img}
              />
              <Button info className="card-button">
                <Link to={`/book/${props.asin}`} style={{color:"white", textDecoration:"none"}}>Vai al libro</Link></Button>
              <Card.Body>
                <Card.Text>{props.book.title}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default SingleBook;
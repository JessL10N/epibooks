import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./AddComment.style.css";

const AddComment = ({ asin, addNewComment }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const postData = async () => {
    const response = await fetch("https://striveschool-api.herokuapp.com/api/comments", {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE3YjZhODVkNzU4NzAwMTUzNzg2MzciLCJpYXQiOjE3MzIxMTQ0NjgsImV4cCI6MTczMzMyNDA2OH0.OhXlWPmSpnispbWjgn-hyy55xLFuvTKq91VbJnZ6UGY", // Assicurati di inserire un token valido
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        comment: comment,
        rate: rating,
        elementId: asin,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      addNewComment(data); // Passiamo il nuovo commento al componente padre
    } else {
      console.error("Errore nell'invio del commento:", response.status);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await postData(); // Invia il commento
    setComment(""); // Resetta il commento
    setRating(""); // Resetta il rating
  };

  return (
    <Card className="m-2 add-comment">
      <Card.Header as="h6">Aggiungi un commento</Card.Header>
      <Form onSubmit={handleSubmit}>
        <Container>
          <Row className="my-1 g-1">
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Cosa ne pensi di questo libro?"
                onChange={handleCommentChange}
                value={comment}
              />
            </Col>

            <Col sm={2}>
              <Form.Control
                type="text"
                placeholder="Rating (1-5)"
                onChange={handleRatingChange}
                value={rating}
              />
            </Col>
            <Col sm={3}>
              <Button type="submit">Aggiungi Commento</Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </Card>
  );
};

export default AddComment;

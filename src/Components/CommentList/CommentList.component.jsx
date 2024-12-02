import React, { useState } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";

//style import
import "./CommentList.style.css";

const CommentList = ({
  commentObj,
  onDelete,
  onUpdate,
  setEditingCommentId,
  isEditing,
}) => {
  const [updatedComment, setUpdatedComment] = useState(commentObj.comment);
  const [updatedRating, setUpdatedRating] = useState(commentObj.rate);

  const handleEditChange = (event) => {
    setUpdatedComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    setUpdatedRating(event.target.value);
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    const updatedCommentData = {
      comment: updatedComment,
      rate: updatedRating,
    };
    onUpdate(commentObj._id, updatedCommentData);
    setEditingCommentId(null);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  return (
    <Card className="m-2">
      <Card.Body className="comment-card-body">
        {isEditing ? (
          // Form di modifica del commento
          <Form onSubmit={handleSubmitEdit}>
            <Row className="mb-3">
              {/* Campo per il commento */}
              <Col sm={12}>
                <Form.Group controlId="formBasicComment">
                  <Form.Label>Modifica Commento</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={updatedComment}
                    onChange={handleEditChange}
                    rows={3}
                    style={{ marginBottom: "10px" }}
                  />
                </Form.Group>
              </Col>

              {/* Campo per il rating */}
              <Col sm={12}>
                <Form.Group controlId="formBasicRating">
                  <Form.Label>Modifica Rating</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max="5"
                    value={updatedRating}
                    onChange={handleRatingChange}
                    style={{ marginBottom: "10px" }}
                  />
                </Form.Group>
              </Col>

              {/* Bottoni Salva e Annulla */}
              <Col sm={12} className="d-flex justify-content-between mt-3">
                <Button variant="success" type="submit">
                  Salva
                </Button>
                <Button variant="secondary" onClick={handleCancelEdit}>
                  Annulla
                </Button>
              </Col>
            </Row>
          </Form>
        ) : (
          <>
            {/* Visualizzazione del commento e dell'autore */}

            <Card.Header className="mb-2 text-muted">
              {commentObj.author}
            </Card.Header>
            <Card.Text className="w-100 d-flex align-items-center justify-content-between column-gap-3">
              <span
                className="me-auto d-block"
                style={{ wordBreak: "break-word" }}
              >
                {commentObj.comment}
              </span>{" "}
              <span className="fs-6 d-block fw-bold badge pill bg-primary">
                {commentObj.rate + "/5"}
              </span>
            </Card.Text>
            <div>
              <Button variant="danger" onClick={() => onDelete(commentObj._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </Button>
              <Button
                variant="primary"
                onClick={() => setEditingCommentId(commentObj._id)}
                style={{ marginLeft: "10px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                </svg>
              </Button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default CommentList;

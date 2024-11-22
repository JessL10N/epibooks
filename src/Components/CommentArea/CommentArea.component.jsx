import React, { useState, useEffect } from "react";

// component imports
import CommentList from "../CommentList/CommentList.component";
import AddComment from "../AddComment/AddComment.component";

const CommentArea = ({ asin }) => {
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/books/${asin}/comments`, {
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE3YjZhODVkNzU4NzAwMTUzNzg2MzciLCJpYXQiOjE3MzIxMTQ0NjgsImV4cCI6MTczMzMyNDA2OH0.OhXlWPmSpnispbWjgn-hyy55xLFuvTKq91VbJnZ6UGY", // Assicurati di usare il tuo token valido
        },
      });
      if (!response.ok) {
        throw new Error("Errore nel recupero dei commenti.");
      }
      const data = await response.json();
      setCommentList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addNewComment = (newComment) => {
    setCommentList((prevComments) => [newComment, ...prevComments]);
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE3YjZhODVkNzU4NzAwMTUzNzg2MzciLCJpYXQiOjE3MzIxMTQ0NjgsImV4cCI6MTczMzMyNDA2OH0.OhXlWPmSpnispbWjgn-hyy55xLFuvTKq91VbJnZ6UGY",
        },
      });

      if (response.ok) {
        setCommentList((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
      } else {
        throw new Error("Errore nell'eliminazione del commento.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const updateComment = async (commentId, updatedComment) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE3YjZhODVkNzU4NzAwMTUzNzg2MzciLCJpYXQiOjE3MzIxMTQ0NjgsImV4cCI6MTczMzMyNDA2OH0.OhXlWPmSpnispbWjgn-hyy55xLFuvTKq91VbJnZ6UGY",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedComment),
      });

      if (response.ok) {
        const updatedCommentData = await response.json();
        setCommentList((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId ? { ...comment, ...updatedCommentData } : comment
          )
        );
      } else {
        throw new Error("Errore nell'aggiornamento del commento.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [asin]);

  if (loading) {
    return <div>Caricamento commenti...</div>;
  }

  if (error) {
    return <div>Errore nel caricamento dei commenti: {error}</div>;
  }

  return (
    <div className="comment-area">
      <h3 className="m-2">Recensioni {asin}</h3>
      {commentList.length === 0 ? (
        <p>Non ci sono ancora commenti per questo libro.</p>
      ) : (
        commentList.map((commentObj) => (
          <CommentList
            key={commentObj._id}
            commentObj={commentObj}
            onDelete={deleteComment}
            onUpdate={updateComment} // Passa la funzione di aggiornamento
          />
        ))
      )}
      <AddComment asin={asin} addNewComment={addNewComment} />
    </div>
  );
};

export default CommentArea;

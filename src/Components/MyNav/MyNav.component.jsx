import { useState, useContext } from "react";

import { Container, Nav, Navbar, Form, Button, ButtonGroup, ToggleButton} from "react-bootstrap";

//data import
import bookStore from "../../assets/scifi.json";

//context import
import {
  ThemeContext,
  BookContext,
} from "../../Contexts/context";

const MyNav = ({ toggleTheme }) => {
  const [checked, setChecked] = useState(false);

  const theme = useContext(ThemeContext);
  const { bookList, setBookList } = useContext(BookContext);

  const handleChange = (event) => {
    const filterResult = bookStore.filter((book) =>
      book.title
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setBookList(filterResult);
  };

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      data-bs-theme={theme}
    >
      <Container>
        <Navbar.Brand href="/">EpiBooks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex gap-2">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Browse</Nav.Link>
            <ButtonGroup>
              <ToggleButton
                id="toggle-check"
                type="checkbox"
                variant="outline-primary"
                checked={checked}
                value="1"
                onChange={(e) => {
                  toggleTheme();
                  setChecked(e.currentTarget.checked);
                }}
              >
                {checked ? "Light" : "Dark"}
              </ToggleButton>
            </ButtonGroup>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Cerca un libro"
              onChange={(event) => {
                handleChange(event);
              }}
            />

            <Button type="submit">Cerca</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
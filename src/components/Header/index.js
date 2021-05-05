import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <h2 className="header">NSW Vehicle Registration App</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Header;

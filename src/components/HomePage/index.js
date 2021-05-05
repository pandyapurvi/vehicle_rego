/* eslint-disable no-sequences */
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../AppContext";
import Button from "react-bootstrap/Button";
import { Card, Container } from "react-bootstrap";
import Header from "../Header";
import "./HomePage.css";
import { checkExpiryStatus } from "../../utils/helperFunctions";
import PropTypes from 'prop-types';

const HomePage = () => {
  const [vehicleData, setVehicleData] = useContext(AppContext);

  const history = useHistory();
  if (!vehicleData) {
    return <p data-testid="loading">Data is loading...</p>;
  }

  // if (error) {
  //   return <p>There was an error loading your data!</p>;
  // }

  return (
    <form>
      <Header />
      <div style={{ maxWidth: "400px", margin: "auto" }}>
        <h3 data-testid="allVehicle" className="headerTitle">
          Details of Vehicles
        </h3>
        <br></br>

        <Card.Body>
          {vehicleData &&
            vehicleData.map((item, i) => (
              <Card
                key={i}
                variant="Info"
                style={{ width: "21.5rem", marginBottom: "1rem" }}
              >
                <Container>
                  <div>
                    <Card.Header
                      variant="info"
                      style={{ backgroundColor: "#05B8CC", color: "white" }}
                    >
                      Summary of {item.plate_number}
                    </Card.Header>

                    <Card.Subtitle
                      className="cardDetail"
                      data-testid="plateNumber"
                    >
                      Plate Number: {item.plate_number}
                    </Card.Subtitle>
                    <Card.Subtitle
                      className="cardDetail"
                      data-testid="brand"
                    >
                      Brand of Car: {item.vehicle.make}
                    </Card.Subtitle>
                    <Card.Subtitle className="cardDetail">
                      Type of Car: {item.vehicle.type}
                    </Card.Subtitle>
                    <Card.Subtitle
                      className="cardDetail"
                      data-testid="checkValidity"
                    >
                      Expiry status:{" "}
                      {checkExpiryStatus(item.registration.expired)}
                    </Card.Subtitle>

                    <Button
                      className="button"
                      variant="warning"
                      onClick={() => history.push(`/vehicle-detail-page/${i}`)}
                      data-testid="button"
                    >
                      Click for more Info
                    </Button>
                  </div>
                </Container>
              </Card>
            ))}
        </Card.Body>
      </div>
    </form>
  );
};
export default HomePage;
HomePage.propTypes = {
  vehicleData: PropTypes.array,
  plate_number: PropTypes.string,
  make: PropTypes.string,
  checkExpiryStatus: PropTypes.func
}
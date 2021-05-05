import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../AppContext";
import {
  formatDate,
  checkValidity,
  mask,
  checkExpiryStatus,
  checkGrossMass,
} from "../../utils/helperFunctions";
import { Card, Button } from "react-bootstrap";
import Header from "../Header";
import "./VehicleInformation.css";
import PropTypes from 'prop-types';

const VehicleInformation = (props) => {
  console.log("propshhhhh", props);
  const [data, setData] = useContext(AppContext);
  const history = useHistory();
  console.log("data", data);

  let vehicleDetails = []; //Full details of vehicle
  let registrationInfoData = []; //registration details
  let vehicleInfoData = []; //vehicle info e.g. brand, type, colour, etc
  let insuranceInfoData = []; //Insurance info
  let plateNumber = "";

  if (data) {
    vehicleDetails = data[props.match.params.id];
console.log('vehicleDetails', vehicleDetails)
    if (vehicleDetails) {
      plateNumber = vehicleDetails.plate_number;

      const registrationData = JSON.stringify(vehicleDetails.registration);
      registrationInfoData = JSON.parse(registrationData);

      const vehicleData = JSON.stringify(vehicleDetails.vehicle);
      vehicleInfoData = JSON.parse(vehicleData);

      const insuranceData = JSON.stringify(vehicleDetails.insurer);
      insuranceInfoData = JSON.parse(insuranceData);
    }
  }

  return (
    <>
      <Header />
      <div data-testid="main" className="content">
        <h4 className="mainHeader" data-testid="headerInfo">
          Vehicle Information Page
        </h4>

        <Card.Body>
          <Card
            variant="Info"
            className="cardBody"
          >
            <Card.Header
              variant="info"
              className="cardHeader"
              data-testid="plateNumber"
            >
              Rego Details of <strong>{plateNumber}</strong>
            </Card.Header>

            <Card.Subtitle className="cardDetail">
              Type of the vehicle: <strong>{vehicleInfoData.type}</strong>
            </Card.Subtitle>
            <Card.Subtitle className="cardDetail" data-testid="brand">
              Brand: <strong>{vehicleInfoData.make}</strong>
            </Card.Subtitle>
            <Card.Subtitle className="cardDetail">
              Model: <strong>{vehicleInfoData.model}</strong>
            </Card.Subtitle>
            <Card.Subtitle className="cardDetail">
              Color: <strong>{vehicleInfoData.colour}</strong>
            </Card.Subtitle>
            <Card.Subtitle className="cardDetail">
              VIN No: <strong>{mask(vehicleInfoData.vin)}</strong>
            </Card.Subtitle>
            <Card.Subtitle className="cardDetail">
              Tare weight: <strong>{vehicleInfoData.tare_weight}</strong>
            </Card.Subtitle>

            <Card.Subtitle className="cardDetail">
              Gross mass:{" "}
              <strong>{checkGrossMass(vehicleInfoData.gross_mass)}</strong>
            </Card.Subtitle>
            <Card.Subtitle className="cardDetail">
              This vehicle is{" "}
              <strong>{checkValidity(registrationInfoData.expiry_date)}</strong>
            </Card.Subtitle>
            <Card.Subtitle className="cardDetail">
              Expriry date:{" "}
              <strong>{formatDate(registrationInfoData.expiry_date)}</strong>
            </Card.Subtitle>
            <Card.Subtitle className="cardDetail">
              Expiry status:{" "}
              <strong>
                {checkExpiryStatus(registrationInfoData.expiry_date)}
              </strong>
            </Card.Subtitle>
            <Card.Subtitle className="cardDetail">
              Insurance company: <strong>{insuranceInfoData.name}</strong>
            </Card.Subtitle>
            <Card.Subtitle className="cardDetail">
              Insurance code: <strong>{insuranceInfoData.code}</strong>
            </Card.Subtitle>
            <Button
              className="buttonBt"
              variant="warning"
              onClick={() => history.push(`/`)}
              data-testid="button"
            >
              Back
            </Button>
          </Card>
        </Card.Body>
      </div>
    </>
  );
};
export default VehicleInformation;

VehicleInformation.propTypes = {
  data: PropTypes.array,
  plate_number: PropTypes.string,
  make: PropTypes.string,
  checkExpiryStatus: PropTypes.func,
  model: PropTypes.string,
  colour:PropTypes.string,
  checkGrossMass: PropTypes.func,
  formatDate: PropTypes.func,
  code: PropTypes.number,
  vin: PropTypes.string,
  name: PropTypes.string,
  plateNumber: PropTypes.string,
  vehicleDetails: PropTypes.array
}
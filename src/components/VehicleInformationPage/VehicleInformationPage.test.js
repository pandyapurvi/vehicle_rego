/* eslint-disable no-lone-blocks */
import React from "react";
import { Router } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import VehicleInformation from "./index";
import {
  formatDate,
  checkValidity,
  mask,
  checkExpiryStatus,
  checkGrossMass,
} from "../../utils/helperFunctions";
import { AppContext } from "../../AppContext";
import "@testing-library/jest-dom/extend-expect";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("<VehicleInformation />", () => {
  let data;

  beforeEach(() => {
    data = {
      plate_number: "EBF28E",
      registration: {
        expired: false,
        expiry_date: "2021-02-05T23:15:30.000Z",
      },
      vehicle: {
        type: "Wagon",
        make: "BMW",
        model: "X4 M40i",
        colour: "Blue",
        vin: "12389347324",
        tare_weight: 1700,
        gross_mass: null,
      },
      insurer: {
        name: "Allianz",
        code: 32,
      },
    };

    data.dispatch = jest.fn();
  });

  afterEach(() => {
    data = null;
  });

  it("should render a section header", async () => {
    const { container } = render(
      <Router history={history}>
        <VehicleInformation />
      </Router>
    );
    // screen.debug()

    const sectionHeader = await screen.findByTestId("headerInfo");
    expect(sectionHeader).toHaveTextContent("Vehicle Information Page");
  });
  // it("should have plate no.", async () => {
    
  //   const { container } = render(props => {
  //     <AppContext.Provider value={[data]}>
  //       <Router history={history}>
  //         <VehicleInformation {...props} />
  //       </Router>
  //     </AppContext.Provider>
  //   });
  //   console.log('value', data.plate_number)
  //   // screen.debug();
  //   const plateNumber = container.querySelector('div[class="cardHeader card-header"]');
  //   // const plateNumber = screen.getByTestId("plateNumber")
    
  //   // expect(plateNumber).toBe('EBF28E');
  //   console.log('plateNumber', plateNumber)
  // });
  it("should mask the VIN no", () => {
    const { container } = render(
      <Router history={history}>
        <VehicleInformation />
      </Router>
    );
    expect(mask("1223333333")).toBe("******3333");
  });

  it("should check the validity and format date", () => {
    const { container } = render(
      <Router history={history}>
        <VehicleInformation />
      </Router>
    );
    expect(formatDate("2021-02-05T23:15:30.000Z")).toBe("05 February 21");
    expect(checkValidity("2021-02-05T23:15:30.000Z")).toBe(
      "expired 3 month(s) ago"
    );
  });

  it("should check the expiry status", () => {
    const { container } = render(
      <Router history={history}>
        <VehicleInformation />
      </Router>
    );
    expect(checkExpiryStatus(false)).toBe("Not expired");
    expect(checkExpiryStatus(true)).toBe("Expired");
  });

  it("should check the gross mass of vehicle", () => {
    const { container } = render(
      <Router history={history}>
        <VehicleInformation />
      </Router>
    );
    expect(checkGrossMass(null)).toBe("Not given");
    expect(checkGrossMass("1700")).toBe("1700");
  });

  it(" should check the history path", () => {
    const { container } = render(
      <Router history={history}>
        <VehicleInformation />
      </Router>
    );
    // screen.debug();
    // const plateNumber = screen.getByTestId("plateNumber")
    // expect(plateNumber).toHaveTextContent("EBF28E")
    fireEvent.click(screen.getByRole("button"));
    expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });

  it("should click on button", () => {
    const { container } = render(
      <Router history={history}>
        <VehicleInformation />
      </Router>
    );
    const button = screen.getByTestId("button");
    fireEvent.click(button);
    expect(button).toBeDefined();
    screen.getByRole("button", { name: "Back" });
  });
  it("should check the plate number", () => {
    const { container } = render(
      <Router history={history}>
        <VehicleInformation />
      </Router>
    );
    // screen.debug();
    const plateNumber = screen.getByTestId("plateNumber")
    // const plateNumber = container.querySelector('div[data-testid="plateNumber"]');
    // console.log('plate numebr', plateNumber)
    // expect(plateNumber).toHaveTextContent("EBF28E")
    
  });
 
  it("should check brand of vehicle", () => {
    const { container } = render(
      <Router history={history}>
        <VehicleInformation />
      </Router>
    );
    // screen.debug();
    const brand = screen.getByTestId("brand")
    // const plateNumber = container.querySelector('div[data-testid="plateNumber"]');
    console.log('plate numebr', brand)
    // expect(plateNumber).toHaveTextContent("EBF28E")
    
  });
});

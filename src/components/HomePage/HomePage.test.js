import React from "react";
import { Router } from "react-router-dom";
import {
  fireEvent,
  screen,
  render,
} from "@testing-library/react";
import HomePage from "./index";
import { AppContext } from "../../AppContext";
import { createBrowserHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import { checkExpiryStatus } from "../../utils/helperFunctions";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const history = createBrowserHistory();

describe("<HomePage />", () => {
  let data;

  beforeEach(() => {
    data = [
      {
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
      },
    ];

    data.dispatch = jest.fn();
  });

  afterEach(() => {
    data = null;
  });

  it("should render a section header", async () => {
    const { container } = render(
      <AppContext.Provider value={[data]}>
        <Router history={history} >
          <HomePage />
        </Router>
      </AppContext.Provider>
    );
    const sectionHeader = await screen.findByTestId("allVehicle");

    expect(sectionHeader).toHaveTextContent("Details of Vehicles");
  });

  it("should display plate No", async () => {
    const { container } = render(
      <AppContext.Provider value={[data]}>
        <Router history={history} >
          <HomePage />
        </Router>
      </AppContext.Provider>
    );

    // screen.debug();

    const plateNumber = container.querySelector('div[data-testid="plateNumber"]');
      // console.log("homepage Plate number:", plateNumber)
    expect(plateNumber).toHaveTextContent("EBF28E");
  });

  it("should present the brand of the vehicle", async () => {
    const { container } = render(
      <AppContext.Provider value={[data]}>
        <Router history={history} >
          <HomePage />
        </Router>
      </AppContext.Provider>
    );

    // screen.debug();

    const findBrand = container.querySelector('div[data-testid="brand"]');

    expect(findBrand).toHaveTextContent("BMW");
  });

  it("should display expiry status of the vehicle", async () => {
    const { container } = render(
      <AppContext.Provider value={[data]}>
        <Router history={history} >
          <HomePage />
        </Router>
      </AppContext.Provider>
    );

    const checkValidity = container.querySelector(
      'div[data-testid="checkValidity"]'
    );
    expect(checkValidity).toHaveTextContent("Not expired");
    expect(checkExpiryStatus(false)).toBe("Not expired");
  });

  it("should click on button", () => {
    const { container } = render(
      <AppContext.Provider value={[data]}>
        <Router history={history} >
          <HomePage />
        </Router>
      </AppContext.Provider>
    );

    const button = screen.getByTestId("button");
    fireEvent.click(button);
    expect(button).toBeDefined();
    screen.getByRole("button", { name: "Click for more Info" });
  });

  it("should check the history function link", () => {
    const { container } = render(
      <AppContext.Provider value={[data]}>
        <Router history={history} >
          <HomePage />
        </Router>
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(mockHistoryPush).toHaveBeenCalledWith("/vehicle-detail-page/0");
  });
});

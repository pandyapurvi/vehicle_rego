import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

const AppContext = React.createContext([]);

const AppProvider = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      axios
        .get(
          "https://dl.dropboxusercontent.com/s/o9iiprxmkv2um27/snsw_registrations_api.json?dl=1"
        )
        .then((response) => setData(response.data.registrations))
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  return (
    <AppContext.Provider value={[data, setData]}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
AppProvider.prototype = {
  data: PropTypes.array
}
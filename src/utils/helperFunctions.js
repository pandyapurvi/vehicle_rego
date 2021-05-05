import moment from "moment";

const formatDate = (date) => {
  const mDate = moment(date, "YYYY-MM-DD");
  if (!mDate.isValid()) {
    return "";
  }
  return mDate.format("DD MMMM YY");
};

const checkValidity = (expDate) => {
  if (!expDate) {
    return "";
  }
  const expiryDate = moment(expDate, "YYYY-MM-DD");
  const monthsCount = moment().diff(expiryDate, "months");
  const yearsCount = moment().diff(expiryDate, "years");
  if (yearsCount < 0) {
    return ` valid till ${Math.abs(monthsCount)} year(s) `;
  }
  if (monthsCount < 0) {
    return ` valid till ${Math.abs(monthsCount)} month(s) `;
  }
  if (yearsCount === 0) {
    return "expired " + monthsCount + " month(s) ago";
  }
  return "expired " + yearsCount + " year(s) ago";
};

const mask = (str) => {
  console.log("jskjfghkjs", str);
  let maskedValue = "";
  if (str) {
    maskedValue = str.replace(/.(?=.{4,}$)/g, "*");
  }

  return maskedValue;
};

const checkGrossMass = (str) => {
  return str === null ? "Not given" : str;
};

const checkExpiryStatus = (str) => {
  return str === false ? "Not expired" : "Expired";
};
export { formatDate, checkValidity, mask, checkExpiryStatus, checkGrossMass };

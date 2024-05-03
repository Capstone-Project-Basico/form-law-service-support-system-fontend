import React from "react";

const dateConvert = (dateInput: Date) => {
  var dateFormat = new Date(dateInput);
  let date =
    dateFormat.getFullYear() +
    "-" +
    (dateFormat.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    dateFormat.getDate().toString().padStart(2, "0") +
    " " +
    dateFormat.getHours() +
    ":" +
    dateFormat.getMinutes() +
    ":" +
    dateFormat.getSeconds();

  return date;
};

export default dateConvert;

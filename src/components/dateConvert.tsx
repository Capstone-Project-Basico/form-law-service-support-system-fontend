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
    dateFormat.getHours().toString().padStart(2, "0") +
    ":" +
    dateFormat.getMinutes().toString().padStart(2, "0") +
    ":" +
    dateFormat.getSeconds().toString().padStart(2, "0");

  return date;
};

export default dateConvert;

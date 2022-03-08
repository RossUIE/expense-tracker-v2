import React from "react";
import { getLastDayOfMonth, getFirstDayOfMonth } from "../helpers/dateHelper";

const monthNames = [
  {
    name: "January",
    id: 0,
    first: getFirstDayOfMonth(0),
    last: getLastDayOfMonth(0),
  },
  {
    name: "February",
    id: 1,
    first: getFirstDayOfMonth(1),
    last: getLastDayOfMonth(1),
  },
  {
    name: "March",
    id: 2,
    first: getFirstDayOfMonth(2),
    last: getLastDayOfMonth(2),
  },
  {
    name: "April",
    id: 3,
    first: getFirstDayOfMonth(3),
    last: getLastDayOfMonth(3),
  },
  {
    name: "May",
    id: 4,
    first: getFirstDayOfMonth(4),
    last: getLastDayOfMonth(4),
  },
  {
    name: "June",
    id: 5,
    first: getFirstDayOfMonth(5),
    last: getLastDayOfMonth(5),
  },
  {
    name: "July",
    id: 6,
    first: getFirstDayOfMonth(6),
    last: getLastDayOfMonth(6),
  },
  {
    name: "August",
    id: 7,
    first: getFirstDayOfMonth(7),
    last: getLastDayOfMonth(7),
  },
  {
    name: "September",
    id: 8,
    first: getFirstDayOfMonth(8),
    last: getLastDayOfMonth(8),
  },
  {
    name: "October",
    id: 9,
    first: getFirstDayOfMonth(9),
    last: getLastDayOfMonth(9),
  },
  {
    name: "November",
    id: 10,
    first: getFirstDayOfMonth(10),
    last: getLastDayOfMonth(10),
  },
  {
    name: "December",
    id: 11,
    first: getFirstDayOfMonth(11),
    last: getLastDayOfMonth(11),
  },
];

export default monthNames;

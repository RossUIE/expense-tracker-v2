import React from "react";

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="none"
      stroke="#2c3e50"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      className="icon icon-tabler icon-tabler-trash"
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path d="M4 7L20 7"></path>
      <path d="M10 11L10 17"></path>
      <path d="M14 11L14 17"></path>
      <path d="M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"></path>
    </svg>
  );
}

export default TrashIcon;

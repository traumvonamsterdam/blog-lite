import React from "react";
import ReactDOM from "react-dom";

const HelloMessage = ({ name }) => <div>Hello {name}!</div>;

const mount = document.getElementById("app");
ReactDOM.render(<HelloMessage name="James" />, mount);

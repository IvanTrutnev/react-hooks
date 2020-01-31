import React from "react";

const BackendErrorMessages = ({errors}) => {
  const errorMessages = Object.keys(errors).map(name => {
    const messages = errors[name].join(' ');
    return `${name} ${messages}`;
  });
  return <ul className="error-messages">
    {errorMessages.map(msg => (<li key={msg}>{msg}</li>))}
  </ul>
};

export default BackendErrorMessages;
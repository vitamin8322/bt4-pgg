import React from "react";

type Props = {
  disabled: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

const Button = (props: Props) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3 ${
        props.disabled
          ? " enabled:transition enabled:transform enabled:hover:translate-x-1 enabled:hover:blue-300 cursor-no-drop"
          : ""
      }`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;

import React from "react";
import { ButtonBase, Tooltip } from "@material-ui/core";
import { Check } from "@material-ui/icons";

const ColourButton = ({ name, colour, onClick, isSelected }) => {
  return (
    <Tooltip title={name} placement="top">
      <ButtonBase
        style={{
          width: "100%",
          height: 50,
          background: colour,
          color: "white",
        }}
        onClick={onClick}
      >
        {isSelected && <Check fontSize="small" />}
      </ButtonBase>
    </Tooltip>
  );
};

export default ColourButton;

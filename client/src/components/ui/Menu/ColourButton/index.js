import React from "react";
import { ButtonBase, Tooltip } from "@material-ui/core";
import { Check, NotInterested } from "@material-ui/icons";

const ColourButton = ({
  name,
  colour,
  onClick,
  isSelected,
  isUnavailable
}) => {
  return (
    <Tooltip title={name} placement="top">
      <span>
        <ButtonBase
          style={{
            width: "100%",
            height: 50,
            background: colour,
            color: "white",
            borderRadius: 10,
          }}
          onClick={onClick}
          disabled={isUnavailable}
        >
          {isSelected && <Check fontSize="small" />}
          {isUnavailable && <NotInterested fontSize="small" />}
        </ButtonBase>
      </span>
    </Tooltip>
  );
};

export default ColourButton;

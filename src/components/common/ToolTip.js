import React from "react";
import Popup from "reactjs-popup";

const ToolTip = ({ text, children, ...rest }) => {
    return (
        <Popup
            trigger={<div className="inline-block">{children}</div>}
            on={["hover"]}
            position="top center"
            closeOnDocumentClick
            contentStyle={{ width: "fit-content" }}
            {...rest}
        >
            {text}
        </Popup>
    );
};

export default ToolTip;

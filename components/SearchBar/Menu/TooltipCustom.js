import { useState } from "react";
import { Tooltip } from "react-native-elements";
import MenuItem from "./MenuItem";

function ToolTipCustom({ height, width, backgroundColor, items, children }) {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip
      containerStyle={{ borderWidth: 1, opacity: 0.9 }}
      width={width}
      height={height}
      popover={
        <>
          {items.map((item, index) => (
            <MenuItem {...item} key={index} />
          ))}
        </>
      }
      withOverlay={false}
      visible={open}
      backgroundColor={backgroundColor}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      {children}
    </Tooltip>
  );
}

export default ToolTipCustom;

import { useState } from 'react';
import { Tooltip } from 'react-native-elements';
import MenuItem from './MenuItem';

function ToolTipCustom({ height, width, backgroundColor, items, children }) {
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
            backgroundColor={backgroundColor}
            toggleOnPress={true}
        >
            {children}
        </Tooltip>
    );
}

export default ToolTipCustom;

import { Platform } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import MenuItem from './MenuItem';

const items = [
    {
        id: 1,
        icon: 'account-multiple-plus-outline',
        title: 'Tạo nhóm',
    },
    {
        id: 2,
        icon: 'account-plus-outline',
        title: 'Thêm bạn',
    },
];

function ToolTip({ children, isVisible, setIsVisible }) {
    return (
        <Tooltip
            isVisible={isVisible}
            content={
                <>
                    {items.map((item) => (
                        <MenuItem icon={item.icon} title={item.title} key={item.id} />
                    ))}
                </>
            }
            //style tool tips
            placement={'bottom'}
            onClose={() => setIsVisible(!isVisible)}
            contentStyle={{ width: 150, height: 100 }}
            {...(Platform.OS === 'ios'
                ? { tooltipStyle: { marginLeft: 17, marginTop: 10 } }
                : { tooltipStyle: { marginLeft: 17, marginTop: -40 } })}
        >
            {children}
        </Tooltip>
    );
}

export default ToolTip;

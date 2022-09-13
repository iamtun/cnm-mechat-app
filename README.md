## ME CHAT - APP

### Dựng layout cho ứng dụng -> Sử dụng react-navigation

- Tạo các màn hình
- Cài đặt thư viện react-navigation:
    - B1: `npm install @react-navigation/native`
    - B2 - Lưu ý cái này dùng cho expo: `npx expo install react-native-screens react-native-safe-area-context`
    - B3: 
        - Luồng màn hình ngoài: `npm install @react-navigation/native-stack`
        - Luồng màn hình home:  `npm install @react-navigation/bottom-tabs`
    - B4: Tạo routers cho ứng dụng. Nếu có lỗi thư viện thì chạy dòng lệnh: `npm start -- --reset-cache` rồi chạy lại ứng dụng.
        - RootStackNavigator: Luồng các màn hình xử lý bên ngoài -> Login, Register, Authencation
        - HomeTabNavigator: Luồng các màn hình chính
    - B5: Tải thư viện icon: `https://github.com/oblador/react-native-vector-icons`
    - B6: Tiến hành sử dụng thư viện
    ```js
        //import
        import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
        //hoặc
        import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

        //use
        <FontAwesome5 name={iconName} size={20} color={color} />
        //hoặc
        <Icon name="arrow-left" size={30} color="#fff" />
    ```

### Hướng dẫn dùng thư viện react-native-walkthrough-tooltip:

- B1: Cài đặt thư viện: `npm i react-native-walkthrough-tooltip`
- B2: import thư viện
    ```js
        import Tooltip from 'react-native-walkthrough-tooltip';
    ```
- B3: Sử dụng:

    ```js
        <Tooltip
            isVisible={isVisible}
            content={<>
                {items.map(item => <MenuItem icon={item.icon} title={item.title} key={item.id}/>)}
            </>}
            //style tool tips
            placement={'bottom'}
            onClose={() => setIsVisible(!isVisible)}
            contentStyle={{ width: 150, height: 200 }}
            tooltipStyle={{ marginLeft: 17, marginTop: 10 }}
        >
            {children}
        </Tooltip>
    ```
- contentStyle: Tùy chỉnh độ rộng cao của menu
- tooltipStyle: Tùy chỉnh menu theo ý muốn giống y hệt css bình thường

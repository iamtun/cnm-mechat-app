import { View, Text, ScrollView } from 'react-native';
import React from 'react';

export default function PolicyScreen() {
    return (
        <ScrollView>
            <Text>
                Các chính sách của chúng tôi đóng vai trò quan trọng trong việc duy trì trải nghiệm tích cực cho người
                dùng. Vui lòng tuân thủ các chính sách này khi sử dụng Mechat.
            </Text>
            <Text style={{ fontWeight: 'bold' }}>Hành vi gian lận, lừa đảo và các hình thức lừa dối khác</Text>
            <Text style={{ fontWeight: 'bold' }}>Hành vi quấy rối</Text>
            <Text style={{ fontWeight: 'bold' }}>Thông tin cá nhân và thông tin bí mật</Text>
            <Text style={{ fontWeight: 'bold' }}>Hoạt động bất hợp pháp</Text>
            <Text style={{ fontWeight: 'bold' }}>
                Mọi hành vi trên nếu bị phát hiện hoặc người dùng tố cáo thì sẽ bị cảnh cáo hoặc khóa tài khoản. Nên vui
                lòng cân nhắc mục đích sử dụng ứng dụng trước khi dùng.
            </Text>
        </ScrollView>
    );
}

import { LINK_API_V2 } from '@env';
import { io } from 'socket.io-client';

console.log('API', LINK_API_V2);
export default {
    LINK_API_V2,
};

export const socket = io('https://6bf1-42-119-224-98.ap.ngrok.io', {
    transports: ['websocket'],
    //reconnection: true,
    withCredentials: true,
});

export const checkPhoneNumber = (phoneNumber) => {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

    if (vnf_regex.test(phoneNumber) == false) {
        return false;
    }
    return true;
};

export const createFormData = (imageLink, key) => {
    let uriParts = imageLink.split('.');
    const path = imageLink.split('/');
    let fileType = uriParts[uriParts.length - 1];
    let nameFile = path[path.length - 1];
    //console.log();
    const imagePath = ['png', 'jpg', 'jpeg'];

    const image = {
        uri: imageLink,
        type: imagePath.includes(fileType) ? `image/${fileType}` : `video/mp4`,
        name: imagePath.includes(fileType) ? nameFile : nameFile.replace('.mov', '.mp4'),
    };

    let formData = new FormData();
    //console.log(image);
    formData.append(key, image);

    return formData;
};

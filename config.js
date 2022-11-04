import { LINK_API_V3, LINK_API_LOCALHOST } from '@env';
import { io } from 'socket.io-client';

console.log('API', LINK_API_V3);
export default {
    LINK_API_V3,
    LINK_API_LOCALHOST
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

export const createFormData = (images, key) => {
    const _images = images.map(link => {
        let uriParts = link.split('.');
        const path = link.split('/');
        let fileType = uriParts[uriParts.length - 1];
        let nameFile = path[path.length - 1];
        //console.log();
        const imagePath = ['png', 'jpg', 'jpeg'];
    
        return {
            uri: link,
            type: imagePath.includes(fileType) ? `image/${fileType}` : `video/mp4`,
            name: imagePath.includes(fileType) ? nameFile : nameFile.replace('.mov', '.mp4'),
        };
    })
   
    console.log(_images);
    const formData = new FormData();
    //console.log(image);
    _images.forEach(image => {
        console.log(image, key);
        formData.append(key, image);
    });

    return formData;
};

import { LINK_API_V2 } from "@env";
import { io } from "socket.io-client";

console.log("API", LINK_API_V2);
export default {
  LINK_API_V2,
};

export const socket = io("https://cnm-socket-server-heroku.herokuapp.com", {
  transports: ["websocket"],
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

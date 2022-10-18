import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import config, { socket } from "../../config";

const messageListSlice = createSlice({
  name: "messages",
  initialState: {
    data: [],
    receiverId: null,
  },
  reducers: {
    setReceiverId: (state, action) => {
      state.receiverId = action.payload;
    },
    addMessageFromSocket: (state, action) => {
      const messageExist = state.data.find(
        (message) => message._id === action.payload._id
      );
      if (!messageExist) {
        state.data.push(action.payload);
      } else {
        return;
      }
    },
    sendVideo: (state, action) => {
      const { imageLink, senderID } = action.payload;
      const temp = {
        _id: "1212121v",
        imageLink,
        senderID,
        createAt: Date.now(),
      };

      state.data.push(temp);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesById.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.data.push(action.payload);
        //send success socket
        socket.emit("send_message", { message: action.payload });
      })
      .addCase(sendImageMessage.fulfilled, (state, action) => {
        if (action.payload) {
          socket.emit("send_message", { message: action.payload });
          state.data.push(action.payload);
        } else {
          Alert.alert("Thông báo", "Tệp đa phương tiện này không gửi được");
        }
      })
      .addCase(sendImageMessage.rejected, (state, action) => {
        console.log("err send message");
        Alert.alert("Thông báo", "Hình ảnh này không gửi được");
      });
  },
});

/**
 * get all messages by user id
 */
export const fetchMessagesById = createAsyncThunk(
  "messages/fetchMessagesById",
  async (id) => {
    if (id) {
      try {
        const res = await fetch(`${config.LINK_API_V2}/messages/${id}`);
        const messages = await res.json();
        return messages;
      } catch (err) {
        console.log(`[fetch messages]: ${err}`);
      }
    }
  }
);

/**
 * send message to server by conversation id
 * body: {conversation_id}
 * return message send success
 */
export const sendMessage = createAsyncThunk("messages/add", async (message) => {
  if (message) {
    const res = await fetch(`${config.LINK_API_V2}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const _message = await res.json();
    //console.log(`----> ${JSON.stringify(_message)}`);
    return _message;
  }
});

const createFormData = (imageMessage) => {
  let uriParts = imageMessage.imageLink.split(".");
  const path = imageMessage.imageLink.split("/");
  let fileType = uriParts[uriParts.length - 1];
  let nameFile = path[path.length - 1];
  //console.log(fileType, nameFile);
  const imagePath = ["png", "jpg", "jpeg"];
  const { imageLink, senderID, conversationID } = imageMessage;
  console.log(imageLink, senderID, conversationID);
  const image = {
    uri: imageLink,
    type: imagePath.includes(fileType) ? `image/${fileType}` : `video/mp4`,
    name: imagePath.includes(fileType)
      ? nameFile
      : nameFile.replace(".mov", ".mp4"),
  };

  let formData = new FormData();
  //console.log(image);
  formData.append("imageLink", image);
  formData.append("senderID", senderID);
  formData.append("conversationID", conversationID);

  return formData;
};

export const sendImageMessage = createAsyncThunk(
  "messages/send-image",
  async (imageMessage) => {
    if (imageMessage) {
      let formData = createFormData(imageMessage);

      const res = await fetch(`${config.LINK_API_V2}/messages`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      const _message = await res.json();
      if (_message?._id) {
        return _message;
      } else {
        return null;
      }
    }
  }
);

export default messageListSlice;

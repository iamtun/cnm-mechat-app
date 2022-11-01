import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import config, { createFormData, socket } from '../../config';

const messageListSlice = createSlice({
    name: 'messages',
    initialState: {
        data: [],
        loading: true,
        nextLoading: true,
    },
    reducers: {
        addMessageFromSocket: (state, action) => {
            const messageExist = state.data.find((message) => message._id === action.payload._id);
            if (!messageExist) {
                state.data.push(action.payload);
            } else {
                return;
            }
        },
        sendVideo: (state, action) => {
            const { imageLink, senderID } = action.payload;
            const temp = {
                _id: '1212121v',
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
                state.loading = true;
            })
            .addCase(fetchMessagesById.pending, (state, action) => {
                state.loading = false;
            })
            .addCase(fetch10NextMessagesById.fulfilled, (state, action) => {
                if (action.payload) {
                    const next10Message = [...action.payload];
                    const nowArray = state.data.concat(next10Message);
                    state.data = nowArray;
                    state.nextLoading = true;
                }
            })
            .addCase(fetch10NextMessagesById.pending, (state, action) => {
                state.nextLoading = false;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.data.unshift(action.payload);
                //send success socket
                socket.emit('send_message', { message: action.payload });
            })
            .addCase(sendImageMessage.fulfilled, (state, action) => {
                if (action.payload) {
                    socket.emit('send_message', { message: action.payload });
                    state.data.unshift(action.payload);
                } else {
                    Alert.alert('Thông báo', 'Tệp đa phương tiện này không gửi được');
                }
            })
            .addCase(sendFile.fulfilled, (state, action) => {
                if (action.payload) {
                    socket.emit('send_message', { message: action.payload });
                    state.data.unshift(action.payload);
                } else {
                    Alert.alert('Thông báo', 'File này không gửi được');
                }
            })
            .addCase(sendImageMessage.rejected, (state, action) => {
                console.log('err send message');
                Alert.alert('Thông báo', 'Tệp đa phương tiện này quá nặng!');
            })
            .addCase(recallMessage.fulfilled, (state, action) => {
                const message = action.payload;
                const messageList = state.data.map((_message) => (_message._id === message._id ? message : _message));
                state.data = messageList;
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                const { id } = action.payload;
                const index = state.data.findIndex((_message) => _message._id === id);
                state.data.splice(index, 1);
            });
    },
});

/**
 * get 10 messages by conversation id
 */
export const fetchMessagesById = createAsyncThunk('messages/fetchMessagesById', async ({ id }) => {
    if (id) {
        try {
            const res = await fetch(`${config.LINK_API_V2}/messages/ten-last-messages/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ count: 0 }),
            });
            const messages = await res.json();
            //console.log(messages);
            return messages;
        } catch (err) {
            console.log(`[fetch messages]: ${err}`);
        }
    }
});

/**
 * get 10 messages next by conversation id
 */
export const fetch10NextMessagesById = createAsyncThunk(
    'messages/fetch10NextMessagesById',
    async ({ id, countMessage }) => {
        if (id) {
            try {
                const res = await fetch(`${config.LINK_API_V2}/messages/ten-last-messages/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ count: countMessage }),
                });
                const messages = await res.json();
                //console.log("next message: ->", messages);
                return messages;
            } catch (err) {
                console.log(`[fetch messages]: ${err}`);
            }
        }
    },
);

/**
 * send message to server by conversation id
 * body: {conversation_id}
 * return message send success
 */
export const sendMessage = createAsyncThunk('messages/add', async (message) => {
    if (message) {
        const res = await fetch(`${config.LINK_API_V2}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        const _message = await res.json();
        //console.log(`----> ${JSON.stringify(_message)}`);
        return _message;
    }
});

export const sendImageMessage = createAsyncThunk('messages/send-image', async (imageMessage) => {
    if (imageMessage) {
        const { imageLink, senderID, conversationID } = imageMessage;
        let formData = createFormData(imageLink, 'imageLink');
        formData.append('senderID', senderID);
        formData.append('conversationID', conversationID);
        //console.log("formData", formData);

        const res = await fetch(`${config.LINK_API_V2}/messages`, {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });

        const _message = await res.json();
        if (_message?._id) {
            return _message;
        } else {
            console.log(_message);
            return null;
        }
    }
});

export const sendFile = createAsyncThunk('message/sendFile', async (message) => {
    if (message) {
        const { senderID, conversationID, fileToUpload } = message;
        const formData = new FormData();
        formData.append('senderID', senderID);
        formData.append('conversationID', conversationID);
        formData.append('fileLink', fileToUpload);
        const res = await fetch(`${config.LINK_API_V2}/messages`, {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });

        const _message = await res.json();
        console.log(_message);
        if (_message?._id) {
            return _message;
        } else {
            console.log(_message);
            return null;
        }
    }
});
export const recallMessage = createAsyncThunk('message/recall', async (id) => {
    if (id) {
        try {
            const res = await fetch(`${config.LINK_API_V2}/messages/recall/${id}`);
            const message = await res.json();
            return message;
        } catch (err) {
            console.log(`[fetch messages]: ${err}`);
        }
    }
});

export const deleteMessage = createAsyncThunk('message/delete', async (data) => {
    if (data) {
        try {
            const res = await fetch(`${config.LINK_API_V2}/messages/delete-for-you/${data.messageId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: data.userId }),
            });
            const id = await res.json();
            return id;
        } catch (err) {
            console.log(`[fetch delete message]: ${err}`);
        }
    }
});

export default messageListSlice;

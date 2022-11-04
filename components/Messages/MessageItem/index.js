import { PointPropType } from 'deprecated-react-native-prop-types';
import { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Tooltip } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoSelector } from '../../../redux/selector';
import { deleteMessage, recallMessage } from '../../../redux/slice/messageSlice';
import MenuItem from '../../SearchBar/Menu/MenuItem';
import ToolTipCustom from '../../SearchBar/Menu/TooltipCustom';
import ActionMessage from './ActionMessage';
import FileMessage from './FileMessage';
import ImageMessage from './ImageMessage';

function MessageItem({ message, id }) {
    const { _id } = useSelector(userInfoSelector);
    const isMe = message.user.id === _id;
    const dispatch = useDispatch();
    const items = [
        {
            title: 'Thu hồi',
            onPress: () => {
                dispatch(recallMessage(message._id));
            },
        },
        {
            title: 'Xóa',
            onPress: () => {
                const data = { messageId: message._id, userId: _id };
                dispatch(deleteMessage(data));
            },
        },
    ];

    return (
        <>
            {message.action ? (
                <ActionMessage createAt={message.createdAt} message={message.action} />
            ) : (
                <View
                    style={[
                        styles.container,
                        {
                            justifyContent: isMe ? 'flex-end' : null,
                            marginRight: isMe ? 8 : 0,
                        },
                    ]}
                >
                    {isMe || <Image source={{ uri: message.user.avatar }} style={styles.avatar} />}

                    <View
                        style={[
                            styles.body,
                            {
                                backgroundColor: isMe ? '#a2d2ff' : '#fff',
                                borderWidth: 1,
                                borderColor: '#3777F3',
                            },
                        ]}
                    >
                        <View>
                            {isMe ? (
                                <ToolTipCustom height={80} width={100} items={items} backgroundColor="#fff">
                                    <Text style={styles.username}>{message.user.name}</Text>
                                    {message?.imageLink?.length > 0 ? (
                                        message.imageLink.length === 1 ? (
                                            <ImageMessage
                                                imageURI={message.imageLink[0]}
                                                content={message.content}
                                            />
                                        ) : (
                                            <ImageMessage
                                                images={message.imageLink}
                                                content={message.content}
                                            />
                                        )
                                    ) : message.fileLink ? (
                                        <FileMessage fileUri={message.fileLink} />
                                    ) : (
                                        <Text style={[styles.message]}>{message.content}</Text>
                                    )}
                                </ToolTipCustom>
                            ) : (
                                <>
                                    <Text style={styles.username}>{message.user.name}</Text>
                                    {message?.imageLink?.length > 0 ? (
                                        message.imageLink.length === 1 ? (
                                            <ImageMessage
                                                imageURI={message.imageLink[0]}
                                                content={message.content}
                                            />
                                        ) : (
                                            <ImageMessage
                                                images={message.imageLink}
                                                content={message.content}
                                            />
                                        )
                                    ) : message.fileLink ? (
                                        <FileMessage fileUri={message.fileLink} />
                                    ) : (
                                        <Text style={[styles.message]}>{message.content}</Text>
                                    )}
                                </>
                            )}
                            <Text style={styles.time}>{message.createdAt}</Text>
                        </View>
                    </View>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 2,
    },
    body: {
        maxWidth: '80%',
        width: 'auto',
        borderRadius: 8,
        padding: 8,
        marginLeft: 4,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 50,
    },
    username: {
        color: '#2a9d8f',
        marginBottom: 8,
    },
    time: {
        fontSize: 10,
        color: '#354f52',
        fontWeight: '400',
        paddingVertical: 8,
    },
});

export default MessageItem;

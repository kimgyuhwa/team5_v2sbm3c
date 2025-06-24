package dev.mvc.team5.message;
import org.springframework.stereotype.Service;

import dev.mvc.team5.chatroom.ChatRoom;
import dev.mvc.team5.message.Message;
import dev.mvc.team5.message.MessageRepository;
import dev.mvc.team5.user.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    // 메시지 저장
    public Message save(Message message) {
        return messageRepository.save(message);
    }

    // 메시지 조회 등 필요하면 추가
}

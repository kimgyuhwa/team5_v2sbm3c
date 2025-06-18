package dev.mvc.team5;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import dev.mvc.team5.entity.chat.ChatRoom;
import dev.mvc.team5.entity.chat.ChatRoomMember;
import dev.mvc.team5.entity.chat.Message;
import dev.mvc.team5.entity.user.User;
import dev.mvc.team5.repository.ChatRoomMemberRepository;
import dev.mvc.team5.repository.ChatRoomRepository;
import dev.mvc.team5.repository.MessageRepository;
import dev.mvc.team5.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class ChatRoomIntegrationTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ChatRoomRepository chatRoomRepository;

    @Autowired
    ChatRoomMemberRepository chatRoomMemberRepository;

    @Autowired
    MessageRepository messageRepository;

    @Test
    void 채팅방_회원_메시지_저장_조회() {
        // 1) 유저 생성
        User user1 = new User();
        user1.setUsername("Alice");
        userRepository.save(user1);

        User user2 = new User();
        user2.setUsername("Bob");
        userRepository.save(user2);

        // 2) 채팅방 생성
        ChatRoom room = new ChatRoom();
        room.setRoomName("Test Room");
        chatRoomRepository.save(room);

        // 3) 멤버 추가
        ChatRoomMember member1 = new ChatRoomMember();
        member1.setChatRoom(room);
        member1.setUser(user1);
        member1.setJoinedAt(LocalDateTime.now());
        chatRoomMemberRepository.save(member1);

        ChatRoomMember member2 = new ChatRoomMember();
        member2.setChatRoom(room);
        member2.setUser(user2);
        member2.setJoinedAt(LocalDateTime.now());
        chatRoomMemberRepository.save(member2);

        // 4) 메시지 보내기
        Message message = new Message();
        message.setChatRoom(room);
        message.setSender(user1);
        message.setContent("Hello, Bob!");
        message.setSentAt(LocalDateTime.now());
        messageRepository.save(message);

        // 5) 메시지 조회
        List<Message> messages = messageRepository.findByChatRoomChatRoomno(room.getChatRoomno());
        assertThat(messages).hasSize(1);
        assertThat(messages.get(0).getContent()).isEqualTo("Hello, Bob!");

        // 6) 멤버 조회
        List<ChatRoomMember> members = chatRoomMemberRepository.findByChatRoomChatRoomno(room.getChatRoomno());
        assertThat(members).hasSize(2);
    }
}
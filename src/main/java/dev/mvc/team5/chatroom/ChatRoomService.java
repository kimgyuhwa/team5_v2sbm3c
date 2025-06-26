package dev.mvc.team5.chatroom;
import java.util.Optional;

import org.springframework.stereotype.Service;

import dev.mvc.team5.chatroom.ChatRoom;
import dev.mvc.team5.chatroom.ChatRoomRepository; // JPA Repository 인터페이스라고 가정

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    // 채팅방 저장
    public ChatRoom save(ChatRoom chatRoom) {
        return chatRoomRepository.save(chatRoom);
    }

    // 채팅방 조회 (ID로)
    public ChatRoom findById(Long id) {
        return chatRoomRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("ChatRoom not found"));
    }
}

package dev.mvc.team5.chatroom;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.mvc.team5.chatroom.ChatRoom;
import dev.mvc.team5.chatroom.ChatRoomRepository; // JPA Repository 인터페이스라고 가정
import dev.mvc.team5.chatroommember.ChatRoomMember;
import dev.mvc.team5.chatroommember.ChatRoomMemberRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    @Autowired
    private final ChatRoomRepository chatRoomRepository;
    @Autowired
    private final ChatRoomMemberRepository chatRoomMemberRepository;

    // 채팅방 저장
    public ChatRoom save(ChatRoom chatRoom) {
        return chatRoomRepository.save(chatRoom);
    }

    // 채팅방 조회 (ID로)
    public ChatRoom findById(Long id) {
        return chatRoomRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("ChatRoom not found"));
    }
    
    public List<ChatRoom> findChatRoomsByUser(Long userno) {
      List<ChatRoomMember> members = chatRoomMemberRepository.findByUserUserno(userno);
      return members.stream()
                    .map(ChatRoomMember::getChatRoom)
                    .collect(Collectors.toList());
  }
}

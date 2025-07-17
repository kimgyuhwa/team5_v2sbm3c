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
import dev.mvc.team5.notification.NotificationService;
import dev.mvc.team5.user.User;
import dev.mvc.team5.user.UserRepository;
import dev.mvc.team5.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    private final ChatRoomMemberRepository chatRoomMemberRepository;

    private final UserService userService;
    
    private final NotificationService notificationService;

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
    
    @Transactional
    public ChatRoom findOrCreatePrivateChat(Long senderId, Long receiverId) {
        // 1. 두 유저가 모두 참여한 채팅방이 있는지 찾기
        Optional<ChatRoom> existingRoom = chatRoomRepository.findPrivateRoomByMembers(senderId, receiverId);
        if (existingRoom.isPresent()) {
            return existingRoom.get();
        }

        // 2. 없다면 새로 만들기
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setRoomName("1:1 Chat");
        chatRoomRepository.save(chatRoom);

        // 3. 멤버 등록
        User sender = userService.findById(senderId);
        User receiver = userService.findById(receiverId);

        ChatRoomMember m1 = new ChatRoomMember();
        m1.setChatRoom(chatRoom);
        m1.setUser(sender);

        ChatRoomMember m2 = new ChatRoomMember();
        m2.setChatRoom(chatRoom);
        m2.setUser(receiver);

        chatRoomMemberRepository.save(m1);
        chatRoomMemberRepository.save(m2);
        
        // 알림보내기
        notificationService.createNotification(
            receiverId,   //보낼 대상
            "chat",                              // 타입 chat, info 등등
            sender.getUsername() + "님이 새 채팅을 시작했습니다." // 메시지
        );

        return chatRoom;
    }

    
}

package dev.mvc.team5.chatroom;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import dev.mvc.team5.chatroommember.ChatRoomMember;
import dev.mvc.team5.chatroommember.ChatRoomMemberRepository;
import dev.mvc.team5.message.MessageRepository;
import dev.mvc.team5.notification.NotificationService;
import dev.mvc.team5.talents.Talent;
import dev.mvc.team5.user.User;
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
    private final MessageRepository messageRepository;

    /**
     * 채팅방 저장
     */
    public ChatRoom save(ChatRoom chatRoom) {
        return chatRoomRepository.save(chatRoom);
    }

    /**
     * ID로 채팅방 조회
     * @param id 채팅방 ID
     * @return ChatRoom 객체
     */
    public ChatRoom findById(Long id) {
        return chatRoomRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("ChatRoom not found"));
    }

    /**
     * 특정 유저가 참여하고 있는 모든 채팅방 조회
     * @param userno 유저 고유 번호
     * @return 해당 유저가 참여 중인 채팅방 리스트
     */
    public List<ChatRoom> findChatRoomsByUser(Long userno) {
        List<ChatRoomMember> members = chatRoomMemberRepository.findByUserUserno(userno);
        return members.stream()
                      .map(ChatRoomMember::getChatRoom)
                      .collect(Collectors.toList());
    }

    /**
     * 1:1 채팅방이 존재하면 반환하고, 없으면 새로 생성
     * @param senderId 보낸 사람 ID
     * @param receiverId 받는 사람 ID
     * @return 기존 또는 새로 생성된 채팅방
     */
    @Transactional
    public ChatRoom findOrCreatePrivateChat(Long senderId, Long receiverId, Long talentno, String title) {
        // 1. 게시물 기준으로 기존 채팅방 확인
        Optional<ChatRoom> existingRoom = chatRoomRepository
            .findPrivateRoomByMembersAndTalent(senderId, receiverId, talentno);
        if (existingRoom.isPresent()) {
            return existingRoom.get();
        }

        // 2. 채팅방 새로 생성
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setRoomName("1:1 Chat");
        
        
        Talent talent = new Talent();
        talent.setTalentno(talentno); // 영속성 필요 시 talentService.findById() 사용 
        talent.setTitle(title);
        chatRoom.setTalent(talent);   // 관계 설정

        ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);
        System.out.println(savedChatRoom);
        System.out.println(savedChatRoom.getChatRoomno());

        // 3. 유저 정보 로딩
        User sender = userService.findById(senderId);
        User receiver = userService.findById(receiverId);

        // 4. 채팅 멤버 등록
        ChatRoomMember m1 = new ChatRoomMember();
        m1.setChatRoom(savedChatRoom);
        m1.setUser(sender);

        ChatRoomMember m2 = new ChatRoomMember();
        m2.setChatRoom(savedChatRoom);
        m2.setUser(receiver);

        chatRoomMemberRepository.save(m1);
        chatRoomMemberRepository.save(m2);

        // 5. 알림 전송
        notificationService.createNotification(
            receiverId,
            "chat",
            sender.getUsername() + "님이 [" + talent.getTitle() + "] 게시물에 대해 새 채팅을 시작했습니다.",
            savedChatRoom.getChatRoomno()     //targetId  알림눌렀을떄 사용할거
        );

        return savedChatRoom;
    }
    

  @Transactional
  public void forceDeleteChatRoom(Long chatRoomno) {
      ChatRoom chatRoom = chatRoomRepository.findById(chatRoomno)
          .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 채팅방입니다."));
  
      // 1. 메시지 삭제
      messageRepository.deleteByChatRoom(chatRoom);
  
      // 2. 채팅방 멤버 삭제
      chatRoomMemberRepository.deleteByChatRoom(chatRoom);
  
      // 3. 채팅방 삭제
      chatRoomRepository.delete(chatRoom);
  }
    
  //ChatRoomMemberService.java
  
  



}

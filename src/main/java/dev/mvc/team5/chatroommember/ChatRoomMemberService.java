package dev.mvc.team5.chatroommember;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import dev.mvc.team5.chatroom.ChatRoom;
import dev.mvc.team5.chatroom.chatroomdto.ChatRoomResponseDTO;
import dev.mvc.team5.chatroommember.ChatRoomMember;
import dev.mvc.team5.chatroommember.ChatRoomMemberRepository;
import dev.mvc.team5.user.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomMemberService {

    private final ChatRoomMemberRepository chatRoomMemberRepository;

    // 채팅방 멤버 입장 처리 (멤버 생성)
    public ChatRoomMember enterChatRoom(ChatRoom chatRoom, User user) {
        ChatRoomMember member = new ChatRoomMember();
        member.setChatRoom(chatRoom);
        member.setUser(user);
        // joinedAt는 @CreationTimestamp로 자동 입력
        return chatRoomMemberRepository.save(member);
    }

    public Collection<ChatRoomResponseDTO> findChatRoomsByUser(Long userno) {
      List<ChatRoomMember> members = chatRoomMemberRepository.findByUserUserno(userno);
      if (members == null || members.isEmpty()) {
          return Collections.emptyList();
      }
      return members.stream()
          .map(member -> {
              ChatRoom room = member.getChatRoom();
              return new ChatRoomResponseDTO(room.getChatRoomno(), room.getRoomName(), room.getCreatedAt());
          })
          .collect(Collectors.toList());
  }

    // 멤버 조회 등 필요하면 추가
}

package dev.mvc.team5.chatroommember;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomMemberRepository extends JpaRepository<ChatRoomMember, Long> {
    List<ChatRoomMember> findByChatRoomChatRoomno(Long chatRoomno);
    List<ChatRoomMember> findByUserUserno(Long userno);
}
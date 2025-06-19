package dev.mvc.team5.repository.message;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.mvc.team5.entity.chat.ChatRoomMember;

public interface ChatRoomMemberRepository extends JpaRepository<ChatRoomMember, Long> {
    List<ChatRoomMember> findByChatRoomChatRoomno(Long chatRoomno);
    List<ChatRoomMember> findByUserUserno(Long userno);
}
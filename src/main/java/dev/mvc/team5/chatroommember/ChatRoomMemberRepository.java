package dev.mvc.team5.chatroommember;

import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import dev.mvc.team5.chatroom.ChatRoom;

import org.springframework.data.jpa.repository.JpaRepository;


public interface ChatRoomMemberRepository extends JpaRepository<ChatRoomMember, Long> {
    List<ChatRoomMember> findByChatRoomChatRoomno(Long chatRoomno);
    
    List<ChatRoomMember> findByUserUserno(Long userno);
    
    @Transactional
    @Modifying
    @Query("DELETE FROM ChatRoomMember m WHERE m.chatRoom = :chatRoom")
    void deleteByChatRoom(@Param("chatRoom") ChatRoom chatRoom);
}
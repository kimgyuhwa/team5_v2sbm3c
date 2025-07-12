package dev.mvc.team5.chatroom;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
  
  @Query("""
      SELECT cr FROM ChatRoom cr
      WHERE cr.chatRoomno IN (
          SELECT crm1.chatRoom.chatRoomno FROM ChatRoomMember crm1 WHERE crm1.user.userno = :senderId
      )
      AND cr.chatRoomno IN (
          SELECT crm2.chatRoom.chatRoomno FROM ChatRoomMember crm2 WHERE crm2.user.userno = :receiverId
      )
  """)
  Optional<ChatRoom> findPrivateRoomByMembers(@Param("senderId") Long senderId, @Param("receiverId") Long receiverId);

  
}

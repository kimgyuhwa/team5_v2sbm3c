package dev.mvc.team5.chatroom;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import jakarta.transaction.Transactional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
  
  @Query("""
      SELECT cr FROM ChatRoom cr
      JOIN ChatRoomMember m1 ON m1.chatRoom = cr
      JOIN ChatRoomMember m2 ON m2.chatRoom = cr
      WHERE m1.user.userno = :senderId
        AND m2.user.userno = :receiverId
        AND cr.talent.talentno = :talentId
  """)
  Optional<ChatRoom> findPrivateRoomByMembersAndTalent(
      @Param("senderId") Long senderId,
      @Param("receiverId") Long receiverId,
      @Param("talentId") Long talentId
  );
  
  @Transactional
  @Modifying
  @Query("DELETE FROM ChatRoomMember m WHERE m.chatRoom = :chatRoom")
  void deleteByChatRoom(@Param("chatRoom") ChatRoom chatRoom);
 



  
}

package dev.mvc.team5.message;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatRoomChatRoomno(Long chatRoomno);
    List<Message> findByChatRoom_ChatRoomnoOrderBySentAtAsc(Long chatRoomno);
    
    @Query("SELECT m FROM Message m JOIN FETCH m.sender WHERE m.chatRoom.chatRoomno = :chatRoomno ORDER BY m.sentAt ASC")
    List<Message> findByChatRoomWithSender(@Param("chatRoomno") Long chatRoomno);

}
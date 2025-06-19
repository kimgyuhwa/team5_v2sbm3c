package dev.mvc.team5.message;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatRoomChatRoomno(Long chatRoomno);
    List<Message> findByChatRoomChatRoomnoOrderBySentAtAsc(Long chatRoomno);
}
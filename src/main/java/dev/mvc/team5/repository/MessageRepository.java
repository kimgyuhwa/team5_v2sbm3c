package dev.mvc.team5.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.mvc.team5.entity.chat.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatRoomChatRoomno(Long chatRoomno);
    List<Message> findByChatRoomChatRoomnoOrderBySentAtAsc(Long chatRoomno);
}
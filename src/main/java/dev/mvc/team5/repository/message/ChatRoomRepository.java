package dev.mvc.team5.repository.message;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.mvc.team5.entity.chat.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
}
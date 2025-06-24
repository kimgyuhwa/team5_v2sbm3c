package dev.mvc.team5.message.websocket;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RealtimeMessageDTO {
    private Long chatRoomno;  // 채팅방 번호
    private Long senderId;    // 보낸 사람 ID
    private String content;   // 메시지 내용
}

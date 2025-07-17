package dev.mvc.team5.chatroom.chatroomdto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class ChatRoomResponseDTO {
    private Long chatRoomno;
    private String roomName;
    private LocalDateTime createdAt;
    
    
}

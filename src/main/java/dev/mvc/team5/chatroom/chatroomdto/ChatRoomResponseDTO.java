package dev.mvc.team5.chatroom.chatroomdto;

import java.time.LocalDateTime;

import dev.mvc.team5.talents.Talent;
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
    public Long talentno;
    public String title; // 게시물 제목
    private Long receiverno;
    private String receiverName;
    
    public ChatRoomResponseDTO(Long chatRoomno, String roomName, LocalDateTime createdAt, Long talentno, String title) {
      this.chatRoomno = chatRoomno;
      this.roomName = roomName;
      this.createdAt = createdAt;
      this.talentno = talentno;
      this.title = title;
      this.receiverno = null;
      this.receiverName = null;
  }



}

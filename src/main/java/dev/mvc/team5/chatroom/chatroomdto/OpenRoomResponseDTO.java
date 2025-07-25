package dev.mvc.team5.chatroom.chatroomdto;

import java.time.LocalDateTime;
import java.util.List;

import dev.mvc.team5.chatroommember.chatroommemberdto.ChatRoomMemberResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class OpenRoomResponseDTO {

    private Long chatRoomno;
    private String roomName;
    private LocalDateTime createdAt;

    private boolean publicRoom = true;

    private Long creatorId;
    private String creatorName;

    private List<ChatRoomMemberResponseDTO> members;  // 공개방 멤버 전체 리스트
    
    public OpenRoomResponseDTO(Long chatRoomno, String roomName, LocalDateTime createdAt,
                               Long creatorId, String creatorName) {
        this.chatRoomno = chatRoomno;
        this.roomName = roomName;
        this.createdAt = createdAt;
        this.creatorId = creatorId;
        this.creatorName = creatorName;
    }

}

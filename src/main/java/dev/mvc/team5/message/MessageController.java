package dev.mvc.team5.message;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dev.mvc.team5.chatroom.ChatRoom;
import dev.mvc.team5.chatroom.ChatRoomService;
import dev.mvc.team5.message.*;
import dev.mvc.team5.message.messagedto.MessageCreateDTO;
import dev.mvc.team5.message.messagedto.MessageResponseDTO;
import dev.mvc.team5.user.User;
import dev.mvc.team5.user.UserService; // 가정
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;
    private final ChatRoomService chatRoomService;
    private final UserService userService;

    /**
     * 메시지 저장 (전송)
     * POST /messages/send
     * 
     * 클라이언트로부터 메시지 생성 요청을 받아서 DB에 저장하고,
     * 저장된 메시지 정보를 응답으로 반환함
     */
    @PostMapping("/send")
    public ResponseEntity<MessageResponseDTO> sendMessage(@RequestBody MessageCreateDTO dto) {
        
        // 1. 채팅방 ID를 통해 채팅방 엔티티 조회
        ChatRoom chatRoom = chatRoomService.findById(dto.getChatRoomno());
        
        // 2. 보낸 사용자 ID를 통해 User 엔티티 조회
        User sender = userService.findById(dto.getUserno());

        // 3. DTO → Entity 변환 후 저장 (toEntity는 ChatRoom과 User를 함께 넘김)
        Message saved = messageService.save(dto.toEntity(chatRoom, sender));

        // 4. 응답용 DTO 구성 (프론트에 필요한 정보만 가공해서 전달)
        MessageResponseDTO response = new MessageResponseDTO(
            saved.getMessageno(),                       // 메시지 고유 번호
            saved.getChatRoom().getChatRoomno(),        // 채팅방 번호
            saved.getSender().getUserno(),              // 보낸 사용자 번호
            saved.getContent(),                         // 메시지 내용
            saved.getSentAt()                           // 보낸 시간
        );

        // 5. 응답 반환 (200 OK + 메시지 정보)
        return ResponseEntity.ok(response);
    }

}

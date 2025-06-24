package dev.mvc.team5.chatroom;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dev.mvc.team5.chatroom.*;
import dev.mvc.team5.chatroom.chatroomdto.ChatRoomCreateDTO;
import dev.mvc.team5.chatroom.chatroomdto.ChatRoomResponseDTO;
import dev.mvc.team5.chatroommember.ChatRoomMember;
import dev.mvc.team5.chatroommember.ChatRoomMemberService;
import dev.mvc.team5.user.User;
import dev.mvc.team5.user.UserService; // 가정
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/chatroom")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final ChatRoomMemberService chatRoomMemberService;
    private final UserService userService;

    // 채팅방 생성
    @PostMapping(path="/save")
    public ResponseEntity<ChatRoomResponseDTO> createRoom(@RequestBody ChatRoomCreateDTO dto) {
        ChatRoom savedRoom = chatRoomService.save(dto.toEntity());
        ChatRoomResponseDTO response = new ChatRoomResponseDTO(
            savedRoom.getChatRoomno(),
            savedRoom.getRoomName(),
            savedRoom.getCreatedAt()
        );
        return ResponseEntity.ok(response);
    }

    // 채팅방 입장 (멤버 생성)
    @PostMapping("/{roomId}/enter/{userId}")
    public ResponseEntity<String> enterRoom(@PathVariable Long roomId, @PathVariable Long userId) {
        ChatRoom chatRoom = chatRoomService.findById(roomId);
        User user = userService.findById(userId);

        ChatRoomMember member = chatRoomMemberService.enterChatRoom(chatRoom, user);
        return ResponseEntity.ok("입장 완료: memberNo = " + member.getChatRoomMemberno());
    }
}

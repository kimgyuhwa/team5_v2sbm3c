package dev.mvc.team5.chatroom;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dev.mvc.team5.chatroom.chatroomdto.ChatRoomCreateDTO;
import dev.mvc.team5.chatroom.chatroomdto.ChatRoomResponseDTO;
import dev.mvc.team5.chatroommember.ChatRoomMember;
import dev.mvc.team5.chatroommember.ChatRoomMemberService;
import dev.mvc.team5.user.User;
import dev.mvc.team5.user.UserService;
import lombok.RequiredArgsConstructor;

/**
 * 채팅방 관련 API를 제공하는 컨트롤러
 */
@RestController
@RequestMapping("/chatroom")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final ChatRoomMemberService chatRoomMemberService;
    private final UserService userService;

    /**
     * 채팅방 생성 요청 처리
     * 
     * @param dto 채팅방 생성 DTO
     * @return 생성된 채팅방 정보 반환
     */
    @PostMapping(path="/save")
    public ResponseEntity<ChatRoomResponseDTO> createRoom(@RequestBody ChatRoomCreateDTO dto) {
        ChatRoom savedRoom = chatRoomService.save(dto.toEntity());
        ChatRoomResponseDTO response = new ChatRoomResponseDTO(
            savedRoom.getChatRoomno(),
            savedRoom.getRoomName(),
            savedRoom.getCreatedAt(),
            savedRoom.getTalent().getTalentno(),
            savedRoom.getTalent().getTitle()
        );
        return ResponseEntity.ok(response);
    }

    /**
     * 채팅방 입장 처리 (ChatRoomMember 생성)
     * 
     * @param roomId 채팅방 ID
     * @param userId 사용자 ID
     * @return 입장 완료 메시지 및 memberNo 반환
     */
    @PostMapping("/{roomId}/enter/{userId}")
    public ResponseEntity<String> enterRoom(@PathVariable(name="roomId") Long roomId, @PathVariable(name="userId") Long userId) {
        ChatRoom chatRoom = chatRoomService.findById(roomId);
        User user = userService.findById(userId);

        ChatRoomMember member = chatRoomMemberService.enterChatRoom(chatRoom, user);
        return ResponseEntity.ok("입장 완료: memberNo = " + member.getChatRoomMemberno());
    }

    /**
     * 사용자가 참여한 채팅방 목록 조회
     * 
     * @param userno 사용자 번호
     * @return 채팅방 리스트 반환
     */
    @GetMapping("/user/{userno}/chatlist")
    public List<ChatRoomResponseDTO> getChatListByUser(@PathVariable(name = "userno") Long userno) {
        return chatRoomService.findChatRoomsByUser(userno).stream()
            .map(room -> {
              Long talentno = room.getTalent() != null ? room.getTalent().getTalentno() : null;
              String title = room.getTalent() != null ? room.getTalent().getTitle() : null;
              return new ChatRoomResponseDTO(room.getChatRoomno(), room.getRoomName(), room.getCreatedAt(), talentno, title);
          })

            .collect(Collectors.toList());
    }


    /**
     * 1:1 채팅방 찾기 또는 생성
     * 이미 존재하는 경우 해당 방 반환, 없으면 새로 생성
     * 
     * @param senderId 보내는 사용자 ID
     * @param receiverId 받는 사용자 ID
     * @return 채팅방 정보 DTO
     */
    @PostMapping("/findOrCreate")
    public ResponseEntity<ChatRoomResponseDTO> findOrCreateChatRoom(
        @RequestParam(name="senderId") Long senderId,
        @RequestParam(name="receiverId") Long receiverId,
        @RequestParam(name="talentno") Long talentno,
        @RequestParam(name="title") String title
    ) {
        ChatRoom chatRoom = chatRoomService.findOrCreatePrivateChat(senderId, receiverId, talentno,title);
        ChatRoomResponseDTO dto = new ChatRoomResponseDTO(
            chatRoom.getChatRoomno(),
            chatRoom.getRoomName(),
            chatRoom.getCreatedAt(),
            chatRoom.getTalent().getTalentno(),
            chatRoom.getTalent().getTitle()
        );
        return ResponseEntity.ok(dto);
    }
    
    @GetMapping("/{chatRoomno}")
    public ResponseEntity<ChatRoomResponseDTO> getChatRoom(
        @PathVariable(name="chatRoomno") Long chatRoomno,
        @RequestParam(name="loginUserno") Long loginUserno   // 프론트에서 보내줘야 함
    ) {
        ChatRoom chatRoom = chatRoomService.findById(chatRoomno);

        List<ChatRoomMember> allMembers = chatRoomMemberService.findByChatRoomno(chatRoomno);
        ChatRoomMember other = allMembers.stream()
            .filter(m -> !m.getUser().getUserno().equals(loginUserno))
            .findFirst()
            .orElse(null);

        ChatRoomResponseDTO dto = new ChatRoomResponseDTO(
            chatRoom.getChatRoomno(),
            chatRoom.getRoomName(),
            chatRoom.getCreatedAt(),
            chatRoom.getTalent() != null ? chatRoom.getTalent().getTalentno() : null,
            chatRoom.getTalent() != null ? chatRoom.getTalent().getTitle() : null,
            other != null ? other.getUser().getUserno() : null,
            other != null ? other.getUser().getUsername() : null
        );

        return ResponseEntity.ok(dto);
    }

    
    @DeleteMapping("/{chatRoomno}")
    public ResponseEntity<Void> deleteChatRoom(@PathVariable(name="chatRoomno") Long chatRoomno) {
        chatRoomService.forceDeleteChatRoom(chatRoomno);
        return ResponseEntity.noContent().build(); // HTTP 204
    }


}

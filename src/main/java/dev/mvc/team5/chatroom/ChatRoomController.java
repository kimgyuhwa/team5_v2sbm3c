package dev.mvc.team5.chatroom;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dev.mvc.team5.chatroom.chatroomdto.ChatRoomCreateDTO;
import dev.mvc.team5.chatroom.chatroomdto.ChatRoomResponseDTO;
import dev.mvc.team5.chatroom.chatroomdto.OpenRoomCreateDTO;
import dev.mvc.team5.chatroommember.ChatRoomMember;
import dev.mvc.team5.chatroommember.ChatRoomMemberService;
import dev.mvc.team5.user.User;
import dev.mvc.team5.user.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/chatroom")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final ChatRoomMemberService chatRoomMemberService;
    private final UserService userService;

    /**
     * [POST] 채팅방 생성 (1:1 또는 재능기반)
     */
    @PostMapping(path="/save")
    public ResponseEntity<ChatRoomResponseDTO> createRoom(@RequestBody ChatRoomCreateDTO dto) {
        ChatRoom savedRoom = chatRoomService.save(dto.toEntity());

        ChatRoomResponseDTO response = new ChatRoomResponseDTO(
            savedRoom.getChatRoomno(),
            savedRoom.getRoomName(),
            savedRoom.getCreatedAt(),
            savedRoom.getTalent().getTalentno(),
            savedRoom.getTalent().getTitle(),
            null,
            null
        );

        return ResponseEntity.ok(response);
    }

    /**
     * [POST] 채팅방 입장 (사용자 - 채팅방 멤버 연결)
     */
    @PostMapping("/{roomId}/enter/{userId}")
    public ResponseEntity<String> enterRoom(@PathVariable(name="roomId") Long roomId, @PathVariable(name="userId") Long userId) {
        ChatRoom chatRoom = chatRoomService.findById(roomId);
        User user = userService.findById(userId);

        ChatRoomMember member = chatRoomMemberService.enterChatRoom(chatRoom, user);
        return ResponseEntity.ok("입장 완료: memberNo = " + member.getChatRoomMemberno());
    }

    /**
     * [GET] 특정 유저가 참여 중인 채팅방 목록 조회
     */
    @GetMapping("/user/{userno}/chatlist")
    public List<ChatRoomResponseDTO> getChatListByUser(@PathVariable(name = "userno") Long userno) {
        return chatRoomService.findChatRoomsByUser(userno).stream()
            .map(room -> {
              Long talentno = room.getTalent() != null ? room.getTalent().getTalentno() : null;
              String title = room.getTalent() != null ? room.getTalent().getTitle() : null;

              return new ChatRoomResponseDTO(
                  room.getChatRoomno(),
                  room.getRoomName(),
                  room.getCreatedAt(),
                  talentno,
                  title,
                  room.getCreator() != null ? room.getCreator().getUserno() : null,
                  room.getCreator() != null ? room.getCreator().getUsername() : null
              );
            })
            .collect(Collectors.toList());
    }

    /**
     * [POST] 1:1 채팅방 찾기 또는 없으면 생성
     * - 동일한 유저 조합 + 재능 게시글이면 재사용
     */
    @PostMapping("/findOrCreate")
    public ResponseEntity<ChatRoomResponseDTO> findOrCreateChatRoom(
        @RequestParam(name="senderId") Long senderId,
        @RequestParam(name="receiverId") Long receiverId,
        @RequestParam(name="talentno") Long talentno,
        @RequestParam(name="title") String title
    ) {
        ChatRoom chatRoom = chatRoomService.findOrCreatePrivateChat(senderId, receiverId, talentno, title);

        ChatRoomResponseDTO dto = new ChatRoomResponseDTO(
            chatRoom.getChatRoomno(),
            chatRoom.getRoomName(),
            chatRoom.getCreatedAt(),
            chatRoom.getTalent().getTalentno(),
            chatRoom.getTalent().getTitle(),
            chatRoom.getCreator() != null ? chatRoom.getCreator().getUserno() : null,
            chatRoom.getCreator() != null ? chatRoom.getCreator().getUsername() : null
        );

        return ResponseEntity.ok(dto);
    }

    /**
     * [GET] 채팅방 상세 조회
     * - 상대방 정보 (로그인 유저 제외한 멤버)를 함께 리턴
     */
    @GetMapping("/{chatRoomno}")
    public ResponseEntity<ChatRoomResponseDTO> getChatRoom(
        @PathVariable(name="chatRoomno") Long chatRoomno,
        @RequestParam(name="loginUserno") Long loginUserno
    ) {
        ChatRoom chatRoom = chatRoomService.findById(chatRoomno);

        List<ChatRoomMember> allMembers = chatRoomMemberService.findByChatRoomno(chatRoomno);
        ChatRoomMember other = allMembers.stream()
            .filter(m -> !m.getUser().getUserno().equals(loginUserno))  // 로그인 유저 제외
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

    /**
     * [DELETE] 채팅방 삭제 (관리자 전용 또는 강제 삭제)
     */
    @DeleteMapping("/{chatRoomno}")
    public ResponseEntity<Void> deleteChatRoom(@PathVariable(name="chatRoomno") Long chatRoomno) {
        chatRoomService.forceDeleteChatRoom(chatRoomno);
        return ResponseEntity.noContent().build();
    }

    /**
     * [POST] 공개 채팅방 생성
     * - 별도의 Talent 없이 생성 가능
     */
    @PostMapping("/open")
    public ResponseEntity<ChatRoomResponseDTO> createOpenChatRoom(@RequestBody OpenRoomCreateDTO dto) {
        User creator = userService.findById(dto.getCreatorId());
        ChatRoom room = dto.toEntity(creator);
        ChatRoom savedRoom = chatRoomService.save(room);

        // 생성자도 입장 처리
        ChatRoomMember member = new ChatRoomMember();
        member.setChatRoom(savedRoom);
        member.setUser(creator);
        chatRoomMemberService.save(member);

        ChatRoomResponseDTO response = new ChatRoomResponseDTO(
            savedRoom.getChatRoomno(),
            savedRoom.getRoomName(),
            savedRoom.getCreatedAt(),
            null,
            null,
            creator.getUserno(),
            creator.getUsername()
        );
        return ResponseEntity.ok(response);
    }

    /**
     * [GET] 전체 공개 채팅방 목록 조회
     */
    @GetMapping("/public")
    public List<ChatRoomResponseDTO> getPublicChatRooms() {
        List<ChatRoom> rooms = chatRoomService.getAllPublicChatRooms();

        return rooms.stream()
            .map(room -> new ChatRoomResponseDTO(
                room.getChatRoomno(),
                room.getRoomName(),
                room.getCreatedAt(),
                null,
                null,
                room.getCreator() != null ? room.getCreator().getUserno() : null,
                room.getCreator() != null ? room.getCreator().getUsername() : null
            ))
            .collect(Collectors.toList());
    }
}

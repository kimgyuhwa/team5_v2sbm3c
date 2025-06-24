package dev.mvc.team5.message.websocket;

import dev.mvc.team5.message.websocket.RealtimeMessageDTO;
import dev.mvc.team5.message.websocket.RealtimeChatService;
import lombok.RequiredArgsConstructor;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class RealtimeChatController {

    private final RealtimeChatService realtimeChatService;

    // 클라이언트가 /app/chat.sendMessage 로 보내면 실행
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")  // 모든 구독자에게 메시지 브로드캐스트
    public RealtimeMessageDTO sendMessage(RealtimeMessageDTO messageDTO) {
        // DB 저장
        realtimeChatService.saveMessage(messageDTO);

        // 그대로 다시 리턴해서 구독자에 뿌림
        return messageDTO;
    }
}

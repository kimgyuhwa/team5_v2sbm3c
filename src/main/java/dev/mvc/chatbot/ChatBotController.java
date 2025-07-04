package dev.mvc.chatbot;

import dev.mvc.chatbot.chatbotdto.ChatBotCreateDTO;
import dev.mvc.chatbot.chatbotdto.ChatBotResponseDTO;
import dev.mvc.chatbot.chatbotdto.ChatBotUpdateDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/chatbot")
@RequiredArgsConstructor
public class ChatBotController {

    private final ChatBotService chatbotService;

//    /**
//     * 챗봇 주요내용 생성
//     */
//    @PostMapping("/save")
//    public ChatBotResponseDTO create(@RequestBody ChatBotCreateDTO dto) {
//        return chatbotService.save(dto);
//    }

    /**
     * 챗봇 주요내용 단건 조회
     */
    @GetMapping("/{chatbotno}")
    public Optional<ChatBotResponseDTO> getById(@PathVariable Long chatbotno) {
        return chatbotService.findById(chatbotno);
    }

    /**
     * 챗봇 주요내용 수정
     */
    @PutMapping("/update")
    public ChatBotResponseDTO update(@RequestBody ChatBotUpdateDTO dto) {
        return chatbotService.update(dto);
    }

    /**
     * 챗봇 주요내용 삭제
     */
    @DeleteMapping("/delete/{chatbotno}")
    public void delete(@PathVariable Long chatbotno) {
        chatbotService.delete(chatbotno);
    }

    /**
     * 유저 번호로 챗봇 주요내용 목록 조회 (페이징)
     */
    @GetMapping("/list/{userno}")
    public Page<ChatBotResponseDTO> listByUserno(
            @PathVariable Long userno,
            Pageable pageable) {
        return chatbotService.listByUserno(userno, pageable);
    }

    /**
     * 유저 번호와 이름 키워드로 필터링된 챗봇 주요내용 목록 조회 (페이징)
     */
    @GetMapping("/list/search")
    public Page<ChatBotResponseDTO> listByUsernoAndName(
            @RequestParam Long userno,
            @RequestParam String name,
            Pageable pageable) {
        return chatbotService.listByUsernoAndName(userno, name, pageable);
    }
    
    /**
     * 챗봇 주요내용 생성
     */
    @PostMapping("/api/chatbot/save")
    public ResponseEntity<?> saveChatBot(@RequestBody ChatBotCreateDTO dto) {
        ChatBotResponseDTO response = chatbotService.save(dto);
        return ResponseEntity.ok(response);
    }

}

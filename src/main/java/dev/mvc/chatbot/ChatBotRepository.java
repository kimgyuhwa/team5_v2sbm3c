package dev.mvc.chatbot;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.mvc.team5.talents.Talent;

@Repository
public interface ChatBotRepository  extends JpaRepository<ChatBot, Long> {

  // 특정 유저 번호에 해당하는 주요내용 목록 조회 (페이징 + 최신순 정렬)
  Page<ChatBot> findByUser_UsernoOrderByChatbotnoDesc(Long userno, Pageable pageable);

  // 특정 유저 번호와 이름 키워드로 필터링한 주요내용 목록 조회 (페이징 + 최신순 정렬)
  Page<ChatBot> findByUser_UsernoAndUser_NameContainingOrderByChatbotnoDesc(
      Long userno, String name, Pageable pageable);

  
}

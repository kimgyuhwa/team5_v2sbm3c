package dev.mvc.chatbot.chatbotdto;

import dev.mvc.chatbot.ChatBot;
import dev.mvc.team5.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class ChatBotCreateDTO {
  
  private Long userno;
  private String content;
  
}

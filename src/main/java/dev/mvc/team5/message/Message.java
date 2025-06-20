package dev.mvc.team5.message;

import java.time.LocalDateTime;

import dev.mvc.team5.chatroom.ChatRoom;
import dev.mvc.team5.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "messages_seq")
    @SequenceGenerator(name = "messages_seq", sequenceName = "MESSAGES_SEQ", allocationSize = 1)
   
    private Long messagesno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatRoom")
    private ChatRoom chatRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userno")
    private User sender;

    private String content;

    private LocalDateTime sentAt;
// zz
}
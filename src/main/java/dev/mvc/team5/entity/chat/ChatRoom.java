package dev.mvc.team5.entity.chat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import dev.mvc.team5.entity.school.Places;
import dev.mvc.team5.entity.school.SchoolGwan;
import dev.mvc.team5.entity.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "chat_rooms")
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chatRoom_seq")
    @SequenceGenerator(name = "chatRoom_seq", sequenceName = "CHATROOM_SEQ", allocationSize = 1)
    private Long chatRoomno;

    private String roomName;
    
    private LocalDateTime createAt;

    // === 연관 관계 ===zz

    @OneToMany(mappedBy = "chatRoom")
    private List<ChatRoomMember> chatRoomMembers = new ArrayList<>();

    @OneToMany(mappedBy = "chatRoom")
    private List<Message> messages = new ArrayList<>();

    // === 생성자, getter, setter ===
}
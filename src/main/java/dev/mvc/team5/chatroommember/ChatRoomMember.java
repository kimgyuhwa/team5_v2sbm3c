package dev.mvc.team5.chatroommember;

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
@Table(name = "chat_room_members")
public class ChatRoomMember {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chatRoomMembers_seq")
    @SequenceGenerator(name = "chatRoomMembers_seq", sequenceName = "CHATROOMMENBERS_SEQ", allocationSize = 1)
  
    private Long chatRoomMembersno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatRoom")
    private ChatRoom chatRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userno")
    private User user;

    private LocalDateTime joinedAt;
// zz

}
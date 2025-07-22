package dev.mvc.team5.notification;

import lombok.Data;


@Data
public class NotificationDTO {
    private Long notificationno;

    private Long userno;
    private String type;
    private String message;
    private Boolean read;
    private String createdAt;
<<<<<<< HEAD
 // 알림이 가리키는 대상 엔티티의 ID
    private Long targetId;
=======
    
    private String title;
>>>>>>> 805be5b93e8703e20c39ca6c0058be9269c08b28
}

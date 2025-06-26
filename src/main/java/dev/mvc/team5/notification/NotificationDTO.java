package dev.mvc.team5.notification;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NotificationDTO {
    private Long userno;
    private String type;
    private String message;
    private Boolean read;
    private LocalDateTime createdAt;
}

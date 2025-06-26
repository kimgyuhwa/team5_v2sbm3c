package dev.mvc.team5.notification;

import java.util.List;

public interface NotificationService {
    Notification create(NotificationDTO dto);
    List<NotificationResponseDTO> getByUser(Long userno);
    void markAsRead(Integer notificationno);
    void delete(Integer notificationno);
}

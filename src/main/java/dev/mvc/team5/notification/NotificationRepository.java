package dev.mvc.team5.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
  // 필요하다면 커스텀 쿼리 추가 가능
}

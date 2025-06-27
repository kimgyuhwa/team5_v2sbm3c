package dev.mvc.team5.notification;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface NotificationRepository extends JpaRepository<Notification, Long> {
  // 사용자는 본인알람만 볼수있음
  List<Notification> findByUserUsernoOrderByCreatedAtDesc(Long userno);
  // 미확인 알림 숫자 
  Long countByUserUsernoAndReadFalse(Long userno);
}


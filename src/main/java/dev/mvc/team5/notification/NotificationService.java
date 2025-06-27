package dev.mvc.team5.notification;


import dev.mvc.team5.user.User;
import dev.mvc.team5.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository repo;

    @Autowired
    private UserRepository userRepo;

    public List<Notification> findAll() {
        return repo.findAll();
    }

    public Optional<Notification> findById(Long id) {
        return repo.findById(id);
    }
    // 사용자 본인 알람만 볼수있음
    public List<Notification> findByUser(Long userno) {
      return repo.findAll().stream()
                 .filter(n -> n.getUser().getUserno().equals(userno))
                 .toList();
  }
    //사용자가 알림을 클릭하면 read = true로 업데이트
    public void markAsRead(Long id) {
      Notification n = repo.findById(id).orElseThrow();
      n.setRead(true);
      repo.save(n);
  }
    // 프론트 상단 미확인알림 숫자 표시용
    public Long countUnread(Long userno) {
      return repo.findByUserUsernoOrderByCreatedAtDesc(userno).stream()
                 .filter(n -> !n.getRead())
                 .count();
  }

    public Notification save(NotificationDTO dto) {
        Notification n = new Notification();
        User user = userRepo.findById(dto.getUserno()).orElseThrow();
        n.setUser(user);
        n.setType(dto.getType());
        n.setMessage(dto.getMessage());
        n.setRead(false);
        n.setCreatedAt(LocalDateTime.now());
        return repo.save(n);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

}

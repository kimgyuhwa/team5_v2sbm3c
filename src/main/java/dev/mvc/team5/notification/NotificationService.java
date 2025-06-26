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

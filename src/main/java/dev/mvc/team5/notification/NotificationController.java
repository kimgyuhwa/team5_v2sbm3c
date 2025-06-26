package dev.mvc.team5.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
 // Controller 테스트 안해봄
@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    public ResponseEntity<Notification> create(@RequestBody NotificationDTO dto) {
        return ResponseEntity.ok(notificationService.create(dto));
    }

    @GetMapping("/user/{userno}")
    public ResponseEntity<List<NotificationResponseDTO>> getByUser(@PathVariable Long userno) {
        return ResponseEntity.ok(notificationService.getByUser(userno));
    }

    @PutMapping("/{notificationno}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Integer notificationno) {
        notificationService.markAsRead(notificationno);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{notificationno}")
    public ResponseEntity<?> delete(@PathVariable Integer notificationno) {
        notificationService.delete(notificationno);
        return ResponseEntity.noContent().build();
    }
}

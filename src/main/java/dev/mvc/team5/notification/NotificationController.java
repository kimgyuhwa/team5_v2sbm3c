package dev.mvc.team5.notification;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService service;

    @GetMapping
    public List<NotificationDTO> getAll() {
        return service.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @PostMapping
    public NotificationDTO create(@RequestBody NotificationDTO dto) {
        return toDTO(service.save(dto));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    private NotificationDTO toDTO(Notification n) {
        NotificationDTO dto = new NotificationDTO();
        dto.setNotificationno(n.getNotificationno());
        dto.setUserno(n.getUser().getUserno());
        dto.setType(n.getType());
        dto.setMessage(n.getMessage());
        dto.setRead(n.getRead());
        dto.setCreatedAt(n.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        return dto;

    }
}

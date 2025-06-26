package dev.mvc.team5.notification;

import dev.mvc.team5.user.User;
import dev.mvc.team5.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service // 이 클래스가 스프링의 서비스 빈으로 등록됨을 의미
@RequiredArgsConstructor // 생성자 주입을 자동으로 생성해줌 (final 필드 자동 주입)
public class NotificationServiceImpl implements NotificationService {

    // 필요한 의존성들을 final로 선언하고 @RequiredArgsConstructor로 주입
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    /**
     * 알림 생성
     */
    @Override
    public Notification create(NotificationDTO dto) {
        // 전달받은 userno로 실제 유저 객체를 가져옴. 없으면 예외 발생
        User user = userRepository.findById(dto.getUserno())
                .orElseThrow(() -> new RuntimeException("유저 없음"));

        // 알림 객체 생성 및 필드 설정
        Notification notification = new Notification();
        notification.setUser(user); // 외래키 설정
        notification.setType(dto.getType());
        notification.setMessage(dto.getMessage());
        notification.setRead(false); // 기본값: 안 읽음
        notification.setCreatedAt(LocalDateTime.now()); // 현재 시간 저장

        // 알림 저장 후 반환
        return notificationRepository.save(notification);
    }

    /**
     * 특정 유저의 알림 목록 조회
     */
    @Override
    public List<NotificationResponseDTO> getByUser(Long userno) {
        // 특정 유저의 알림들을 조회하고, 각각 DTO로 변환
        return notificationRepository.findByUserUserno(userno).stream()
                .map(n -> {
                    NotificationResponseDTO dto = new NotificationResponseDTO();
                    dto.setNotificationno(n.getNotificationno());
                    dto.setUserno(n.getUser().getUserno());
                    dto.setUsername(n.getUser().getUsername());
                    dto.setType(n.getType());
                    dto.setMessage(n.getMessage());
                    dto.setRead(n.getRead());
                    dto.setCreatedAt(n.getCreatedAt());
                    return dto;
                })
                .collect(Collectors.toList()); // DTO 리스트로 변환
    }

    /**
     * 알림 읽음 처리
     */
    @Override
    public void markAsRead(Integer notificationno) {
        // 알림 ID로 알림 조회, 없으면 예외
        Notification notification = notificationRepository.findById(notificationno)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        // 읽음 처리 후 저장
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    /**
     * 알림 삭제
     */
    @Override
    public void delete(Integer notificationno) {
        // 알림 삭제 (존재하지 않아도 예외 안 남)
        notificationRepository.deleteById(notificationno);
    }
}

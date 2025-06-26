package dev.mvc.team5.activitylog;

import dev.mvc.team5.user.User;
import dev.mvc.team5.user.UserDTO;
import dev.mvc.team5.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityLogService {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * ✅ 모든 활동 로그 가져오기 (DTO 변환)
     */
    public List<ActivityLogDTO> getAll() {
        return activityLogRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * ✅ 특정 사용자(userno)의 모든 활동 로그 가져오기 (DTO 변환)
     */
    public List<ActivityLogDTO> getByUser(Long userno) {
        return activityLogRepository.findByUser_Userno(userno)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * ✅ 특정 액션 키워드로 활동 로그 가져오기 (DTO 변환)
     */
    public List<ActivityLogDTO> getByAction(String action) {
        return activityLogRepository.findByAction(action)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * ✅ 기간으로 활동 로그 가져오기 (DTO 변환)
     * @param start 시작 시간 (ISO_DATE_TIME 형식)
     * @param end 끝 시간 (ISO_DATE_TIME 형식)
     */
    public List<ActivityLogDTO> getByPeriod(String start, String end) {
        LocalDateTime startTime = LocalDateTime.parse(start, DateTimeFormatter.ISO_DATE_TIME);
        LocalDateTime endTime = LocalDateTime.parse(end, DateTimeFormatter.ISO_DATE_TIME);
        return activityLogRepository.findByCreatedAtBetween(startTime, endTime)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * ✅ 전체 최신 로그 N개 가져오기 (엔티티 그대로)
     */
    public List<ActivityLog> findLatest(int limit) {
        return activityLogRepository
                .findAllByOrderByCreatedAtDesc(PageRequest.of(0, limit))
                .getContent();
    }

    /**
     * ✅ 특정 사용자(userno)의 최신 로그 N개 가져오기 (엔티티 그대로)
     */
    public List<ActivityLog> findLatestByUser(Long userno, int limit) {
        return activityLogRepository
                .findByUserUsernoOrderByCreatedAtDesc(userno, PageRequest.of(0, limit))
                .getContent();
    }

    /**
     * ✅ 새로운 활동 로그 저장 (DTO -> 엔티티)
     */
    public ActivityLog save(ActivityLogDTO dto) {
        ActivityLog entity = new ActivityLog();
        User user = userRepository.findById(dto.getUserno()).orElseThrow();
        entity.setUser(user);
        entity.setAction(dto.getAction());
        entity.setDetail(dto.getDetail());
        entity.setCreatedAt(LocalDateTime.now());
        return activityLogRepository.save(entity);
    }

    /**
     * ✅ 활동 로그 삭제 (PK 기준)
     */
    public void deleteById(Long id) {
        activityLogRepository.deleteById(id);
    }

    /**
     * ✅ 엔티티 → DTO 변환 헬퍼
     */
    private ActivityLogDTO toDTO(ActivityLog log) {
        ActivityLogDTO dto = new ActivityLogDTO();
        dto.setActlogno(log.getActlogno());
        dto.setUserno(log.getUser().getUserno());
        dto.setAction(log.getAction());
        dto.setDetail(log.getDetail());
        dto.setCreatedAt(log.getCreatedAt());
        return dto;
    }
    // 로그인 로그
    public void logLogin(Long userno, String ip) {
      User user = userRepository.findById(userno).orElseThrow();
      ActivityLog log = new ActivityLog();
      log.setUser(user);
      log.setAction("LOGIN");
      log.setDetail("{\"ip\":\"" + ip + "\"}");
      log.setCreatedAt(LocalDateTime.now());
      activityLogRepository.save(log);
  }
    // 로그아웃 로그
    public void logLogout(Long userno, String ip) {
      User user = userRepository.findById(userno).orElseThrow();
      ActivityLog log = new ActivityLog();
      log.setUser(user);
      log.setAction("LOGOUT");
      log.setDetail("{\"ip\":\"" + ip + "\"}");
      log.setCreatedAt(LocalDateTime.now());
      activityLogRepository.save(log);
  }
    

}
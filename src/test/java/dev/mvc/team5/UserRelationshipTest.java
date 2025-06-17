package dev.mvc.team5;

import dev.mvc.team5.entity.school.School;
import dev.mvc.team5.entity.user.ActivityLog;
import dev.mvc.team5.entity.user.Block;
import dev.mvc.team5.entity.user.LoginLog;
import dev.mvc.team5.entity.user.Notification;
import dev.mvc.team5.entity.user.Report;
import dev.mvc.team5.entity.user.User;
import dev.mvc.team5.repository.*;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
@Transactional
public class UserRelationshipTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SchoolRepository schoolRepository;

    @Autowired
    private ActivityLogRepository activityLogRepository;

    @Autowired
    private LoginLogRepository loginLogRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private BlockRepository blockRepository;

    @Autowired
    private ReportRepository reportRepository;

    private User user1;
    private User user2;

    @BeforeEach
    public void setup() {
        // 학교 생성
        School school = new School();
        school.setSchoolname("Test School");
        schoolRepository.save(school);

        // 사용자 생성
        user1 = new User("user1", "pass1", "User One", school);
        userRepository.save(user1);

        user2 = new User("user2", "pass2", "User Two", school);
        userRepository.save(user2);
    }

    @Test
    public void testActivityLog() {
        ActivityLog log = new ActivityLog();
        log.setUserno(user1);
        log.setAction("LOGIN");
        log.setDetail("User logged in successfully.");
        log.setCreatedAt(LocalDateTime.now());
        activityLogRepository.save(log);

        System.out.println("ActivityLog saved: " + log);
    }

    @Test
    public void testLoginLog() {
        LoginLog log = new LoginLog();
        log.setUserno(user1);
        log.setLoginTime(LocalDateTime.now());
        log.setIpAddress("127.0.0.1");
        loginLogRepository.save(log);

        System.out.println("LoginLog saved: " + log);
    }

    @Test
    public void testNotification() {
        Notification notification = new Notification();
        notification.setUserno(user1);
        notification.setMessage("Welcome to the system!");
        notification.setCreatedAt(LocalDateTime.now());
        notificationRepository.save(notification);

        System.out.println("Notification saved: " + notification);
    }

    @Test
    public void testBlock() {
        Block block = new Block();
        block.setBlocker(user1);
        block.setBlocked(user2);
        block.setCreatedAt(LocalDateTime.now());
        blockRepository.save(block);

        System.out.println("Block saved: " + block);
    }

    @Test
    public void testReport() {
        Report report = new Report();
        report.setReporter(user1);
        report.setReported(user2);
        report.setReason("Inappropriate behavior");
        report.setCreatedAt(LocalDateTime.now());
        reportRepository.save(report);

        System.out.println("Report saved: " + report);
    }

}

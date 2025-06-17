package dev.mvc.team5;

import dev.mvc.team5.entity.school.School;
import dev.mvc.team5.entity.user.User;
import dev.mvc.team5.repository.SchoolRepository;
import dev.mvc.team5.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class UserTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SchoolRepository schoolRepository;

    @Test
    void createUserWithSchoolTest() {
        // 1) 학교 먼저 저장
        School school = new School();
        school.setSchoolname("테스트학교");
        School savedSchool = schoolRepository.save(school);

        // 2) 유저 생성 + 학교 연결
        User user = new User("testId", "password123", "홍길동", savedSchool);

        // 3) 저장
        User savedUser = userRepository.save(user);

        // 4) 검증
        assertThat(savedUser.getUserno()).isNotNull();
        assertThat(savedUser.getSchoolno()).isNotNull();
        assertThat(savedUser.getSchoolno().getSchoolname()).isEqualTo("테스트학교");
    }
}
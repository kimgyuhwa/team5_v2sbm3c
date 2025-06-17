package dev.mvc.team5;

import dev.mvc.team5.entity.School;
import dev.mvc.team5.entity.Talent;
import dev.mvc.team5.entity.user.User;
import dev.mvc.team5.repository.TalentRepository;
import dev.mvc.team5.repository.SchoolRepository;
import dev.mvc.team5.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class TalentRepositoryTest {

    @Autowired
    private TalentRepository talentRepository;
    
    @Autowired
    private SchoolRepository schoolRepository;
    
    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setup() {
        // 학교 저장
        School school = schoolRepository.save(new School("테스트 학교"));
  
        // 사용자 저장
        User user = userRepository.save(new User("user", "user123", "유저", school));
                
        talentRepository.save(new Talent(user, school, "기타 레슨 합니다", "기초부터 알려드려요", "Korean"));
        talentRepository.save(new Talent(user, school, "피아노 레슨 가능", "1:1 맞춤", "Korean"));
        talentRepository.save(new Talent(user, school, "운동 코칭", "헬스, PT", "Korean"));
    }

    @Test
    @DisplayName("제목에 '레슨'이 포함된 재능 글 검색")
    void testFindByTitleContaining() {
        List<Talent> results = talentRepository.findByTitleContaining("레슨");

        assertThat(results).hasSize(2);
        assertThat(results).allMatch(t -> t.getTitle().contains("레슨"));
    }
}

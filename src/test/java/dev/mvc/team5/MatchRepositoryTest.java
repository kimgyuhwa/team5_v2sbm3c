package dev.mvc.team5;

import dev.mvc.team5.entity.school.School;
import dev.mvc.team5.entity.talents.Match;
import dev.mvc.team5.entity.talents.Talent;
import dev.mvc.team5.entity.user.User;
import dev.mvc.team5.repository.MatchRepository;
import dev.mvc.team5.repository.SchoolRepository;
import dev.mvc.team5.repository.TalentRepository;
import dev.mvc.team5.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class MatchRepositoryTest {

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TalentRepository talentRepository;

    @Autowired
    private SchoolRepository schoolRepository;

    private User giver;
    private User receiver;
    private Talent talent;
    private School school;

    @BeforeEach
    void setup() {
        // 학교 저장
        school = schoolRepository.save(new School("테스트 학교"));

        // 유저 저장 (필요한 생성자 만들어야 함)
        giver = userRepository.save(new User("giver@example.com", "giver123", "기버", school));
        receiver = userRepository.save(new User("receiver@example.com", "recv123", "리시버", school));

        // Talent 저장 (user, school 필수)
        talent = talentRepository.save(new Talent(giver, school,
                "기타 레슨", "자세히 알려드려요", "Korean"));
    }

    @Test
    @DisplayName("매칭 생성 및 저장 테스트")
    void testSaveMatch() {
        LocalDateTime completedTime = LocalDateTime.now();
        Match match = new Match(giver, receiver, talent, completedTime);

        Match saved = matchRepository.save(match);

        assertThat(saved.getMatchNo()).isNotNull();
        assertThat(saved.getGiver().getUserno()).isEqualTo(giver.getUserno());
        assertThat(saved.getReceiver().getUserno()).isEqualTo(receiver.getUserno());
        assertThat(saved.getTalent().getTalentNo()).isEqualTo(talent.getTalentNo());
        
        Match saved1 = matchRepository.saveAndFlush(match);  // saveAndFlush로 즉시 DB 반영
        assertThat(saved1.getStartedAt()).isNotNull(); // @CreationTimestamp 확인
        
        assertThat(saved.getCompletedAt()).isEqualTo(completedTime);        
    }
}

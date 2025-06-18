package dev.mvc.team5;

import dev.mvc.team5.entity.*;
import dev.mvc.team5.entity.school.School;
import dev.mvc.team5.entity.talents.Request;
import dev.mvc.team5.entity.talents.RequestStatus;
import dev.mvc.team5.entity.talents.Talent;
import dev.mvc.team5.entity.user.User;
import dev.mvc.team5.repository.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class RequestRepositoryTest {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private TalentRepository talentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SchoolRepository schoolRepository;

    @Test
    @DisplayName("특정 Talent에 대한 요청 저장 및 상태별 조회 테스트")
    void testSaveAndFindByStatus() {
        // 학교 저장
        School school = schoolRepository.save(new School("테스트 학교"));

        // 사용자 저장
        User giver = userRepository.save(new User("giver@example.com", "giver123", "기버", school));
        User requester = userRepository.save(new User("requester@example.com", "req123", "요청자", school));

        // 재능 저장
        Talent talent = talentRepository.save(new Talent(
                giver,
                school,
                "기타 레슨 합니다",
                "기초부터 알려드려요",
                "Korean"
        ));

        // 요청 저장
        Request request1 = new Request(talent, requester, RequestStatus.PENDING, "첫번째 요청 메시지");
        Request request2 = new Request(talent, requester, RequestStatus.ACCEPTED, "두번째 요청 메시지");

        requestRepository.save(request1);
        requestRepository.save(request2);

        // 상태별 조회
        List<Request> pendingRequests = requestRepository.findByStatus(RequestStatus.PENDING);
        assertThat(pendingRequests).hasSize(1);
        assertThat(pendingRequests.get(0).getMessage()).isEqualTo("첫번째 요청 메시지");

        // Talent 기준 조회

        List<Request> requestsByTalent = requestRepository.findByTalent_talentno(talent.getTalentno());
        assertThat(requestsByTalent).hasSize(2);
    }
}

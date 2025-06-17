package dev.mvc.team5;

import dev.mvc.team5.entity.Request;
import dev.mvc.team5.entity.RequestStatus;
import dev.mvc.team5.entity.Talent;
import dev.mvc.team5.repository.RequestRepository;
import dev.mvc.team5.repository.TalentRepository;
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

    @Test
    @DisplayName("특정 Talent에 대한 요청 저장 및 상태별 조회 테스트")
    void testSaveAndFindByStatus() {
        Talent talent = talentRepository.save(new Talent("기타 레슨 합니다", "기초부터 알려드려요", "Korean"));

        Request request1 = new Request(talent, RequestStatus.PENDING, "첫번째 요청 메시지");
        Request request2 = new Request(talent, RequestStatus.ACCEPTED, "두번째 요청 메시지");

        requestRepository.save(request1);
        requestRepository.save(request2);

        List<Request> pendingRequests = requestRepository.findByStatus(RequestStatus.PENDING);
        assertThat(pendingRequests).hasSize(1);
        assertThat(pendingRequests.get(0).getMessage()).isEqualTo("첫번째 요청 메시지");

        List<Request> requestsByTalent = requestRepository.findByTalent_TalentNo(talent.getTalentNo());
        assertThat(requestsByTalent).hasSize(2);
    }
}

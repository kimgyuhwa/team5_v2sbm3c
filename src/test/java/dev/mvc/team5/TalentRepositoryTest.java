package dev.mvc.team5;

import dev.mvc.team5.entity.Talent;
import dev.mvc.team5.repository.TalentRepository;
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

    @BeforeEach
    void setup() {
        talentRepository.save(new Talent("기타 레슨 합니다", "기초부터 알려드려요", "Korean"));
        talentRepository.save(new Talent("피아노 레슨 가능", "1:1 맞춤", "Korean"));
        talentRepository.save(new Talent("운동 코칭", "헬스, PT", "Korean"));
    }

    @Test
    @DisplayName("제목에 '레슨'이 포함된 재능 글 검색")
    void testFindByTitleContaining() {
        List<Talent> results = talentRepository.findByTitleContaining("레슨");

        assertThat(results).hasSize(2);
        assertThat(results).allMatch(t -> t.getTitle().contains("레슨"));
    }
}

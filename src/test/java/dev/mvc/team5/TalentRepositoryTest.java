package dev.mvc.team5;



import dev.mvc.team5.entity.school.School;
import dev.mvc.team5.entity.user.User;
import dev.mvc.team5.repository.user.UserRepository;
import dev.mvc.team5.talent.Entity.Talent;
import dev.mvc.team5.talent.Entity.TalentCateGrp;
import dev.mvc.team5.talent.Entity.TalentCategory;
import dev.mvc.team5.talent.Entity.TalentType;
import dev.mvc.team5.talent.repository.TalentCateGrpRepository;
import dev.mvc.team5.talent.repository.TalentCategoryRepository;
import dev.mvc.team5.talent.repository.TalentRepository;
import dev.mvc.team5.talent.repository.TalentTypeRepository;
import dev.mvc.team5.entity.school.School;
import dev.mvc.team5.entity.user.User;
import dev.mvc.team5.repository.school.SchoolRepository;

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
    
    @Autowired
    private TalentCateGrpRepository talentCateGrpRepository;
    
    @Autowired
    private TalentCategoryRepository talentCategoryRepository;
    
    @Autowired
    private TalentTypeRepository talentTypeRepository;

    @BeforeEach
    void setup() {
        // 학교 저장
        School school = schoolRepository.save(new School("테스트 학교"));
  
        // 사용자 저장
        User user = userRepository.save(new User("user", "user123", "유저", school));
        
        // 대분류 그룹
        TalentCateGrp cateGrp = talentCateGrpRepository.save(new TalentCateGrp("음악"));
        
        // 카테고리 
        TalentCategory category = talentCategoryRepository.save(new TalentCategory(cateGrp, "기타"));
        
        // 재능기부/교환
        TalentType talentType = talentTypeRepository.save(new TalentType("기부"));
                
        talentRepository.save(new Talent(user, school, talentType, category, "기타 레슨 합니다", "기초부터 알려드려요", "Korean"));
        talentRepository.save(new Talent(user, school,  talentType, category, "피아노 레슨 가능", "1:1 맞춤", "Korean"));
        talentRepository.save(new Talent(user, school,  talentType, category, "운동 코칭", "헬스, PT", "Korean"));
    }

//    @Test
//    @DisplayName("제목에 '레슨'이 포함된 재능 글 검색")
//    void testFindByTitleContaining() {
//        List<Talent> results = talentRepository.findByTitleContaining("레슨");
//
//        assertThat(results).hasSize(2);
//        assertThat(results).allMatch(t -> t.getTitle().contains("레슨"));
//    }
}

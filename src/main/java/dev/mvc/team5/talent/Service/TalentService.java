package dev.mvc.team5.talent.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.mvc.team5.talent.Entity.Talent;
import dev.mvc.team5.talent.repository.TalentRepository;

@Service
public class TalentService {

    @Autowired
    private TalentRepository talentRepository;

    /** 등록 (CREATE) */
    public Talent save(Talent talent) {
        return talentRepository.save(talent);
    }

    /** 전체 조회 (READ ALL) */
    public List<Talent> findAll() {
        return talentRepository.findAll();
    }

    /** 개별 조회 (READ ONE) */
    public Optional<Talent> findById(Long talentno) {
        return talentRepository.findById(talentno);
    }

    /** 수정 (UPDATE) → save() 재사용 */
    public Talent update(Talent updatedTalent) {
        // 이미 있는 경우만 update 진행
        if (updatedTalent.getTalentno() != null && talentRepository.existsById(updatedTalent.getTalentno())) {
            return talentRepository.save(updatedTalent);
        }
        throw new IllegalArgumentException("해당 재능이 존재하지 않음: talentno=" + updatedTalent.getTalentno());
    }

    /** 삭제 (DELETE) */
    public void delete(Long talentno) {
        if (talentRepository.existsById(talentno)) {
            talentRepository.deleteById(talentno);
        } else {
            throw new IllegalArgumentException("삭제할 재능이 존재하지 않음: talentno=" + talentno);
        }
    }
}

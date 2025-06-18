package dev.mvc.team5.repository.school;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.mvc.team5.entity.school.School;

@Repository
public interface PlacesRepository extends JpaRepository<School, Long> {
    // 필요하다면 커스텀 쿼리 추가 가능

}

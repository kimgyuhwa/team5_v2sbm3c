package dev.mvc.team5.places;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface PlacesRepository extends JpaRepository<Places, Long> {
    // 필요하다면 커스텀 쿼리 추가 가능

}

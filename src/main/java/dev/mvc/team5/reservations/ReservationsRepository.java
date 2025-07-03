package dev.mvc.team5.reservations;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationsRepository extends JpaRepository<Reservations, Long> {

	@Query("SELECT r FROM Reservations r WHERE r.place.placeno = :placeno " +
      "AND :start < r.end_time AND :end > r.start_time")
	List<Reservations> findConflict(@Param("placeno") Long placeno,
                                @Param("start") LocalDateTime start,
                                @Param("end") LocalDateTime end);
	
	
}

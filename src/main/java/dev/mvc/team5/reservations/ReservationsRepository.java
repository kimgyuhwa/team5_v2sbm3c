package dev.mvc.team5.reservations;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import dev.mvc.team5.places.Places;

@Repository
public interface ReservationsRepository extends JpaRepository<Reservations, Long> {

  @Query("SELECT r FROM Reservations r WHERE r.place = :placeno " +
      "AND r.start_time < :endTime AND r.end_time > :startTime")
List<Reservations> findChatConflicts(@Param("placeno") Long placeno,
                                @Param("startTime") LocalDateTime startTime,
                                @Param("endTime") LocalDateTime endTime);

	@Query("SELECT r FROM Reservations r WHERE r.place = :place " +
      "AND r.start_time < :endTime AND r.end_time > :startTime")
List<Reservations> findConflicts(@Param("place") Places place,
                                @Param("startTime") LocalDateTime startTime,
                                @Param("endTime") LocalDateTime endTime);

	List<Reservations> findByPlace_Placeno(Long placeno);

	List<Reservations> findByUser_Userno(Long userno);
  
}

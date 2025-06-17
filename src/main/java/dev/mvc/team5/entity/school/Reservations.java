package dev.mvc.team5.entity.school;

import dev.mvc.team5.entity.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reservations {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reservation_seq")
    @SequenceGenerator(name = "reservation_seq", sequenceName = "RESERVATION_SEQ", allocationSize = 1)
    private Long reservationno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userno", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "placeno", nullable = false)
    private Places place;

    private LocalDateTime start_time;
    
    private LocalDateTime end_time;
    
    private LocalDateTime created_at = LocalDateTime.now();


    @Column(columnDefinition = "TEXT")
    private String placesinfo;

    /**
     * 요청 상태
     */
    private String status;
    
    // 생성자 (필요시)
    public Reservations(User user, Places place, LocalDateTime start_time, LocalDateTime end_time, String placesinfo, String status) {
        this.user = user;
        this.place = place;
        this.start_time = start_time;
        this.end_time = end_time;
        this.placesinfo = placesinfo;
        this.status = status;
        this.created_at = LocalDateTime.now();
    }
}

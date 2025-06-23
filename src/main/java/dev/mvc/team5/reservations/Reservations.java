package dev.mvc.team5.reservations;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import dev.mvc.team5.match.Match;
import dev.mvc.team5.places.Places;
import dev.mvc.team5.request.Request;
import dev.mvc.team5.user.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "reservations")
@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Reservations {
	
//	  // 양방향: schoolgwan ↔ places
//	  @OneToMany(mappedBy = "reservationno", cascade = CascadeType.ALL, orphanRemoval = true)
//	  private List<Reservations> reservation = new ArrayList<>();
  
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
    
    /**
     * 예약한 시간
     * 예약한 시간과 끝나는 시간은 불가능하도록 막고 다른 시간은 가능하도록 설계
     */
    @CreationTimestamp
    private LocalDateTime start_time;
    
    /**
     * 끝나는 시간
     * 예약한 시간과 끝나는 시간은 불가능하도록 막고 다른 시간은 가능하도록 설계
     */    
    @UpdateTimestamp
    private LocalDateTime end_time;
    
    
    @Column(name = "placesinfo", length = 100)
    private String placesinfo;

    /**
     * 요청 상태
     */
    private String status;
    
    // 양방향: Reservation ↔ Match
    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Match> matches = new ArrayList<>();
    
    // 생성자 (필요시)

    public Reservations(User user, Places place, LocalDateTime start_time, LocalDateTime end_time, String placesinfo, String status) {
        this.user = user;
        this.place = place;
        this.start_time = start_time;
        this.end_time = end_time;
        this.placesinfo = placesinfo;
        this.status = status;
    }
}

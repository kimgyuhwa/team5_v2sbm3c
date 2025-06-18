package dev.mvc.team5.entity.school;

import dev.mvc.team5.entity.user.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import dev.mvc.team5.entity.school.SchoolGwan;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "places")
@Data
@NoArgsConstructor
public class Places {
		

  
  /**
   * placeno
   * @param 강의실 번호
   */
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "places_seq")
    @SequenceGenerator(name = "places_seq", sequenceName = "PLACES_SEQ", allocationSize = 1)
    @Column(name = "placeno")
    private Long placeno;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "userno", nullable = false)
//    private User userno;

    @ManyToOne(fetch = FetchType.LAZY)

    @JoinColumn(name = "schoolgwan", nullable = false)
    private SchoolGwan schoolGwan;

    
    /**
     * placename
     * @param 강의실 이름
     */
    @Column(name = "placename", length = 100)
    private String placename;
    
    /**
     * placename
     * @param 강의실 호수
     */
    @Column(name = "hosu", length = 100)
    private String hosu;
    
    /**
     * 강의 시간
     * 강의시간 제외하고 다른 시간은 가능하도록 설계
     */
    private LocalDateTime start_time;
    
    /**
     * 강의 끝나는 시간
     * 강의시간 제외하고 다른 시간은 가능하도록 설계
     */    
    private LocalDateTime end_time;
    
    // 양방향: schoolgwan ↔ places
    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reservations> Reservation = new ArrayList<>();
    
    
    public Places(/*User userno,*/ SchoolGwan schoolGwan, String placename, String hosu, LocalDateTime start_time, LocalDateTime end_time) {
//        this.userno = userno;
        this.schoolGwan = schoolGwan;
        this.placename = placename;
        this.hosu = hosu;
        this.start_time = start_time;
        this.end_time = end_time;
    }
}

package dev.mvc.team5.entity.review;

import dev.mvc.team5.entity.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Review {

  @Id
  @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="review_seq")
  @SequenceGenerator(name="review_seq", sequenceName="REVIEW_SEQ", allocationSize=1)
    private String reviewno;

    // giverno: 리뷰를 작성한 사용자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "giver", nullable = false)
    private User giver;

    // receiverno: 리뷰 대상 사용자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver", nullable = false)
    private User receiver;

    @Column(name = "reviewer_id")
    private Integer reviewerId;  // 보통 이건 필요 없을 수 있음. giverno랑 중복 역할?

    private Integer rating;


    @Column
    private String comments;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}

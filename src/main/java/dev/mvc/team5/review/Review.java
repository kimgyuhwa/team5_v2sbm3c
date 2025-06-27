package dev.mvc.team5.review;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import dev.mvc.team5.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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

    private Integer rating;


    @Column
    private String comments;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}

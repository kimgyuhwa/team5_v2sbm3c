package dev.mvc.team5.review;

import lombok.Data;

// 리뷰 정보를 전달하기 위한 DTO(Data Transfer Object)
@Data
public class ReviewDTO {
    private Long reviewno;     // 리뷰 고유 ID (PK)
    private Long giver;          // 리뷰 작성자 userno
    private Long receiver;       // 리뷰 대상자 userno
    private Integer rating;      // 평점 (1~5)
    private String comments;     // 코멘트 내용
    private String createdAt;    // 생성 시각 (문자열로 반환용)
}
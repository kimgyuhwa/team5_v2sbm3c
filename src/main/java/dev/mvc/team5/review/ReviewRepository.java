package dev.mvc.team5.review;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
//특정 사용자가 작성한 리뷰 목록
  List<Review> findByGiverUserno(Long userno);

  // 특정 사용자가 받은 리뷰 목록
  List<Review> findByReceiverUserno(Long userno);
  // 그걸 페이징
  Page<Review> findByGiver_Userno(Long receiverUserno, Pageable pageable);

  int countByGiver_Userno(Long userno); 
  
  int countByReceiver_Userno(Long userno); // 사용자가 받은 리뷰 수
}

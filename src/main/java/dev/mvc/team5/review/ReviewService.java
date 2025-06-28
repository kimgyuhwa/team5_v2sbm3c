package dev.mvc.team5.review;

import dev.mvc.team5.user.User;
import dev.mvc.team5.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository repo;

    @Autowired
    private UserRepository userRepo;

    // 전체 리뷰 목록 조회
    public List<Review> findAll() {
        return repo.findAll();
    }

    // 리뷰 ID로 단건 조회
    public Optional<Review> findById(Long id) {
        return repo.findById(id);
    }

    // 특정 작성자(giver)가 작성한 리뷰 목록
    public List<Review> findByGiver(Long userno) {
        return repo.findByGiverUserno(userno);
    }

    // 특정 수신자(receiver)가 받은 리뷰 목록
    public List<Review> findByReceiver(Long userno) {
        return repo.findByReceiverUserno(userno);
    }

    // 리뷰 생성 (DTO → Entity 변환 후 저장)
    public Review save(ReviewDTO dto) {
        // giver와 receiver는 userno 기준으로 User 엔티티 조회
        User giver = userRepo.findById(dto.getGiver()).orElseThrow();
        User receiver = userRepo.findById(dto.getReceiver()).orElseThrow();

        Review r = new Review();
        r.setGiver(giver);
        r.setReceiver(receiver);
        r.setRating(dto.getRating());
        r.setComments(dto.getComments());
        // createdAt은 @CreationTimestamp에 의해 자동 설정

        return repo.save(r);
    }

    // 리뷰 삭제
    public void delete(Long id) {
        repo.deleteById(id);
    }
}

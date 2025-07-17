package dev.mvc.team5.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reviews") // URL prefix
public class ReviewController {

    @Autowired
    private ReviewService service;

    // 모든 리뷰 조회
    @GetMapping
    public List<ReviewDTO> getAll() {
        return service.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    // 특정 리뷰 ID 조회
    @GetMapping("/{id}")
    public ReviewDTO get(@PathVariable("id") Long id) {
        return toDTO(service.findById(id).orElseThrow());
    }

    // 특정 작성자(userno) 기준 리뷰 목록 조회
    @GetMapping("/giver/{userno}")
    public List<ReviewDTO> getByGiver(@PathVariable("userno") Long userno) {
        return service.findByGiver(userno).stream().map(this::toDTO).collect(Collectors.toList());
    }

    // 특정 대상자(userno) 기준 리뷰 목록 조회
//    @GetMapping("/receiver/{userno}")
//    public List<ReviewDTO> getByReceiver(@PathVariable("userno") Long userno) {
//        return service.findByReceiver(userno).stream().map(this::toDTO).collect(Collectors.toList());
//    }
    
    // 정 대상자(userno) 기준 리뷰 목록 조회 ,페이징
    @GetMapping("/receiver/{userno}")
    public List<ReviewDTO> getByReceiver(@PathVariable("userno") Long userno,
                                    @PageableDefault(size = 5, sort = {"createdAt", "reviewno"}) Pageable pageable) {
        return service.findByReceiver(userno).stream().map(this::toDTO).collect(Collectors.toList());
    }

    // 리뷰 생성
    @PostMapping
    public ReviewDTO create(@RequestBody ReviewDTO dto) {
        // ① service.save(dto)는 Review 엔티티를 리턴하도록
        Review saved = service.save(dto);
        // ② 엔티티 → DTO 변환
        return service.convertToDTO(saved);
    }

    // 리뷰 삭제
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        service.delete(id);
    }

    // Review 엔티티 → DTO로 변환
    private ReviewDTO toDTO(Review r) {
        ReviewDTO dto = new ReviewDTO();
        dto.setReviewno(r.getReviewno());
        dto.setGiver(r.getGiver().getUserno());
        dto.setGivername(r.getGiver().getName());
        dto.setReceiver(r.getReceiver().getUserno());
        dto.setRating(r.getRating());
        dto.setComments(r.getComments());
        dto.setCreatedAt(r.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        return dto;
    }
}

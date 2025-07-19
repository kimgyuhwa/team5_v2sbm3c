package dev.mvc.team5.report;

import dev.mvc.team5.block.BlockService;
import dev.mvc.team5.tool.ReportStatus;
import dev.mvc.team5.user.User;
import dev.mvc.team5.user.UserRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private ReportRepository repo;

    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private  BlockService blockSvc;
    
    public List<Report> findAll() {
        return repo.findAll();
    }

    public Optional<Report> findById(Long id) {
        return repo.findById(id);
    }
     // 신고 중복확인후 저장
    public Report save(ReportDTO dto) {
        boolean dup = repo.existsByReporter_UsernoAndReportTypeAndTargetIdAndStatus(
          dto.getReporter(), dto.getReportType(), dto.getTargetId(), "OPEN");

      if (dup) throw new IllegalStateException("이미 신고한 대상입니다.");
        Report report = new Report();

        User reporter = userRepo.findById(dto.getReporter()).orElseThrow();
        User reported = userRepo.findById(dto.getReported()).orElseThrow();

        report.setReporter(reporter);
        report.setReported(reported);
        report.setReason(dto.getReason());
        report.setReportType(dto.getReportType());
        report.setTargetId(dto.getTargetId());
        report.setCreatedAt(LocalDateTime.now());
        report.setStatus(dto.getStatus() != null ? dto.getStatus() : "OPEN");

        return repo.save(report);
    }
//    /* 신고 중복 여부 */
//    public boolean existsDuplicate(ReportDTO dto) {
//        return repo.existsByReporter_UsernoAndReportTypeAndTargetIdAndStatus(
//                dto.getReporter(), dto.getReportType(), dto.getTargetId(), "OPEN");
//    }
    /* 목록 */
    public Page<ReportDTO> findAll(String status, Pageable pageable) {
        Page<Report> page = status == null
                ? repo.findAll(pageable)
                : repo.findByStatus(status, pageable);
        return page.map(this::toDTO);
    }
    
    /* 상태 변경 + 자동 차단 */
    private static final int AUTO_BLOCK = 3;   // 🚨 3건 이상 승인 시 자동 차단
    @Transactional
    public void updateStatus(Long id, String newStatus) {
        Report report = repo.findById(id).orElseThrow();
        report.setStatus(newStatus);

        // 승인된 경우 자동 차단 검사
        if (newStatus == ReportStatus.APPROVED) {
            int approvedCnt = repo.countByReportedAndStatus(report.getReported(), ReportStatus.APPROVED);
            if (approvedCnt >= AUTO_BLOCK) {
                blockSvc.blockUser(report.getReported().getUserno(),
                                   "신고 누적 " + approvedCnt + "회");
                
            }
                
        }
      
    }

    /* 삭제 */
    @Transactional
    public void delete(Long id) {
        repo.deleteById(id);
    }

    /* ------------------ Mapper ------------------ */
    private ReportDTO toDTO(Report r) {
        ReportDTO dto = new ReportDTO();
        dto.setReportno(r.getReportno());
        dto.setReporter(r.getReporter().getUserno());
        dto.setReported(r.getReported().getUserno());
        dto.setReason(r.getReason());
        dto.setReportType(r.getReportType());
        dto.setTargetId(r.getTargetId());
        dto.setCreatedAt(r.getCreatedAt().toString());
        dto.setStatus(r.getStatus());
        return dto;
    }
  }

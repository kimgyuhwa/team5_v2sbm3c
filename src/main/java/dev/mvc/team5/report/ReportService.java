package dev.mvc.team5.report;

import dev.mvc.team5.user.User;
import dev.mvc.team5.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public List<Report> findAll() {
        return repo.findAll();
    }

    public Optional<Report> findById(Long id) {
        return repo.findById(id);
    }

    public Report save(ReportDTO dto) {
        Report report = new Report();

        User reporter = userRepo.findById(dto.getReporter()).orElseThrow();
        User reported = userRepo.findById(dto.getReported()).orElseThrow();

        report.setReporter(reporter);
        report.setReported(reported);
        report.setReason(dto.getReason());
        report.setReportType(dto.getReportType());
        report.setTargetId(dto.getTargetId());
        report.setCreatedAt(LocalDateTime.now());
        report.setStatus(dto.getStatus() != null ? dto.getStatus() : "PENDING");

        return repo.save(report);
    }
    // 상태 변경
    public void updateStatus(Long id, String status) {
      Report r = repo.findById(id).orElseThrow();
      r.setStatus(status);
      repo.save(r);
  }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
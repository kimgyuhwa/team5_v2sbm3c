package dev.mvc.team5.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService service;

    //전체 신고 보기
    @GetMapping
    public List<ReportDTO> getAll() {
        return service.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }
    //신고자로 신고검색
    @GetMapping("/{id}")
    public ReportDTO get(@PathVariable Long id) {
        return toDTO(service.findById(id).orElseThrow());
    }
    //신고 생성
    @PostMapping
    public ReportDTO create(@RequestBody ReportDTO dto) {
        return toDTO(service.save(dto));
    }
    //신고 삭제
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
    // 상태변경 / 대기중/승인됨/거절됨/완료됨
    @PutMapping("/{id}/status")
    public void updateStatus(@PathVariable Long id, @RequestBody String status) {
        service.updateStatus(id, status);
    }
    
    private ReportDTO toDTO(Report report) {
        ReportDTO dto = new ReportDTO();
        dto.setReportno(report.getReportno());
        dto.setReporter(report.getReporter().getUserno());
        dto.setReported(report.getReported().getUserno());
        dto.setReason(report.getReason());
        dto.setReportType(report.getReportType());
        dto.setTargetId(report.getTargetId());
        dto.setCreatedAt(report.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        dto.setStatus(report.getStatus());
        return dto;
    }
}

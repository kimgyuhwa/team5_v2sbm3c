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

    @GetMapping
    public List<ReportDTO> getAll() {
        return service.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ReportDTO get(@PathVariable Long id) {
        return toDTO(service.findById(id).orElseThrow());
    }

    @PostMapping
    public ReportDTO create(@RequestBody ReportDTO dto) {
        return toDTO(service.save(dto));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
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

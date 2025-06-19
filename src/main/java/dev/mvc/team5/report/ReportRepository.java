package dev.mvc.team5.report;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
  // 필요하다면 커스텀 쿼리 추가 가능
}

package dev.mvc.team5.reservations;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class ReservationsController {

    private final ReservationsService reservationsService;

    @PostMapping
    public ResponseEntity<ReservationsResponseDTO> create(@RequestBody ReservationsRequestDTO dto) {
        return ResponseEntity.ok(reservationsService.create(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationsResponseDTO> read(@PathVariable("id") Long reservationno) {
        return ResponseEntity.ok(reservationsService.read(reservationno));
    }

    @GetMapping
    public ResponseEntity<List<ReservationsResponseDTO>> listAll() {
        return ResponseEntity.ok(reservationsService.listAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationsResponseDTO> update(@PathVariable Long id, @RequestBody ReservationsRequestDTO dto) {
        return ResponseEntity.ok(reservationsService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reservationsService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

package dev.mvc.team5.block;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/blocks")
public class BlockController {

    @Autowired
    private BlockService service;

    @GetMapping
    public List<BlockDTO> getAll() {
        return service.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public BlockDTO get(@PathVariable Long id) {
        return toDTO(service.findById(id).orElseThrow());
    }

    @PostMapping
    public BlockDTO create(@RequestBody BlockDTO dto) {
        return toDTO(service.save(dto));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    private BlockDTO toDTO(Block b) {
        BlockDTO dto = new BlockDTO();
        dto.setBlockno(b.getBlockno());
        dto.setBlocker(b.getBlocker().getUserno());
        dto.setBlocked(b.getBlocked().getUserno());
        dto.setCreatedAt(b.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        return dto;
    }
}

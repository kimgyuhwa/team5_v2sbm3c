package dev.mvc.team5.block;

import dev.mvc.team5.user.User;
import dev.mvc.team5.user.UserRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BlockService {

    @Autowired
    private BlockRepository repo;

    @Autowired
    private UserRepository userRepo;

    public List<Block> findAll() {
        return repo.findAll();
    }

    public Optional<Block> findById(Long id) {
        return repo.findById(id);
    }

    public Block save(BlockDTO dto) {
        Block block = new Block();
        User blocker = userRepo.findById(dto.getBlocker()).orElseThrow();
        User blocked = userRepo.findById(dto.getBlocked()).orElseThrow();

        block.setBlocker(blocker);
        block.setBlocked(blocked);
        block.setCreatedAt(LocalDateTime.now());

        return repo.save(block);
    }
    @Transactional
    public void blockUser(Long targetUserno, String reason) {
        // 이미 활성 차단이면 건너뜀
        if (repo.existsByBlocked_UsernoAndActiveTrue(targetUserno)) return;

        Block block = new Block();
        block.setBlocker(null);                                   // 시스템 차단
        block.setBlocked(userRepo.getReferenceById(targetUserno));
        block.setReason(reason);
        block.setActive(true);
        block.setCreatedAt(LocalDateTime.now());

        repo.save(block);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
 // 사용자가 차단한 사람 목록 보기
    public List<Block> findByBlocker(Long userno) {
      return repo.findAll().stream()
              .filter(b -> b.getBlocker().getUserno().equals(userno))
              .toList();
  }
    // 차단 여부( 되어있는지 아닌지)
    public boolean isBlocked(Long blocker, Long blocked) {
      return repo.existsByBlockerUsernoAndBlockedUserno(blocker, blocked);
  }
}

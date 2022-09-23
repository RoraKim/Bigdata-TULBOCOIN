package bigdataproject.backend.db.repository;

import bigdataproject.backend.db.entity.User;
import bigdataproject.backend.db.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
    List<Wallet> findAllByUser(User user);
}

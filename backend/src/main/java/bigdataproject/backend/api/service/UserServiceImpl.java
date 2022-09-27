package bigdataproject.backend.api.service;

import bigdataproject.backend.api.request.UserRegisterReq;
import bigdataproject.backend.db.entity.User;
import bigdataproject.backend.db.repository.UserRepository;
import bigdataproject.backend.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements  UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    PasswordEncoder passwordEncoder;



    @Override
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    @Override
    @Transactional
    public User createUser(UserRegisterReq userRegisterInfo) {
        User user = new User();
        user.setUserId(userRegisterInfo.getUserId());
        user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
        user.setBalance(userRegisterInfo.getBalance());
        user.setImagePath(userRegisterInfo.getImagePath());
        user.setEmail(userRegisterInfo.getEmail());
        userRepository.save(user);

        return user;
    }

    @Override
    public User getUserByUserSeq(Long userSeq) {
        User user = userRepository.findById(userSeq).get();
        return user;
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public User getUserByUserId(String userId) {
        Optional<User> user = userRepositorySupport.findUserByUserId(userId);

        if(!user.isPresent()) {
            return null;}
        return user.get();
    }
}


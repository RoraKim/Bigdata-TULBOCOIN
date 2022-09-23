package bigdataproject.backend.api.service;

import bigdataproject.backend.api.request.UserRegisterReq;
import bigdataproject.backend.db.entity.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User createUser(UserRegisterReq userRegisterInfo);

    User getUserByUserSeq(Long userSeq);

    void deleteUser(User user);

}

//    User updateUserSeq(String userId, UserRegisterReq updateInfo);

package com.mood.journal.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.mood.journal.dao.UserDao;
import com.mood.journal.model.User;
import com.mood.journal.util.MongoUtil;

@Service
public class UserService {
	
	private final MongoTemplate mongoTemplate = MongoUtil.getMongoTemplate();
	
	@Autowired
	UserDao userDao;

	public User registerUser(String username, String email, String password) throws Exception {
        if (userDao.existsByEmail(email)) {
            throw new Exception("Email already exists");
        }
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        User user = new User();
        user.setEmail(email);
        user.setPassword(hashedPassword);
        user.setCreatedDate(LocalDateTime.now());
        user.setUserName(username == null || username.equalsIgnoreCase("") ? email.split("@")[0] : username);
        mongoTemplate.save(user);
        return user;
    }
	
	public User loginUser(String email, String password) throws Exception {
        User user = userDao.findByEmail(email);
        if (user == null) {
            throw new Exception("User not found");
        }
 
        if (!BCrypt.checkpw(password, user.getPassword())) {
            throw new Exception("Invalid password");
        }
        return user;
    }
	
}

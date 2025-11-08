package com.mood.journal.service.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.mood.journal.dao.UserDao;
import com.mood.journal.model.User;
import com.mood.journal.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Autowired
	UserDao userDao;

	public User registerUser(String username, String email, String password) throws Exception {
        if (userDao.existsByEmail(email)) {
            throw new Exception("Email already exists" + email);
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
	
	public User changePassword(String userId, String currentPassword, String newPassword, String confirmPassword) throws Exception {
	    User user = userDao.getUserDetails(userId);
	    if (user == null) {
	        throw new Exception("User not found");
	    }

	    // Validate current password
	    if (!BCrypt.checkpw(currentPassword, user.getPassword())) {
	        throw new Exception("Invalid current password");
	    }

	    // Validate new passwords match
	    if (!newPassword.equals(confirmPassword)) {
	        throw new Exception("New password and confirm password do not match");
	    }

	    // Check if new password is same as old one
	    if (BCrypt.checkpw(newPassword, user.getPassword())) {
	        throw new Exception("New password must be different from the old password");
	    }

	    // Hash and save the new password
	    String hashedNewPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt());
	    user.setPassword(hashedNewPassword);
	    mongoTemplate.save(user);

	    return user;
	}

	
}

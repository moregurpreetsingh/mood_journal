package com.mood.journal.service;

import org.springframework.stereotype.Service;

import com.mood.journal.model.User;

@Service
public interface UserService {

	public User registerUser(String username, String email, String password)  throws Exception;
	
	public User loginUser(String email, String password)  throws Exception;
	
	public User changePassword(String userId, String currentPassword, String newPassword, String confirmPassword) throws Exception;
	
}

package com.mood.journal.dao;

import com.mood.journal.model.User;

public interface UserDao {
	
	public boolean existsByEmail(String email);
	
	public User findByEmail(String email);
	
	public User getUserDetails(String userId);

}

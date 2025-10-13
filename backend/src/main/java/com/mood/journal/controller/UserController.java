package com.mood.journal.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mood.journal.dao.UserDao;
import com.mood.journal.model.User;
import com.mood.journal.request.UserRequest;
import com.mood.journal.response.UserResponse;
import com.mood.journal.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserDao userDao;
	
	//for registering the user
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody UserRequest user) {
        try {
            User savedUser = userService.registerUser(user.getUserName(), user.getEmail(), user.getPassword());
            UserResponse response = new UserResponse(savedUser);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage()); 
        }
    }
	
	
	//for login the user
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserRequest user) {
	    try {
	        User loggedInUser = userService.loginUser(user.getEmail(), user.getPassword());
	        UserResponse response = new UserResponse(loggedInUser);
	        return ResponseEntity.ok(response);
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body(e.getMessage());
	    }
	}
	
	//for getting user details
	@PostMapping("/getUserDetails")
	public ResponseEntity<?> getUserDetails(@RequestBody UserRequest user){
		try{
			User userDetails = userDao.getUserDetails(user.getUserId());
			UserResponse response = new UserResponse(userDetails);
			return ResponseEntity.ok(response);
		}catch(Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@PostMapping("/changePassword")
	public ResponseEntity<?> changePassword(@RequestBody UserRequest user){
		try{
			User userDetails = userService.changePassword(user.getUserId(), user.getPassword(), user.getNewPass(), user.getConfirmPass());
			UserResponse response = new UserResponse(userDetails);
			return ResponseEntity.ok(response);
		}catch(Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@PostMapping("/changeUserName")
	public ResponseEntity<?> changeUserName(@RequestBody UserRequest user){
		try{
			User userDetails = userDao.getUserDetails(user.getUserId());
			userDetails.setUserName(user.getUserName() != null ? user.getUserName() : userDetails.getUserName());
			mongoTemplate.save(userDetails);
			UserResponse response = new UserResponse(userDetails);
			return ResponseEntity.ok(response);
		}catch(Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	
}

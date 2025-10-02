package com.mood.journal.controller;

import java.time.LocalDateTime;
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
import com.mood.journal.model.Mood;
import com.mood.journal.model.User;
import com.mood.journal.request.MoodRequest;
import com.mood.journal.request.UserRequest;
import com.mood.journal.service.UserService;
import com.mood.journal.util.MongoUtil;

@RestController
@RequestMapping("/user")
public class UserController {
	
	private final MongoTemplate mongoTemplate = MongoUtil.getMongoTemplate();
	
	@Autowired
	UserService userService;
	
	
	//for registering the user
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody UserRequest user) {
        try {
            User savedUser = userService.registerUser(user.getUserName(), user.getEmail(), user.getPassword());
            Map<String, Object> res = new HashMap<>();
            res.put("userId", savedUser.getId());
            res.put("createdDate", savedUser.getCreatedDate());
            res.put("email", savedUser.getEmail());
            res.put("userName", savedUser.getUserName());
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage()); 
        }
    }
	
	
	//for login the user
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserRequest user) {
	    try {
	        User loggedInUser = userService.loginUser(user.getEmail(), user.getPassword());
	        Map<String, Object> res = new HashMap<>();
            res.put("userId", loggedInUser.getId());
            res.put("createdDate", loggedInUser.getCreatedDate());
            res.put("email", loggedInUser.getEmail());
            res.put("userName", loggedInUser.getUserName());
	        return ResponseEntity.ok(res);
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body(e.getMessage());
	    }
	}
	
}

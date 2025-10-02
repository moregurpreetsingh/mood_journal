package com.mood.journal.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mood.journal.dao.MoodDao;
import com.mood.journal.model.Mood;
import com.mood.journal.request.MoodRequest;
import com.mood.journal.response.MoodResponse;
import com.mood.journal.util.MongoUtil;

@RestController
@RequestMapping("/mood")
public class MoodController {
	private final MongoTemplate mongoTemplate = MongoUtil.getMongoTemplate();

	@Autowired
	MoodDao moodDao;
	
	//for saving the mood data
	@PostMapping("/saveCurrentMood")
	public ResponseEntity<?> saveCurrentMood(@RequestBody MoodRequest moodRequest){
		try {
			Mood currentMood = new Mood();
			currentMood.setCreatedDate(LocalDateTime.now());
			currentMood.setUserId(moodRequest.getUserId());
			currentMood.setMood(moodRequest.getMood());
			mongoTemplate.save(currentMood);
			Map<String, Object> res = new HashMap<>();
			res.put("currentMoodId", currentMood.getId());
			return ResponseEntity.ok(res);
		}catch(Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage()); 
		}
	}
	
	//for getting most recent for today
	@PostMapping("/mostRecentTodayMood")
	public ResponseEntity<?> mostRecentTodayMood(@RequestBody MoodRequest moodRequest){
		try {
			Mood recentMood = moodDao.todayMostRecentMood(moodRequest.getUserId());
			MoodResponse response = new MoodResponse(recentMood);
			return  ResponseEntity.ok(response);
		}catch(Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	//for getting most recent mood enteries
	@PostMapping("/mostRecentMoods")
	public ResponseEntity<?> mostRecentMoods(@RequestBody MoodRequest moodRequest){
		try {
			List<Mood> recentMoods = moodDao.recentMoods(moodRequest.getUserId());
			
			List<MoodResponse> response = recentMoods.stream()
		            .map(MoodResponse::new)
		            .toList();
			
			return ResponseEntity.ok(response);
		}catch(Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
}

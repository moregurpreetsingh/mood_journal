package com.mood.journal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mood.journal.dao.MoodDao;
import com.mood.journal.request.MoodRequest;
import com.mood.journal.service.InsightsService;
import com.mood.journal.model.Mood;

@RestController
@RequestMapping("/insights")
public class InsightsController {
	
	@Autowired
	InsightsService insightsService;
	
	@PostMapping("/getWeeklyAverage")
	public ResponseEntity<?> weeklyAverage(@RequestBody MoodRequest moodRequest){
		try {
			List<Mood> moods = insightsService.getWeeklyAverage(moodRequest.getUserId());
			return ResponseEntity.ok(moods);
		}catch(Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage()); 
		}
		
	}
	
}

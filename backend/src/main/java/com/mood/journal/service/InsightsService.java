package com.mood.journal.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

public interface InsightsService {


	public ResponseEntity<?> getWeeklyAverage(String userId);
	
	public ResponseEntity<?> getTopMoods(String userId);
	
	public String calculateMoodShifts(String userId);
	
	public double getPreviousWeakScore(String userId);
}

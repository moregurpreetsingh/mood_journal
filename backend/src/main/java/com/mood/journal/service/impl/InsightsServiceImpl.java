package com.mood.journal.service.impl;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mood.journal.dao.MoodDao;
import com.mood.journal.dao.WeeklyInsightsDao;
import com.mood.journal.model.Mood;
import com.mood.journal.model.WeeklyInsights;
import com.mood.journal.service.InsightsService;

@Service
public class InsightsServiceImpl implements InsightsService {
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Autowired
	MoodDao moodDao;
	
	@Autowired
	WeeklyInsightsDao weeklyInsightsDao;
	
	public static final Map<String, Integer> MOOD_SCORES;

    static {
        MOOD_SCORES = new HashMap<>();

        MOOD_SCORES.put("excited", 10);
        MOOD_SCORES.put("happy", 9);
        MOOD_SCORES.put("love", 9);
        MOOD_SCORES.put("grateful", 8);
        MOOD_SCORES.put("proud", 8);
        MOOD_SCORES.put("hopeful", 7);
        MOOD_SCORES.put("relaxed", 7);
        MOOD_SCORES.put("calm", 6);
        MOOD_SCORES.put("surprised", 5);
        MOOD_SCORES.put("shy", 5);
        MOOD_SCORES.put("bored", 4);
        MOOD_SCORES.put("confused", 4);
        MOOD_SCORES.put("tired", 3);
        MOOD_SCORES.put("sleepy", 3);
        MOOD_SCORES.put("nervous", 2);
        MOOD_SCORES.put("anxious", 2);
        MOOD_SCORES.put("frustrated", 2);
        MOOD_SCORES.put("angry", 1);
        MOOD_SCORES.put("sick", 1);
        MOOD_SCORES.put("sad", 1);
    }

	public ResponseEntity<?> getWeeklyAverage(String userId){
		Map<String, Object> res = new HashMap<>();
		
		LocalDate today = LocalDate.now();

		LocalDate weekStart = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));

		LocalDate weekEnd = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
		
		List<Mood> moods = moodDao.getWeeklyMoods(userId, weekStart, weekEnd);
		
		if (moods == null || moods.isEmpty()) {
			res.put("aScore", "0.0");
			res.put("tMood", "No mood data");
	        return ResponseEntity.ok(res);
	    }
		
		Map<String, Integer> frequencyMoods = moods.stream()
			    .collect(Collectors.groupingBy(Mood::getMood, Collectors.collectingAndThen(Collectors.counting(), Long::intValue)));

		int totalScore = 0;
	    int totalCount = 0;

	    String topMood = null;
	    int maxFrequency = 0;

	    for (Map.Entry<String, Integer> entry : frequencyMoods.entrySet()) {
	        String moodId = entry.getKey();
	        int frequency = entry.getValue();
	        String normalizedMoodId = moodId.trim().toLowerCase();
	        int moodScore = MOOD_SCORES.getOrDefault(normalizedMoodId, 0);

	        totalScore += moodScore * frequency;
	        totalCount += frequency;

	        if (frequency > maxFrequency) {
	            maxFrequency = frequency;
	            topMood = normalizedMoodId;
	        }
	    }
	    
	    //for current weak
	    WeeklyInsights insight = weeklyInsightsDao.getWeeklyInsights(weekStart, userId);
	    
	    if(insight == null) {
	    	insight = new WeeklyInsights();
		    insight.setUserId(userId);
		    insight.setWeekDate(weekStart);
		    insight.setCreatedDate(LocalDateTime.now());
	    }

		// Get previous week's start date
		LocalDate previousWeekStart = weekStart.minusWeeks(1);
	
		// Fetch previous week's insights
		WeeklyInsights previousInsight = weeklyInsightsDao.getWeeklyInsights(previousWeekStart, userId);
	    double previousAScore = getPreviousWeakScore(userId);
	    
	    
	    double averageScore = (double) totalScore / totalCount;
	    
	    String scoreTrend;
	    if (averageScore > previousAScore) {
	        scoreTrend = "Up";
	    } else if (averageScore < previousAScore) {
	        scoreTrend = "Down";
	    } else {
	        scoreTrend = "Stable";
	    }
	    
	    insight.setAvergeScore(String.valueOf(averageScore));
	    insight.setTopMood(topMood);
//	    mongoTemplate.save(insight);
	    
	    res.put("topMood", topMood);
	    res.put("averageScore", String.valueOf(averageScore));
	    res.put("scoreTrend", scoreTrend);
		
		return ResponseEntity.ok(res);
	}
	
	public ResponseEntity<?> getTopMoods(String userId){
		Map<String, Object> res = new HashMap<>();
		
		LocalDate today = LocalDate.now();

		LocalDate weekStart = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));

		LocalDate weekEnd = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
		
		List<Mood> moods = moodDao.getWeeklyMoods(userId, weekStart, weekEnd);
		
		if(moods == null || moods.isEmpty()) {
			res.put("topMoods", "No moods Data");
			return ResponseEntity.ok(res);
		}
		
		Map<String, Integer> frequencyMoods = moods.stream()
			    .collect(Collectors.groupingBy(Mood::getMood, Collectors.collectingAndThen(Collectors.counting(), Long::intValue)));

		
		List<Map<String, Object>> topMoods = frequencyMoods.entrySet().stream()
	    	    .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
	    	    .limit(3)
	    	    .map(entry -> {
	    	        Map<String, Object> moodInfo = new HashMap<>();
	    	        moodInfo.put("mood", entry.getKey().trim().toLowerCase());
	    	        moodInfo.put("frequency", entry.getValue());
	    	        return moodInfo;
	    	    })
	    	    .collect(Collectors.toList());
		
		return ResponseEntity.ok(topMoods);
	}
	
	public String calculateMoodShifts(String userId) {
		LocalDate today = LocalDate.now();

		LocalDate weekStart = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));

		LocalDate weekEnd = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
		
		List<Mood> moods = moodDao.getWeeklyMoods(userId, weekStart, weekEnd);
		
	    if (moods == null || moods.size() < 2) {
	        return String.valueOf(0); // no shifts possible
	    }

	    // Sort moods by timestamp ascending
	    List<Mood> sortedMoods = moods.stream()
	        .sorted(Comparator.comparing(Mood::getCreatedDate))
	        .collect(Collectors.toList());

	    int shifts = 0;
	    String prevMood = null;

	    for (Mood mood : sortedMoods) {
	        String currentMood = mood.getMood().trim().toLowerCase();
	        if (prevMood != null && !prevMood.equals(currentMood)) {
	            shifts++;
	        }
	        prevMood = currentMood;
	    }
	    
	    WeeklyInsights insight = weeklyInsightsDao.getWeeklyInsights(weekEnd, userId);
	    if(insight == null) {
	    	insight = new WeeklyInsights();
		    insight.setWeekDate(weekStart);
		    insight.setUserId(userId);
		    insight.setCreatedDate(LocalDateTime.now());
	    }
	    insight.setMoodShifts(String.valueOf(shifts));
//	    mongoTemplate.save(insight);

	    return String.valueOf(shifts);
	}
	
	public double getPreviousWeakScore(String userId) {
		LocalDate today = LocalDate.now();

		LocalDate weekStart = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));

		LocalDate weekEnd = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
		
		List<Mood> moods = moodDao.getWeeklyMoods(userId, weekStart, weekEnd);
		
		if(moods == null || moods.isEmpty()) {
			return 0.0;
		}
		
		Map<String, Integer> frequencyMoods = moods.stream()
			    .collect(Collectors.groupingBy(Mood::getMood, Collectors.collectingAndThen(Collectors.counting(), Long::intValue)));

		int totalScore = 0;
	    int totalCount = 0;

	    String topMood = null;
	    int maxFrequency = 0;

	    for (Map.Entry<String, Integer> entry : frequencyMoods.entrySet()) {
	        String moodId = entry.getKey();
	        int frequency = entry.getValue();
	        String normalizedMoodId = moodId.trim().toLowerCase();
	        int moodScore = MOOD_SCORES.getOrDefault(normalizedMoodId, 0);

	        totalScore += moodScore * frequency;
	        totalCount += frequency;

	        if (frequency > maxFrequency) {
	            maxFrequency = frequency;
	            topMood = normalizedMoodId;
	        }
	    }
	    
	    double averageScore = (double) totalScore / totalCount;
	    
	    return averageScore;
	}

}

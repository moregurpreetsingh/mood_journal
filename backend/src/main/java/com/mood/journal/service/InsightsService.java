package com.mood.journal.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mood.journal.dao.MoodDao;
import com.mood.journal.model.Mood;

@Service
public class InsightsService {
	
	@Autowired
	MoodDao moodDao;

	public List<Mood> getWeeklyAverage(String userId){
		LocalDate today = LocalDate.now();

		LocalDate weekStart = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));

		LocalDate weekEnd = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
		
		List<Mood> moods = moodDao.getWeeklyMoods(userId, weekStart, weekEnd);
		
		Map<String, Integer> frequencyMapInt = moods.stream()
			    .collect(Collectors.groupingBy(Mood::getMood, Collectors.collectingAndThen(Collectors.counting(), Long::intValue)));

		return new ArrayList<Mood>();
	}
	
}

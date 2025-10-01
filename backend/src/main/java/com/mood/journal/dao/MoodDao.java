package com.mood.journal.dao;

import java.util.List;

import com.mood.journal.model.Mood;

public interface MoodDao {

	public List<Mood> todayMoods(String userId);
	
	public List<Mood> recentMoods(String userId);
	
	public Mood todayMostRecentMood(String userId);
	
}

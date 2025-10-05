package com.mood.journal.dao;

import java.time.LocalDate;

import com.mood.journal.model.WeeklyInsights;

public interface WeeklyInsightsDao {

	public WeeklyInsights isWeeklyInsights(LocalDate weekDate, String userId);
	
}

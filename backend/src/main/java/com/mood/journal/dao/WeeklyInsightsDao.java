package com.mood.journal.dao;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.mood.journal.model.WeeklyInsights;

public interface WeeklyInsightsDao {

	public WeeklyInsights getWeeklyInsights(LocalDate weekDate, String userId);
	
}

package com.mood.journal.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "weekly_insights")
public class WeeklyInsights {

	private static final long serialVersionUID = 1L;
	
	@Field("user_Id")
	private String userId;

	@Field("week_date")
	private LocalDate weekDate;
	
	@Field("top_mood")
	private String topMood;
	
	@Field("average_scrore")
	private String avergeScore;
	
	@Field("mood_shifts")
	private String moodShifts;
	
	@Field("created_date")
	private LocalDateTime createdDate;
	
}

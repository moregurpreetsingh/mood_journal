package com.mood.journal.dao.impl;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.mood.journal.dao.WeeklyInsightsDao;
import com.mood.journal.model.WeeklyInsights;
import com.mood.journal.util.MongoUtil;

@Repository
public class WeeklyInsightsDaoImpl implements WeeklyInsightsDao{

	private final MongoTemplate mongoTemplate = MongoUtil.getMongoTemplate();
	
	public WeeklyInsights getWeeklyInsights(LocalDate weekDate, String userId) {
	    Query query = new Query();
	    query.addCriteria(Criteria.where("week_date").is(weekDate).and("user_id").is(userId));
	    return mongoTemplate.findOne(query, WeeklyInsights.class);
	}
	
}

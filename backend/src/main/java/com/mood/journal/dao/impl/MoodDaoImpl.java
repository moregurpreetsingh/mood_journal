package com.mood.journal.dao.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.mood.journal.dao.MoodDao;
import com.mood.journal.model.Mood;
import com.mood.journal.util.MongoUtil;

@Repository
public class MoodDaoImpl implements MoodDao{

	@Autowired
	private MongoTemplate mongoTemplate;
	
	public List<Mood> todayMoods(String userId){
		LocalDate today = LocalDate.now();
	    LocalDateTime startOfDay = today.atStartOfDay();
	    LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

	    Query query = new Query();
	    query.addCriteria(Criteria.where("user_id").is(userId)
	        .and("created_date").gte(startOfDay).lte(endOfDay));
		List<Mood> list = mongoTemplate.find(query, Mood.class);
		return list != null ? list : new ArrayList<>();
	}

	
	public List<Mood> recentMoods(String userId) {
	    Query query = new Query();
	    query.addCriteria(Criteria.where("user_id").is(userId));
	    query.with(Sort.by(Sort.Direction.DESC, "created_date"));
	    query.limit(10);

	    List<Mood> list = mongoTemplate.find(query, Mood.class);
	    return list != null ? list : new ArrayList<>();
	}

	public Mood todayMostRecentMood(String userId) {
	    LocalDate today = LocalDate.now();
	    LocalDateTime startOfDay = today.atStartOfDay();
	    LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

	    Query query = new Query();
	    query.addCriteria(
	        Criteria.where("user_id").is(userId)
	                .and("created_date").gte(startOfDay).lte(endOfDay)
	    );
	    query.with(Sort.by(Sort.Direction.DESC, "created_date"));
	    query.limit(1);

	    List<Mood> result = mongoTemplate.find(query, Mood.class);
	    return result.isEmpty() ? null : result.get(0);
	}
	

	public List<Mood> getWeeklyMoods(String userId, LocalDate sDate, LocalDate eDate){
		Query query = new Query();
		query.addCriteria(Criteria.where("user_id").is(userId)
	                .and("created_date").gte(sDate).lte(eDate));
		List<Mood> result = mongoTemplate.find(query, Mood.class);
	    return result.isEmpty() ? null : result;
	}
	
}

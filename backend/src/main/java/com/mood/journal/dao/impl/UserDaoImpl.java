package com.mood.journal.dao.impl;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.mood.journal.dao.UserDao;
import com.mood.journal.model.User;
import com.mood.journal.util.MongoUtil;

@Repository
public class UserDaoImpl implements UserDao {
	
	private final MongoTemplate mongoTemplate = MongoUtil.getMongoTemplate();
	
	public boolean existsByEmail(String email) {
		Query query = new Query();
		query.addCriteria(Criteria.where("email").is(email));
		return mongoTemplate.exists(query, User.class);
	}
	
	public User findByEmail(String email) {
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(email));
        return mongoTemplate.findOne(query, User.class);
    }
	
	public User getUserDetails(String userId) {
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(userId));
		return mongoTemplate.findOne(query, User.class);
	}
}

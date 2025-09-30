package com.mood.journal.util;

import com.mongodb.client.MongoClients;
import org.springframework.data.mongodb.core.MongoTemplate;

public class MongoUtil {

    private static MongoTemplate mongoTemplate;

    private static final String DATABASE_NAME = "mood_journal";
    private static final String MONGO_URI = "mongodb://localhost:27017"; // Change if needed

    // Singleton MongoTemplate
    public static MongoTemplate getMongoTemplate() {
        if (mongoTemplate == null) {
            mongoTemplate = new MongoTemplate(MongoClients.create(MONGO_URI), DATABASE_NAME);
        }
        return mongoTemplate;
    }
}

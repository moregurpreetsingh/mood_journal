package com.mood.journal.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Document(collection = "mood")
public class Mood implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	private String id;
	
	@Field(name = "user_id")
	private String userId;
	
	@Field(name = "created_date")
	private LocalDateTime createdDate;
	
	@Field(name = "mood")
	private String mood;
	
}

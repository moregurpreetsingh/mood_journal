package com.mood.journal.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "users")
public class User implements Serializable{

	private static final long serialBersionUID = 1L;
	
	private String id;
	
	@Field(name = "user_name")
	private String userName;

	@Field(name = "email")
	private String email;

	@Field(name = "password")
	private String password;

	@Field(name = "created_date")
	private LocalDateTime createdDate;
	
	
}

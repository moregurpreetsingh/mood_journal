package com.mood.journal.response;

import java.time.format.DateTimeFormatter;

import com.mood.journal.model.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {

	private String id, userName, email, password, createdDate;
	
	public UserResponse(User user) {
		this.id = user.getId();
		this.email = user.getEmail();
		this.password = user.getPassword();
		this.userName = user.getUserName();
		
		 DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm a");
        this.createdDate = user.getCreatedDate().format(formatter);
	}
	
}

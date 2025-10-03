package com.mood.journal.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {

	private String userName, email, password, userId, newPass, confirmPass;
	
}

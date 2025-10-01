package com.mood.journal.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MoodRequest {

	@NotBlank(message = "UserId is required")
	private String userId;
	
	@NotBlank(message = "Mood is required")
    private String mood;
	
}

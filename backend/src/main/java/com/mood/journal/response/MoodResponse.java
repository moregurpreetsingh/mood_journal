package com.mood.journal.response;

import java.time.format.DateTimeFormatter;

import com.mood.journal.model.Mood;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MoodResponse {

	private String id;
    private String mood;
    private String formattedDate;

    public MoodResponse(Mood mood) {
        this.id = mood.getId();
        this.mood = mood.getMood();

        // Format date here
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm a");
        this.formattedDate = mood.getCreatedDate().format(formatter);
    }
    
}

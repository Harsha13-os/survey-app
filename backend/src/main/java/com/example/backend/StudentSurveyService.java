package com.example.backend;

import com.example.backend.StudentSurvey;
import com.example.backend.StudentSurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentSurveyService {
    @Autowired
    private StudentSurveyRepository surveyRepository;

    public StudentSurvey createSurvey(StudentSurvey survey) {
        return surveyRepository.save(survey);
    }

    public List<StudentSurvey> getAllSurveys() {
        return surveyRepository.findAll();
    }

    public Optional<StudentSurvey> getSurveyById(Long id) {
        return surveyRepository.findById(id);
    }

    public StudentSurvey updateSurvey(Long id, StudentSurvey surveyDetails) {
        Optional<StudentSurvey> survey = surveyRepository.findById(id);
        if (survey.isPresent()) {
            StudentSurvey existingSurvey = survey.get();
            existingSurvey.setFirstName(surveyDetails.getFirstName());
            existingSurvey.setLastName(surveyDetails.getLastName());
            existingSurvey.setStreetAddress(surveyDetails.getStreetAddress());
            existingSurvey.setCity(surveyDetails.getCity());
            existingSurvey.setState(surveyDetails.getState());
            existingSurvey.setZip(surveyDetails.getZip());
            existingSurvey.setTelephone(surveyDetails.getTelephone());
            existingSurvey.setEmail(surveyDetails.getEmail());
            existingSurvey.setSurveyDate(surveyDetails.getSurveyDate());
            existingSurvey.setCampusLikes(surveyDetails.getCampusLikes());
            existingSurvey.setInterestSource(surveyDetails.getInterestSource());
            existingSurvey.setRecommendationLikelihood(surveyDetails.getRecommendationLikelihood());
            existingSurvey.setComments(surveyDetails.getComments());
            return surveyRepository.save(existingSurvey);
        }
        return null;
    }

    public void deleteSurvey(Long id) {
        surveyRepository.deleteById(id);
    }
}

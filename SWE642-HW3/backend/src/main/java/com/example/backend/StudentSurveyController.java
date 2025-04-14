package com.example.backend;

import com.example.backend.StudentSurvey;
import com.example.backend.StudentSurveyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/surveys")
@CrossOrigin(origins = "*")
public class StudentSurveyController {
    @Autowired
    private StudentSurveyService surveyService;

    @PostMapping
    public ResponseEntity<StudentSurvey> createSurvey(@Valid @RequestBody StudentSurvey survey) {
        return ResponseEntity.ok(surveyService.createSurvey(survey));
    }

    @GetMapping
    public ResponseEntity<List<StudentSurvey>> getAllSurveys() {
        return ResponseEntity.ok(surveyService.getAllSurveys());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentSurvey> getSurveyById(@PathVariable Long id) {
        return surveyService.getSurveyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentSurvey> updateSurvey(
            @PathVariable Long id,
            @Valid @RequestBody StudentSurvey surveyDetails) {
        StudentSurvey updatedSurvey = surveyService.updateSurvey(id, surveyDetails);
        if (updatedSurvey == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedSurvey);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSurvey(@PathVariable Long id) {
        surveyService.deleteSurvey(id);
        return ResponseEntity.ok().build();
    }
}

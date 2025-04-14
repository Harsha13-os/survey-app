package com.example.backend;

import com.example.backend.StudentSurvey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentSurveyRepository extends JpaRepository<StudentSurvey, Long> {
}

package com.onepieceai.onepiece_ai.exception;

import com.google.genai.errors.ServerException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.ResponseEntity;

@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler(ServerException.class)
    public ResponseEntity<String> handleServerException(ServerException e) {
        return ResponseEntity
                .status(HttpStatus.SERVICE_UNAVAILABLE)
                .body("you have reached the AI limit. Try again later");
    }
}

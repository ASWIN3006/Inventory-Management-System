package com.training.web.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.MethodArgumentNotValidException;
import com.training.exceptions.MicroServiceException;

@RestControllerAdvice
public class GlobalExceptionController {

    @ExceptionHandler(MicroServiceException.class)
    public ResponseEntity<ErrorResponse> handleAllException(MicroServiceException ex) {
        return ResponseEntity.badRequest().body(new ErrorResponse("ERROR", ex.getMessage()));
    }

    @ExceptionHandler({ MethodArgumentNotValidException.class, BindException.class })
    public ResponseEntity<ErrorResponse> handleValidationException(Exception ex) {
        List<FieldError> fieldErrors;

        if (ex instanceof MethodArgumentNotValidException) {
            fieldErrors = ((MethodArgumentNotValidException) ex).getBindingResult().getFieldErrors();
        } else {
            fieldErrors = ((BindException) ex).getBindingResult().getFieldErrors();
        }

        String message = fieldErrors.stream()
                .map(fieldError -> fieldError.getField() + " " + fieldError.getDefaultMessage())
                .collect(Collectors.joining(", "));

        if (message == null || message.trim().isEmpty()) {
            message = "Validation failed";
        }

        return ResponseEntity.badRequest().body(new ErrorResponse("ERROR", message));
    }

    // ErrorResponse class as an inner class or separate file
    public static class ErrorResponse {
        private String status;
        private String message;

        public ErrorResponse(String status, String message) {
            this.status = status;
            this.message = message;
        }

        public String getStatus() {
            return status;
        }

        public String getMessage() {
            return message;
        }
    }
}

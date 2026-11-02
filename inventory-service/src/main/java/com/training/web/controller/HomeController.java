package com.training.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    private static Logger LOGGER = LoggerFactory.getLogger(HomeController.class);

    @GetMapping("/welcome")
    public ResponseEntity<WelcomeResponse> showHomePage() {
        LOGGER.info("Execution Started [showHomePage()]");
        WelcomeResponse response = new WelcomeResponse("Welcome to the Home Page!");
        LOGGER.info("Execution over [showHomePage()]");
        return ResponseEntity.ok(response);
    }

    public static class WelcomeResponse {
        private String message;

        public WelcomeResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}

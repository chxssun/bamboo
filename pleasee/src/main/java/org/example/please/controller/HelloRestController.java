package org.example.please.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
//@CrossOrigin(origins = "*")
@RestController
public class HelloRestController {
    @GetMapping("/api")
    public String hello() {
        return "What the yack";
    }
}

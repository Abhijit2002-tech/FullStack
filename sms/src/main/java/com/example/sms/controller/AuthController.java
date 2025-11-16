package com.example.sms.controller;

import com.example.sms.model.User;
import com.example.sms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    private UserService userService;

    //Register
    @PostMapping("register")
    public String register(@RequestBody User user){
        User savedUser = userService.registerUser(user);
        if (savedUser == null){
            return "Email already exists!";
        }
        return "User registered successfully";

    }
    // Login
    @PostMapping("login")
    public String login(@RequestBody User user){
        User validUser = userService.logingUser(user.getEmail(), user.getPassword());
        if (validUser != null){
            return "Login successful";
        }
        return "Invalid email or password";
    }

}

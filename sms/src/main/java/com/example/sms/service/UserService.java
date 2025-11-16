package com.example.sms.service;

import com.example.sms.model.User;
import com.example.sms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user){
        // chek if email exists
        if (userRepository.findByEmail(user.getEmail()) !=null){
            return null; // if email already exists

        }
        return userRepository.save(user);
    }

    public User logingUser (String email, String password){
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)){
            return user;
        }
        return null;
    }
}

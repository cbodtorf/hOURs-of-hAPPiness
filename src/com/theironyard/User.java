package com.theironyard;

/**
 * Created by Erik on 6/16/16.
 */
public class User {
    Integer userId;
    String username;

    public User(Integer userId, String username) {
        this.userId = userId;
        this.username = username;
    }

    public User() {
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}

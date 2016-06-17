package com.theironyard;

import jodd.json.JsonParser;
import org.h2.tools.Server;
import spark.Spark;

import java.sql.*;
import java.util.ArrayList;


public class Main {

    public static void createTables (Connection conn) throws SQLException {
        Statement stmt = conn.createStatement();
        stmt.execute("CREATE TABLES IF NOT EXISTS users (userId IDENTITY, username VARCHAR)");
        stmt.execute("CREATE TABLES IF NOT EXISTS bars (barId IDENTITY, barName VARCHAR, barLocation VARCHAR user_id INT)");
        stmt.execute("CREATE TABLES IF NOT EXISTS reviews(reviewId IDENTITY, review VARCHAR, rating INT, author VARCHAR bar_id INT)");
    }

    public static void insertUser (Connection conn, String username) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("INSERT INTO users VALUES (NULL, ?)");
        stmt.setString(1, username);
        stmt.execute();
    }

    public static User selectUser (Connection conn, String username) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE name = ?");
        stmt.setString(1, username);
        ResultSet results = stmt.executeQuery();
        if (results.next()) {
            Integer userId = results.getInt("userId");
            return new User(userId, username);
        }
        return null;
    }

    public static void insertBar (Connection conn, String barName, String barLocation) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("INSERT INTO bars VALUES (NULL, ?, ?)");
        stmt.setString(1, barName);
        stmt.setString(2, barLocation);
        stmt.execute();
    }

    public static Bar selectBar (Connection conn, Integer barId) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM bars WHERE barId = ?");
        stmt.setInt(1, barId);
        ResultSet results = stmt.executeQuery();
        if (results.next()) {
            String barName = results.getString("barName");
            String barLocation = results.getString("barLocation");
            return new Bar(barId, barName, barLocation);
        }
        return null;
    }

    public static ArrayList<Bar> selectBars(Connection conn, Integer userId) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM bars INNER JOIN users ON bars.user_id = users.userId WHERE users.userId = ?");
        stmt.setInt(1, userId);
        ResultSet results = stmt.executeQuery();
        ArrayList<Bar> bars = new ArrayList<>();
        while (results.next()) {
            Integer barId = results.getInt("barId");
            String barName = results.getString("barName");
            String barLocation = results.getString("barLocation");
            Bar bar = new Bar(barId, barName, barLocation);
            bars.add(bar);
        }
        return bars;
    }

    public static void updateBar (Connection conn, Integer barId, String barName, String barLocation) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("UPDATE bars SET barName = ?, barLocation = ? WHERE barId = ?");
        stmt.setInt(1, barId);
        stmt.setString(2, barName);
        stmt.setString(3, barLocation);
        stmt.execute();
    }

    public static void deleteBar(Connection conn, Integer barId) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("DELETE FROM bars WHERE barId = ?");
        stmt.setInt(1, barId);
        stmt.execute();
    }

    public static void insertReview (Connection conn, String review, int rating, String author) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("INSERT INTO reviews VALUES (NULL, ?, ?, ?)");
        stmt.setString(1, review);
        stmt.setInt(2, rating);
        stmt.setString(3, author);
        stmt.execute();
    }

    public static Review selectReview (Connection conn, Integer reviewId) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM reviews WHERE reviewId = ?");
        stmt.setInt(1, reviewId);
        ResultSet results = stmt.executeQuery();
        if (results.next()) {
            String review = results.getString("review");
            int rating = results.getInt("rating");
            String author = results.getString("author");
            return new Review(reviewId, review, rating, author);
        }
        return null;
    }

    public static ArrayList<Review> selectReviews(Connection conn, Integer barId) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("SELECT * FROM reviews INNER JOIN bars ON reviews.bar_id = bars.barId WHERE bars.barId = ?");
        stmt.setInt(1, barId);
        ResultSet results = stmt.executeQuery();
        ArrayList<Review> reviewList = new ArrayList<>();
        while (results.next()) {
            Integer reviewId = results.getInt("reviewId");
            String review = results.getString("review");
            int rating = results.getInt("rating");
            String author = results.getString("author");
            Review reviews = new Review(reviewId, review, rating, author);
            reviewList.add(reviews);
        }
        return reviewList;
    }

    public static void updateReview (Connection conn, Integer reviewId, String review, int rating, String author) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("UPDATE reviews SET review = ?, rating = ?, author = ? WHERE reviewId = ?");
        stmt.setInt(1, reviewId);
        stmt.setString(2, review);
        stmt.setInt(3, rating);
        stmt.setString(4, author);
        stmt.execute();
    }

    public static void deleteReview(Connection conn, Integer reviewId) throws SQLException {
        PreparedStatement stmt = conn.prepareStatement("DELETE FROM reviews WHERE reviewId = ?");
        stmt.setInt(1, reviewId);
        stmt.execute();
    }

    public static void main(String[] args) throws SQLException {
        Server.createWebServer().start();
        Connection conn = DriverManager.getConnection("jdbc:h2:./main");
        createTables(conn);

        Spark.init();

        Spark.get("/get-bars",
                (request, response) -> {

                    return "";
                }
        );

        Spark.get("/get-reviews",
                (request, response) -> {

                    return "";
                }
        );

        Spark.post("/create-user",
                (request, response) -> {
                    String body = request.body();
                    JsonParser p = new JsonParser();
                    User user = p.parse(body, User.class);
                    insertUser(conn, user);
                    return"";
                    }
        );

        Spark.post("/create-bar",
                (request, response) -> {

                    return "";
                }
        );

        Spark.post("/create-review",
                (request, response) -> {

                    return "";
                }
        );

        Spark.put("/edit-bar",
                (request, response) -> {

                    return "";
                }
        );

        Spark.put("/edit-review",
                (request, response) -> {

                    return "";
                }
        );

        Spark.delete("/delete-bar",
                (request, response) -> {

                    return "";
                }
        );

        Spark.delete("/delete-review",
                (request, response) -> {

                    return "";
                }
        );

    }


}

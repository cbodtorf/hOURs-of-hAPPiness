package com.theironyard;

/**
 * Created by Erik on 6/16/16.
 */
public class Review {
    Integer reviewId;
    String review;
    int rating;
    String author;

    public Review(Integer reviewId, String review, int rating, String author) {
        this.reviewId = reviewId;
        this.review = review;
        this.rating = rating;
        this.author = author;
    }

    public Review() {
    }

    public Integer getReviewId() {
        return reviewId;
    }

    public void setReviewId(Integer reviewId) {
        this.reviewId = reviewId;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}

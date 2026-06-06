package com.eazybytes.eazystore.constants;

public class ApplicationConstants {

    private ApplicationConstants() {
        throw new AssertionError("Utility class cannot be instantiated");
    }

    public static final String JWT_SECRET_KEY = "AUTH_ACCESS_TOKEN";
    public static final String JWT_SECRET_DEFAULT_VALUE = "Y8mD4sR2pQwE9uT6gM1xA7vC5bL9tH3jK2pF6qW8";
    public static final String JWT_HEADER="Authorization";
    public static final String  ORDER_STATUS_CONFIRMED = "CONFIRMED";
    public static final String  ORDER_STATUS_CREATED = "CREATED";
    public static final String  ORDER_STATUS_CANCELLED = "CANCELLED";
    public static final String  OPEN_MESSAGE = "OPEN";
    public static final String  CLOSED_MESSAGE = "CLOSED";
}

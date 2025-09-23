package com.example.demo.registration;

import java.util.function.Predicate;

public class EmailValidation implements Predicate<String> {

    @Override
    public boolean test(String s) {
        return true;
    }
}

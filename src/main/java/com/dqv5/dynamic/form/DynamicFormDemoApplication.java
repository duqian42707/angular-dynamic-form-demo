package com.dqv5.dynamic.form;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.dqv5.dynamic.form.dao")
public class DynamicFormDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DynamicFormDemoApplication.class, args);
    }

}

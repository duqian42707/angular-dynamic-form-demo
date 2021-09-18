package com.dqv5.dynamic.form.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


/**
 * @author duq
 * @date 2021/9/18
 */
@RestController
@RequestMapping("/api")
public class ApiController {
    @GetMapping("/load")
    public ResponseEntity<?> load() {
        return ResponseEntity.ok("ok");
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Object obj) {
        return ResponseEntity.ok("ok");
    }
}

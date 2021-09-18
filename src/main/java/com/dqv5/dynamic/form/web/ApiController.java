package com.dqv5.dynamic.form.web;

import com.dqv5.dynamic.form.entity.FormData;
import com.dqv5.dynamic.form.repository.FormDataRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;


/**
 * @author duq
 * @date 2021/9/18
 */
@RestController
@RequestMapping("/api")
public class ApiController {

    @Resource
    private FormDataRepository formDataRepository;

    /**
     * todo： 使用sql进行复杂查询
     * select t.*,t.info -> 'hobby' as hobby from dynamic_form_data t where (t.info ->>'age')::int <20
     *
     * @return
     */
    @GetMapping("/query")
    public ResponseEntity<FormData> query() {
        List<FormData> all = formDataRepository.findAll();
        if (all.isEmpty()) {
            return ResponseEntity.ok(new FormData());
        }
        return ResponseEntity.ok(all.get(0));
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody FormData formData) {
        FormData save = formDataRepository.save(formData);
        return ResponseEntity.ok(save);
    }
}

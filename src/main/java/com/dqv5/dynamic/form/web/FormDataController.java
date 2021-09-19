package com.dqv5.dynamic.form.web;

import com.dqv5.dynamic.form.dao.FormDataMapper;
import com.dqv5.dynamic.form.entity.FormData;
import com.dqv5.dynamic.form.entity.FormDesign;
import com.dqv5.dynamic.form.repository.FormDataRepository;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.*;


/**
 * @author duq
 * @date 2021/9/18
 */
@RestController
@RequestMapping("/api/formData")
public class FormDataController {

    @Resource
    private FormDataRepository formDataRepository;
    @Resource
    private FormDataMapper formDataMapper;

    /**
     * select t.*,t.info -> 'hobby' as hobby from dynamic_form_data t where (t.info ->>'age')::int <20
     *
     * @return
     */
    @GetMapping("/query")
    public ResponseEntity<PageInfo<FormData>> query(Integer pageNum, Integer pageSize, @RequestParam String formId) {
        if (pageNum == null) {
            pageNum = 1;
        }
        if (pageSize == null) {
            pageSize = 10;
        }
        List<String> conditions = new ArrayList<>();
//        conditions.add(" info ->> 'age' = '18' ");
//        conditions.add(" info ->> 'name' like '%张%' ");
        PageHelper.startPage(pageNum, pageSize);
        List<FormData> list = formDataMapper.query(formId, conditions);
        PageInfo<FormData> pageInfo = new PageInfo<>(list);
        return ResponseEntity.ok(pageInfo);
    }

    @GetMapping("/findOne")
    public ResponseEntity<FormData> findOne() {
        Map<String, Object> params = new HashMap<>();
        List<FormData> query = formDataMapper.query(null, new ArrayList<>());
        if (query.isEmpty()) {
            return ResponseEntity.ok(new FormData());
        }
        return ResponseEntity.ok(query.get(0));
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody FormData formData) {
        FormData form;
        Date now = new Date();
        if (StringUtils.isEmpty(formData.getId())) {
            form = formData;
            form.setCreateDate(now);
        } else {
            form = formDataRepository.findById(formData.getId()).orElseThrow(() -> new RuntimeException("数据不存在!"));
            form.setFormId(formData.getFormId());
            form.setInfo(formData.getInfo());
        }
        form.setLastModifiedDate(now);
        FormData save = formDataRepository.save(form);
        return ResponseEntity.ok(save);
    }


    /**
     * mybatis插入测试
     *
     * @param formData
     * @return
     */
    @PostMapping("/save2")
    public ResponseEntity<?> save2(@RequestBody FormData formData) {
        formData.setId(UUID.randomUUID().toString());
        formData.setCreateDate(new Date());
        formDataMapper.insert(formData);
        return ResponseEntity.ok(formData);
    }
}

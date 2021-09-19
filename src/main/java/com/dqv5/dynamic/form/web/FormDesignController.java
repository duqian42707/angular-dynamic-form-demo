package com.dqv5.dynamic.form.web;

import com.dqv5.dynamic.form.dao.FormDataMapper;
import com.dqv5.dynamic.form.entity.FormData;
import com.dqv5.dynamic.form.entity.FormDesign;
import com.dqv5.dynamic.form.repository.FormDataRepository;
import com.dqv5.dynamic.form.repository.FormDesignRepository;
import com.github.pagehelper.PageInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
@RequestMapping("/api/formDesign")
public class FormDesignController {

    @Resource
    private FormDesignRepository formDesignRepository;

    /**
     * select t.*,t.info -> 'hobby' as hobby from dynamic_form_data t where (t.info ->>'age')::int <20
     *
     * @return
     */
    @GetMapping("/query")
    public ResponseEntity<PageInfo<FormDesign>> query(Integer pageNum, Integer pageSize) {
        if (pageNum == null) {
            pageNum = 1;
        }
        if (pageSize == null) {
            pageSize = 10;
        }
        Pageable pageable = PageRequest.of(pageNum - 1, pageSize, Sort.Direction.DESC, "lastModifiedDate");
        Page<FormDesign> page = formDesignRepository.findAll(pageable);
        PageInfo<FormDesign> pageInfo = new PageInfo<>(page.getContent());
        pageInfo.setTotal(page.getTotalElements());
        return ResponseEntity.ok(pageInfo);
    }

    @GetMapping("/all")
    public ResponseEntity<List<FormDesign>> all() {
        Sort sort = Sort.by(Sort.Direction.ASC, "createDate");
        List<FormDesign> all = formDesignRepository.findAll(sort);
        return ResponseEntity.ok(all);
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody FormDesign formDesign) {
        FormDesign form;
        Date now = new Date();
        if (StringUtils.isEmpty(formDesign.getFormId())) {
            form = formDesign;
            form.setCreateDate(now);
        } else {
            form = formDesignRepository.findById(formDesign.getFormId()).orElseThrow(() -> new RuntimeException("数据不存在"));
            form.setFormName(formDesign.getFormName());
            form.setInfo(formDesign.getInfo());
        }
        form.setLastModifiedDate(now);
        FormDesign save = formDesignRepository.save(form);
        return ResponseEntity.ok(save);
    }

}

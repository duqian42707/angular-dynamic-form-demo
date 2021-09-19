package com.dqv5.dynamic.form.dao;

import com.dqv5.dynamic.form.entity.FormData;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @author duq
 * @date 2021/9/19
 */
public interface FormDataMapper {

    List<FormData> query(@Param("formId") String formId, @Param("conditions") List<String> conditions);

    void insert(FormData formData);
}

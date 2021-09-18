package com.dqv5.dynamic.form.repository;

import com.dqv5.dynamic.form.entity.FormData;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author duq
 * @date 2021/9/18
 */
public interface FormDataRepository extends JpaRepository<FormData, String> {
}

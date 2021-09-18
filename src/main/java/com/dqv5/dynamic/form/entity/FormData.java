package com.dqv5.dynamic.form.entity;

import com.alibaba.fastjson.JSONObject;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.Date;

/**
 * @author duq
 * @date 2021/9/18
 */
@Data
@Entity
@Table(name = "dynamic_form_data")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class FormData {
    @Id
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @GeneratedValue(generator = "uuid")
    private String id;

    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    private JSONObject info;

    private Date createDate;

}

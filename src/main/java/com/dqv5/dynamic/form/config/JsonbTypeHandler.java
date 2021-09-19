package com.dqv5.dynamic.form.config;

import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;
import org.postgresql.util.PGobject;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@MappedTypes({JSONObject.class})
public class JsonbTypeHandler extends BaseTypeHandler<JSONObject> {

    //报错的话，请将pom文件的引入graphql的地方<version></version>标签注释掉
    private static final PGobject jsonObject = new PGobject();

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, JSONObject parameter, JdbcType jdbcType)
            throws SQLException {
        if (ps != null) {
            String value = parameter.toJSONString();
            jsonObject.setType("jsonb");
            jsonObject.setValue(value);
            ps.setObject(i, jsonObject);
        }
    }

    @Override
    public JSONObject getNullableResult(ResultSet rs, String columnName) throws SQLException {
        String json = rs.getString(columnName);
        return JSONObject.parseObject(json);
    }

    @Override
    public JSONObject getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        String json = rs.getString(columnIndex);
        return JSONObject.parseObject(json);
    }

    @Override
    public JSONObject getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        String json = cs.getString(columnIndex);
        return JSONObject.parseObject(json);
    }

}

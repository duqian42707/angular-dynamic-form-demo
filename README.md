# angular+springboot动态表单示例项目


## 技术栈

- 数据库：postgresql
- 后台：springboot2.3.10.RELEASE
- 前台：angular8、ng-zorro8、[@delon/form@8](https://ng-alain.com/version/8.x/form/getting-started/zh)


## 记录

本机docker安装postgresql
```bash
docker run -d -p 5432:5432 --name postgres -v ~/data/postgres/data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=123456 postgres:13.3-alpine
```

postgresql json 函数和运算符：
https://www.postgresql.org/docs/current/functions-json.html

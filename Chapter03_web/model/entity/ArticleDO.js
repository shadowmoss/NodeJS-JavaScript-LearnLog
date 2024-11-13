const db =  require("../../sqlitedb");
class Article{
    static all(cb){
        db.all('SELECT * FROM articles',cb);    // 获取所有文章
    }
    static find(id,cb){
        db.get('SELECT * FROM articles WHERE id = ?',id,cb);    // 选择一篇指定的文章
    }
    static create(data,cb){
        const sql = 'INSERT INTO articles(title,content) VALUES(?,?)';
        db.run(sql,data.title,data.content,cb);
    }
    static delete(id,cb){
        if(!id){
            return cb(new Error('Please provide an id'));
        }
        db.run('DELETE FROM articles WHERE id=?',id,cb);
    }
}
module.exports.Article = Article;
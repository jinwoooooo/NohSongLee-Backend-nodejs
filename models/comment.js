const sql = require("./db.js");

const Comment = function(comment){
    this.board_id = comment.board_id;
    this.parent_id = comment.parent_id;
    this.writer = comment.wrtier;
    this.content = comment.content;
    this.regdate = comment.regdate;
};

Comment.create = (newComment, result) => {
    sql.query("INSERT INTO comment SET ?",newComment, (err,res)=>{
        if(err){
            console.log("error: ",err);
            return;
        }
    });
};

Comment.findById = async (id) => {
    try {
        const [rows,fields] = await sql.promise().query("SELECT * FROM comment WHERE id = ?", id, (err,res)=>{
            if(err){
                console.log("error: ",err);
                return;
            }
        });
    
        return rows;    
    } catch (error) {
        console.log(error);
    }
    
};

Comment.findByboardId = async (boardId) => {
    try {
        const [rows,fields] = await sql.promise().query("SELECT comment.id, comment.board_id, comment.parent_id, comment.writer, school.name as writer_school, comment.content, comment.regdate FROM comment left join user on comment.writer = user.nickname left join school on user.school_id = school.id Where board_id = ? ORDER BY comment.regdate", boardId, (err,res)=>{
            if(err){
                console.log("error: ",err);
                return;
            } 
        });
    
        return rows;    
    } catch (error) {
        console.log(error);
    }
    
};


Comment.update = async () => {
    try {
        const [rows,fields] = await sql.promise().query("SELECT * FROM board ORDER BY regdate");
    
        return rows;    
    } catch (error) {
        console.log(error);
    }
}

module.exports = Comment;
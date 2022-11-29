const authMiddleware = require("../middlewares/jwtauth");

module.exports = app =>{
    const users = require("../controllers/UserController");
    const board = require("../controllers/BoardController");
    const comment = require("../controllers/CommentController");
    const school = require("../controllers/SchoolController");

    // 회원가입
    app.post("/users/signup", users.create);
    app.post("/users/login", users.login);
    app.get("/users/follow", authMiddleware, users.findFollow);
    app.post("/users/follow/add", authMiddleware, users.addFollow);
    app.post("/users/follow/delete", authMiddleware, users.DeleteFollow);

    // 게시판
    app.post("/board/write", authMiddleware, board.create);
    app.get("/board/list", board.getList);
    app.get("/board/:BoardId", board.getId);
    app.put("/board/edit", authMiddleware,board.updateBoardId);

    // 댓글
    app.post("/comment/write", authMiddleware, comment.create);
    app.put("/comment/edit", authMiddleware, comment.updatecommentId);

    // 학교
    app.get("/school", school.search);
    app.get("/school/:school_id/", school.searchInSchool);
    app.get("/school/:school_id/info", school.getSchoolInfo);

    // 일반검색
    app.get("/board", board.search);
};
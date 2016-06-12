module.exports = {
	getList: function(req, res){
		getList(req, res);
	}
}

function getList(req, res) {
	console.log("ok");

	var query = req.query;
	var day = query.day;
	var limit = query.limit;

	if (day !=null && limit!=null) {
      var limit = parseInt(limit);
      var sql = 'select `發文日期`,`推文數`,`標題`,`連結` from ptt_db.ptt_gossiping where	`發文日期` between curdate()-? and curdate() order by `推文數` DESC limit  ? ;'

      var sqlparams = [day,limit];

      pool.query(sql,sqlparams,function(err,rows){
        if(err) {
          throw error;
        }
        res.send(rows);
        res.end();
      });
    }else{
      console.log('not valid query,should be: \n/article?getDays=xx&getArticleNumbers=xx');
      res.send('not valid query,should be: \n/article?getDays=xx&getArticleNumbers=xx');
      res.end();
    }

}


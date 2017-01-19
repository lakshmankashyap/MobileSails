module.exports = {
  errorResult: {
    code: -1,
    statusCode: 200,
    message: 'param is error',
    data: null
  },

  successResult: {
    code: 0,
    statusCode: 200,
    message: null,
    data: null
  },

  postMust: 'POST method is must',
  getMust: 'GET method is must',
  putMust: 'PUT method is must',
  deleteMust: 'DELETE method is must',

  paramError: 'param is error',
  bodyError: 'body is error',
  resultError: 'result is error',

  activeCode: '12345',
  activeState: '已激活',
  deviceState: '正常',
  other: 'http://jingyan.baidu.com/article/5bbb5a1b176f7e13eba179d0.html',

  messages: [
    {
      type: 201,
      name: '新任务'
    },
    {
      type: 202,
      name: '任务状态更新'
    }
  ]
};

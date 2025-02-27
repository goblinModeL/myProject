import  http from './httpRequest.ts'

export  function  login(url,data){
    return http({
        url:url,
        method: "post",
        data:data
    })
}
export  function  register(url,data){
    return http({
        url:url,
        method: "post",
        data:data
    })
}
export  function  getAllUsers(url,userId){
    return http({
        url:url,
        method: "get",
        params:{userId:userId}
    })
}
// 获取聊天记录
export  function  chatHistory(url,data){
    return http({
        url:url,
        method: "post",
        data:data,
    })
}
// export  function  login(url,data){
//     return $http({
//         url:url,
//         method: "get",
//         params: { ids: ids }
//     })
// }
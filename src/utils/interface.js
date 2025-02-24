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
        method: "post",
        data:{userId:userId}
    })
}
// export  function  login(url,data){
//     return $http({
//         url:url,
//         method: "get",
//         params: { ids: ids }
//     })
// }
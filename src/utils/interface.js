import  http from './httpRequest.ts'

export  function  login(url,data){
    return http({
        url:url,
        method: "post",
        data:data
    })
}
// export  function  login(url,data){
//     return $http({
//         url:url,
//         method: "get",
//         params: { ids: ids }
//     })
// }
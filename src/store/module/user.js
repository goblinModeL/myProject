 import  {defineStore} from "pinia";
export  const  userState=defineStore('userState',{
    state:()=>{
        return{
            name:'ly',
            age:18,
            text:'rap',
            users:[
                { id:10086,name:'10086-x'},
                { id:10086,name:'10086-y'}
            ]
        }
    },
    getters: {
        doubleCount: (state) => state.age * 2,
        getUserById: (state) => {
            return (userId) => state.users.find((user) => user.id === userId)
        },
    },

 })
import { createStore } from 'vuex'
import comment from "@/store/modules/comment.js"
import article from "@/store/modules/article.js"
import login from "@/store/modules/login"

const store = createStore({
    modules:{
        comment,
        article,
        login
    }
})

export default store